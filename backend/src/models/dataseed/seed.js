const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/yourdbname', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));

const Impact = require('../home/impactModel'); // your schema file

const seedData = {
  title: "Our Global Impact",
  subtitle: "Driving Innovation and Change",
  description: "We empower communities and build solutions that create long-term value.",
  backgroundImage: "https://2mtegaywr8.ucarecd.net/058df045-d0bd-48a1-b538-d73cdb07ea42/mapnetworkconnectbusinessdigitalglobalworldinternationalearthglobalbusinessnetworkmapdigitalconnectivity409929560.jpg",

  stats: [
    {
      id: "s1",
      icon: "🌟",
      number: "120K+",
      label: "Active Users",
      description: "People positively influenced by our work",
      color: "#4F46E5"
    },
    {
      id: "s2",
      icon: "🌎",
      number: "25",
      label: "Countries",
      description: "Global presence expanding rapidly",
      color: "#059669"
    },
    {
      id: "s3",
      icon: "🏆",
      number: "18",
      label: "Awards",
      description: "Recognitions for excellence and innovation",
      color: "#D97706"
    }
  ],

  achievements: [
    {
      id: "a1",
      title: "Global Service Award",
      description: "Recognized internationally for service quality.",
      image: "https://2mtegaywr8.ucarecd.net/d11db053-1d02-4678-a537-f0e3c4b68d7c/360_F_1747340042_9W9fXpLJu7J8WVOKKDNPx4Svd0Zi9awW.jpg",
      category: "Service",
      year: "2023"
    },
    {
      id: "a2",
      title: "Innovation Leader",
      description: "Awarded for outstanding tech-driven solutions.",
      image: "https://2mtegaywr8.ucarecd.net/9a245e59-222b-4e2e-9fac-7e66bc61b0f4/innovativeleadership.jpg",
      category: "Technology",
      year: "2024"
    },
    {
      id: "a3",
      title: "Community Builder Award",
      description: "Honored for our contribution to digital education.",
      image: "https://2mtegaywr8.ucarecd.net/3aad935c-6b2e-4b8a-88aa-ceba8a1336e4/2135623cba964075a3b2d4a92e3458b4eb7c5f63a1ab448ab4b8b1f301b0d143md.jpg",
      category: "Community",
      year: "2022"
    }
  ]
};

async function seed() {
  try {
    await Impact.deleteMany({});
    await Impact.create(seedData);
    console.log("Seed inserted successfully!");
    mongoose.connection.close();
  } catch (err) {
    console.error(err);
  }
}

seed();
