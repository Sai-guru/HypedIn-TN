const mongoose = require("mongoose");
require("dotenv").config();

const { Category, GalleryItem } = require("../gallery/gpage"); // adjust the path

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/yourdbname", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));

async function seedGallery() {
  try {
    // Clear old data
    await Category.deleteMany({});
    await GalleryItem.deleteMany({});

    console.log("Old data cleared.");

    // === 1️⃣ Seed Categories ===
    const categories = await Category.insertMany([
      {
        name: "Education Programs",
        description: "Photos from student events, classes, and empowerment sessions."
      },
      {
        name: "Community Service",
        description: "Social service activities, food distribution, medical camps."
      },
      {
        name: "Environmental Projects",
        description: "Tree plantation, clean-up drives, sustainability missions."
      }
    ]);

    console.log("Categories Created.");

    // Map categories to easily use _id
    const catMap = {
      edu: categories[0]._id,
      community: categories[1]._id,
      env: categories[2]._id
    };

    // === 2️⃣ Seed Gallery Items ===
    const galleryItems = [
      {
        title: "Children Learning Workshop",
        description: "A special workshop conducted for children to enhance creativity.",
        category: catMap.edu,
        thumbnail: "/uploads/gallery/thumbs/workshop1.jpg",
        imageUrl: "/uploads/gallery/workshop1.jpg",
        featured: true,
        rotatingGallery: true,
        tags: ["education", "children", "workshop"]
      },
      {
        title: "Food Distribution Drive",
        description: "Volunteers distributing meal packs to underprivileged families.",
        category: catMap.community,
        thumbnail: "https://2mtegaywr8.ucarecd.net/81420a16-1d7c-46df-abb1-59eff2618752/fooddrivecharitymovement_199580.jpg",
        imageUrl: "https://2mtegaywr8.ucarecd.net/8ae00559-f7bb-4fa2-8f23-95d48c508af9/charityworkersfeedinghomelesscharityworkershelpinghomelessrefugeesneedydistributingfoodoutdoorshunger302388639.jpg",
        featured: false,
        rotatingGallery: true,
        tags: ["community", "food", "volunteers"]
      },
      {
        title: "Tree Plantation Event",
        description: "A green mission initiative with local volunteers and students.",
        category: catMap.env,
        thumbnail: "https://2mtegaywr8.ucarecd.net/1d4fe3c9-c892-44f4-bfdf-74b05feab796/-/preview/299x168/",
        imageUrl: "https://2mtegaywr8.ucarecd.net/448a25b4-f666-4cbf-8ed4-c19b6d7ebe6d/growbilliontreesplantation3.jpg",
        featured: true,
        rotatingGallery: false,
        tags: ["environment", "trees", "green"]
      },
      {
        title: "Study Material Distribution",
        description: "Free study kits were distributed to school children.",
        category: catMap.edu,
        thumbnail: "https://2mtegaywr8.ucarecd.net/0c21bf7a-9421-4cf7-a1f7-5a0946b92543/images",
        imageUrl: "https://2mtegaywr8.ucarecd.net/8ec79112-a5d4-4468-95fb-cd3b8cdc0f70/images",
        featured: false,
        rotatingGallery: false,
        tags: ["education", "support"]
      }
    ];

    await GalleryItem.insertMany(galleryItems);

    console.log("Gallery Items Seeded Successfully!");

    mongoose.connection.close();
  } catch (err) {
    console.error(err);
  }
}

seedGallery();
