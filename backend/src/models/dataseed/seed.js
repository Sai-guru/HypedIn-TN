const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/yourdbname', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));

const StatsSection = require('../home/statsModel'); // path to your model

const seedData = {
  title: "Our Impact in Numbers",
  subtitle: "Key performance statistics showing our growth and success",
  isActive: true,
  backgroundColor: "bg-gray-50",
  animationType: "fade-in",

  stats: [
    {
      id: "stat1",
      icon: "fa-users",
      value: "10K",
      label: "Total Volunteers",
      suffix: "+",
      color: "#3b82f6",
      isActive: true,
      order: 1
    },
    {
      id: "stat2",
      icon: "fa-hand-holding-heart",
      value: "250",
      label: "Successful Projects",
      suffix: "+",
      color: "#ef4444",
      isActive: true,
      order: 2
    },
    {
      id: "stat3",
      icon: "fa-globe-asia",
      value: "18",
      label: "Countries Reached",
      suffix: "",
      color: "#10b981",
      isActive: true,
      order: 3
    },
    {
      id: "stat4",
      icon: "fa-coins",
      value: "1.2M",
      label: "Funds Raised",
      suffix: "$",
      color: "#f59e0b",
      isActive: false,
      order: 4
    }
  ]
};

async function seed() {
  try {
    await StatsSection.deleteMany({});
    await StatsSection.create(seedData);

    console.log("StatsSection seed inserted successfully!");
    mongoose.connection.close();
  } catch (err) {
    console.error(err);
  }
}

seed();
