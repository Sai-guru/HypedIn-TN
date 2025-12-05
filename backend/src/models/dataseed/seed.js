const mongoose = require("mongoose");
require("dotenv").config();

const HeroSettings = require("../gallery/ghero"); 
// make sure the path is correct

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/yourdbname", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));

async function seedHeroSettings() {
  try {
    // Clear existing
    await HeroSettings.deleteMany({});
    console.log("Old HeroSettings removed");

    // Insert new
    const data = {
      backgroundType: "video",
      videoUrl: "https://2mtegaywr8.ucarecd.net/bf112e90-c796-4243-8253-dbd30f922475/SSYouTubeonline_WELCOMEVIDEO_720p.mp4",
      imageUrl: "https://2mtegaywr8.ucarecd.net/1fa5f5ae-3932-4005-932a-c287e21e685b/charityeventfairflatvectorbannertemplatedonationscollectingsocialneedstrendypostermultinationalfemale168498956.jpg",
      title: "Welcome to Our Charity",
      subtitle: "Together, we make a difference",
      overlayOpacity: 0.4,
      overlayColor: "rgba(0,0,0,0.5)",
      titleColor: "#ffffff",
      subtitleColor: "#f0f0f0",
      titleSize: {
        mobile: "24px",
        tablet: "32px",
        desktop: "48px",
      },
      subtitleSize: {
        mobile: "16px",
        tablet: "20px",
        desktop: "28px",
      },
      animationDelay: {
        title: 200,
        subtitle: 400,
      },
      autoplay: true,
      loop: true,
      muted: true,
    };

    const result = await HeroSettings.create(data);

    console.log("HeroSettings Seeded:", result);
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seedHeroSettings();
