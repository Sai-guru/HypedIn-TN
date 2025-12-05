const mongoose = require('mongoose');
require('dotenv').config();

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/yourdbname", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));

const VolunteerManagement = require("../home/volunteer"); // adjust path

const seedData = {
  sectionSettings: {
    sectionVisible: true,
    sectionTitle: "Volunteer Opportunities",
    sectionSubtitle: "Join hands with us to create lasting impact",
    highlightUrgent: true,
    showSkillsRequired: true,
    showBenefits: true,
  },

  opportunities: [
    {
      title: "Community Food Distribution",
      category: "Community Service",
      description:
        "Assist in packing and distributing essential groceries to underprivileged families.",
      requirements: [
        "Must be 16+ years old",
        "Basic communication",
        "Physically fit for lifting small packages",
      ],
      timeCommitment: "3 hours per session",
      location: "Chennai, Tamil Nadu",
      spotsAvailable: 15,
      currentVolunteers: 9,
      skillsRequired: ["Teamwork", "Basic organization", "Responsibility"],
      benefits: ["Certificate", "Volunteer hours", "Meals provided"],
      visible: true,
      urgent: true,
      remote: false,
      icon: "fa-hand-holding-heart",
      color: "#ef4444",
    },

    {
      title: "Online Teaching Support",
      category: "Education",
      description:
        "Teach English, Math, or Science to school children in rural areas through online sessions.",
      requirements: ["Laptop/Phone", "Stable internet", "Patience and empathy"],
      timeCommitment: "4 hours per week",
      location: "Remote",
      spotsAvailable: 20,
      currentVolunteers: 14,
      skillsRequired: ["Teaching", "Communication", "Time management"],
      benefits: ["Certification", "Skill development"],
      visible: true,
      urgent: false,
      remote: true,
      icon: "fa-chalkboard-teacher",
      color: "#3b82f6",
    },

    {
      title: "Event Support Volunteer",
      category: "Event Management",
      description:
        "Help us set up, coordinate, and manage special charity events and community activities.",
      requirements: ["Must be 18+", "Comfortable with crowds"],
      timeCommitment: "Full day (as per event)",
      location: "Hyderabad",
      spotsAvailable: 10,
      currentVolunteers: 6,
      skillsRequired: ["Public interaction", "Coordination", "Problem-solving"],
      benefits: ["Experience certificate", "Networking opportunity"],
      visible: true,
      urgent: false,
      remote: false,
      icon: "fa-calendar-check",
      color: "#10b981",
    },

    {
      title: "Content Creator for Awareness Campaigns",
      category: "Media & Outreach",
      description:
        "Create posters, short videos, or social media content for health and education awareness.",
      requirements: ["Basic design skills", "Creative thinking"],
      timeCommitment: "Flexible hours",
      location: "Remote",
      spotsAvailable: 8,
      currentVolunteers: 3,
      skillsRequired: ["Graphic design", "Video editing", "Writing"],
      benefits: ["Portfolio boost", "Certificate"],
      visible: true,
      urgent: true,
      remote: true,
      icon: "fa-bullhorn",
      color: "#f59e0b",
    }
  ]
};

async function seed() {
  try {
    await VolunteerManagement.deleteMany({});
    await VolunteerManagement.create(seedData);

    console.log("VolunteerManagement seed added!");
    mongoose.connection.close();
  } catch (err) {
    console.error(err);
  }
}

seed();
