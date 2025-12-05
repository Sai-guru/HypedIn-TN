const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/yourdbname', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));

const NewsletterSettings = require('./NewsletterSettings'); // your schema file

const seedData = {
  content: {
    title: "Stay Updated!",
    subtitle: "Join our newsletter",
    description: "Subscribe to get the latest updates, articles, and exclusive content.",
    placeholderText: "Enter your email",
    buttonText: "Subscribe",
    successMessage: "You're successfully subscribed!",
    backgroundImage: "https://2mtegaywr8.ucarecd.net/7d1bc7c7-df82-4cd6-9985-18cf250177aa/newsheaderbackgroundtitleabstractcolorfulglobalmaptexthightechdesignbluecolorfultemplate90494676.jpg",
    backgroundColor: "#ffffff",
    textColor: "#000000",
    showSocialIcons: true,
    privacyText: "We respect your privacy. No spam ever."
  },

  subscribers: [
    {
      id: "sub1",
      email: "john.doe@example.com",
      name: "John Doe",
      subscribedAt: "2024-03-10T10:20:00Z",
      status: "active",
      source: "website",
      tags: ["new", "engaged"]
    },
    {
      id: "sub2",
      email: "emma.smith@example.com",
      name: "Emma Smith",
      subscribedAt: "2024-04-01T15:30:00Z",
      status: "inactive",
      source: "landing-page",
      tags: ["promo"]
    },
    {
      id: "sub3",
      email: "mike.jones@example.com",
      name: "Mike Jones",
      subscribedAt: "2024-05-12T08:10:00Z",
      status: "active",
      source: "mobile-app",
      tags: ["loyal", "monthly"]
    }
  ],

  campaigns: [
    {
      id: "cmp1",
      subject: "Welcome to Our Newsletter!",
      status: "sent",
      sentAt: "2024-04-02T10:00:00Z",
      scheduledAt: "2024-04-02T09:00:00Z",
      recipients: 1500,
      openRate: 62,
      clickRate: 18
    },
    {
      id: "cmp2",
      subject: "Monthly Highlights – May",
      status: "sent",
      sentAt: "2024-05-30T12:00:00Z",
      scheduledAt: "2024-05-30T11:00:00Z",
      recipients: 1800,
      openRate: 57,
      clickRate: 12
    },
    {
      id: "cmp3",
      subject: "Upcoming Events – June Edition",
      status: "scheduled",
      sentAt: "",
      scheduledAt: "2024-06-05T08:30:00Z",
      recipients: 1900,
      openRate: 0,
      clickRate: 0
    }
  ]
};

async function seed() {
  try {
    await NewsletterSettings.deleteMany({});
    await NewsletterSettings.create(seedData);

    console.log("Newsletter seed inserted successfully!");
    mongoose.connection.close();
  } catch (err) {
    console.error(err);
  }
}

seed();
