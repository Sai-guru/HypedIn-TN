// require("dotenv").config();
// const mongoose = require("mongoose");
// const Team = require("../about/aboutTeam"); 
// // update the path if your file is elsewhere

// // ---- DB CONNECTION ----
// const mongoURI = process.env.MONGODB_URI || "mongodb://localhost:27017/admin_auth";

// mongoose
//   .connect(mongoURI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("DB connected for Team seeding"))
//   .catch((err) => console.error("DB connection error:", err));

// // ---- Dummy Data ----
// const dummyData = {
//   sectionSettings: {
//     title: "Meet Our Amazing Team",
//     subtitle: "Passionate people driving innovation",
//     volunteerText: "Over 120 dedicated volunteers",
//     volunteerCount: "120",
//     ctaText: "Join Our Team",
//     ctaLink: "/careers",
//     showCtaSection: true,
//     backgroundColor: "#f9fafb",
//     isVisible: true
//   },
// members: [
//   {
//     id: "member4",
//     name: "David Lee",
//     role: "Product Manager",
//     bio: "David ensures products meet user needs with efficient planning and execution.",
//     image: "https://via.placeholder.com/150.png?text=David",
//     order: 4,
//     isVisible: true
//   },
//   {
//     id: "member5",
//     name: "Eva Green",
//     role: "Lead Designer",
//     bio: "Eva creates visually stunning designs and intuitive user experiences.",
//     image: "https://2mtegaywr8.ucarecd.net/1a3309e6-91dc-46f8-9e16-26f2d9cdb504/-/preview/612x408/",
//     order: 5,
//     isVisible: true
//   },
//   {
//     id: "member6",
//     name: "Frank Miller",
//     role: "Lead Developer",
//     bio: "Frank builds robust and scalable software solutions for our clients.",
//     image: "https://2mtegaywr8.ucarecd.net/f57415ec-c655-4f5b-970a-35aa5f76271d/-/preview/408x612/",
//     order: 6,
//     isVisible: true
//   },
//   {
//     id: "member7",
//     name: "Grace Kim",
//     role: "HR Manager",
//     bio: "Grace manages talent acquisition and fosters a positive workplace culture.",
//     image: "https://2mtegaywr8.ucarecd.net/8da00692-f7d2-47ce-beab-95a7defe760c/-/preview/740x546/",
//     order: 7,
//     isVisible: true
//   },
//   {
//     id: "member8",
//     name: "Henry Adams",
//     role: "Marketing Specialist",
//     bio: "Henry drives campaigns and strategies to enhance brand visibility.",
//     image: "https://2mtegaywr8.ucarecd.net/34b7306d-5212-4cd5-9314-aaff3c2879f6/-/preview/740x493/",
//     order: 8,
//     isVisible: true
//   }
// ]
// };

// // ---- Insert function ----
// async function seedTeam() {
//   try {
//     const newDoc = await Team.create(dummyData);
//     console.log("Team seeded successfully:", newDoc._id);
//   } catch (error) {
//     console.error("Seeding error:", error);
//   } finally {
//     mongoose.connection.close();
//   }
// }

// seedTeam();
