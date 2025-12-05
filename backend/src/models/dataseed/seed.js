const mongoose = require('mongoose');
require('dotenv').config();

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/yourdbname", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));

const Testimonial = require("../home/testimonial"); // adjust the path

const seedData = [
  {
    name: "Kathrine D'Souza",
    role: "Beneficiary - Food Assistance Program",
    content:
      "Thanks to the trust, I am able to feed my children nutritious meals regularly. Their support has brought a huge relief to my family.",
    rating: 5,
    image: "https://2mtegaywr8.ucarecd.net/12699d28-01a3-4f62-bbc2-afd2b80a6cfc/images",
    featured: true,
    approved: true,
    dateSubmitted: new Date("2024-10-15"),
    location: "Chennai, Tamil Nadu",
    category: "beneficiary"
  },

  {
    name: "Henrey Mathew",
    role: "Volunteer - Teaching Program",
    content:
      "Volunteering here has changed my life. Teaching the kids has given me purpose and joy. The organization is extremely supportive.",
    rating: 5,
    image: "https://2mtegaywr8.ucarecd.net/51921295-691d-4112-8768-adb46646bce6/BusinessProfessionalDressCodeModelwithBurgundyBlazerandbluestripedshirt.jpg",
    featured: false,
    approved: true,
    dateSubmitted: new Date("2024-09-20"),
    location: "Hyderabad, Telangana",
    category: "volunteer"
  },

  {
    name: "Priya Sharma",
    role: "Donor - Monthly Supporter",
    content:
      "I donate every month because I truly trust their mission. The transparency and impact reports make me feel confident my money is used right.",
    rating: 4,
    image: "https://2mtegaywr8.ucarecd.net/cafbdd1b-2316-4609-9a0d-2f883b20b145/portraitbeautifulyoungindiangirlbusinesswomansmilingsittingstepsofficebuildingholdingnotepadwhite158880029.jpg",
    featured: true,
    approved: true,
    dateSubmitted: new Date("2024-11-05"),
    location: "Bangalore, Karnataka",
    category: "donor"
  },

  {
    name: "GreenLeaf Corporate",
    role: "Corporate Partner",
    content:
      "Our partnership with the trust has allowed us to contribute to meaningful environmental and educational projects. Their professionalism is excellent.",
    rating: 5,
    image: "https://2mtegaywr8.ucarecd.net/ed9b7532-fea5-4842-aed5-0d07728ed418/images",
    featured: false,
    approved: true,
    dateSubmitted: new Date("2024-08-10"),
    location: "Mumbai, Maharashtra",
    category: "partner"
  }
];

async function seed() {
  try {
    await Testimonial.deleteMany({});
    await Testimonial.insertMany(seedData);
    console.log("Testimonials seeded successfully!");
    mongoose.connection.close();
  } catch (err) {
    console.error(err);
  }
}

seed();
