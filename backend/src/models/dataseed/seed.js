require("dotenv").config();
const mongoose = require("mongoose");
const TimelineItem = require("../about/timeline"); 
// update the path if your file is elsewhere

// ---- DB CONNECTION ----
const mongoURI = process.env.MONGODB_URI || "mongodb://localhost:27017/admin_auth";

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connected for Timeline seeding"))
  .catch((err) => console.error("DB connection error:", err));

// ---- Dummy Data ----
const dummyData = [
  {
    year: "2015",
    title: "Company Founded",
    description: "Our journey began with a small team and big dreams."
  },
  {
    year: "2017",
    title: "First Product Launch",
    description: "Released our flagship product, receiving great market feedback."
  },
  {
    year: "2019",
    title: "Global Expansion",
    description: "Opened offices in Europe and Asia to expand our reach."
  },
  {
    year: "2021",
    title: "Award Recognition",
    description: "Received industry awards for innovation and customer service."
  },
  {
    year: "2023",
    title: "Next-Gen Product Release",
    description: "Launched our next generation platform with enhanced features."
  }
];

// ---- Insert function ----
async function seedTimeline() {
  try {
    const newDocs = await TimelineItem.insertMany(dummyData);
    console.log("Timeline seeded successfully:", newDocs.map(doc => doc._id));
  } catch (error) {
    console.error("Seeding error:", error);
  } finally {
    mongoose.connection.close();
  }
}

seedTimeline();
