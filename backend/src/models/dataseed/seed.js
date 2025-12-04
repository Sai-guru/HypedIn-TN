const mongoose = require('mongoose');
require('dotenv').config();
const Impact = require('../home/impactModel'); // your model file

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/yourdbname', {
  useNewUrlParser: true,
  useUnifiedTopology: true
} )
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));

const seedData = {
  title: "Our Global Impact",
  subtitle: "Shaping the Future Together",
  description:
    "We focus on innovation, community building, and sustainable growth. These numbers reflect our journey so far.",
  backgroundImage: "https://2mtegaywr8.ucarecd.net/e6fedc8a-de97-4634-b744-89a7a57f9fbf/photo1471039497385b6d6ba609f9c.jpg",

  stats: [
    {
      id: "s1",
      icon: "🚀",
      number: "250K+",
      label: "Active Users",
      description: "People using our platform worldwide",
      color: "#4F46E5"
    },
    {
      id: "s2",
      icon: "🌍",
      number: "48",
      label: "Countries Reached",
      description: "Global presence expanding steadily",
      color: "#059669"
    },
    {
      id: "s3",
      icon: "🏆",
      number: "35+",
      label: "Awards Won",
      description: "Recognitions for innovation and service",
      color: "#D97706"
    },
    {
      id: "s4",
      icon: "💼",
      number: "1200+",
      label: "Partnerships",
      description: "Growing network of trusted collaborators",
      color: "#DC2626"
    }
  ],

  achievements: [
    {
      id: "a1",
      title: "Innovation Excellence",
      description: "Awarded for breakthrough AI-driven solutions.",
      image: "https://2mtegaywr8.ucarecd.net/0d7d166b-bd97-4af2-87ed-108338ce8a48/innovation_award.png",
      category: "Technology",
      year: "2023"
    },
    {
      id: "a2",
      title: "Best Startup of the Year",
      description: "Recognised for outstanding market growth.",
      image: "https://2mtegaywr8.ucarecd.net/efd54baf-c2d9-45d0-993c-b75a546e2e19/diversepeoplestartupbusinessconceptworking43739580.jpg",
      category: "Startup",
      year: "2024"
    },
    {
      id: "a3",
      title: "Social Impact Award",
      description: "For contributions to digital education worldwide.",
      image: "https://2mtegaywr8.ucarecd.net/4fe13a51-0483-4499-9ab6-807c8045f8b3/SocialImpactAward.jpg",
      category: "Community",
      year: "2022"
    },
    {
      id: "a4",
      title: "Sustainability Leadership",
      description: "For eco-friendly and sustainable solutions.",
      image: "https://2mtegaywr8.ucarecd.net/654b3d86-de0d-47b7-83b2-aeaa8fbd38c0/1581626393980.jpg",
      category: "Environment",
      year: "2021"
    }
  ]
};

async function seed() {
  try {
    await Impact.deleteMany({});
    await Impact.create(seedData);
    console.log("Seed data inserted successfully!");
    mongoose.connection.close();
  } catch (err) {
    console.error(err);
  }
}

seed();
