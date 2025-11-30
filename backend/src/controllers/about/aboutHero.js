// controllers/aboutHeroController.js
const AboutHero = require('../../models/about/aboutHero');

// Save or Update About Hero
exports.saveAboutHero = async (req, res) => {
  try {
    const data = req.body;

    let hero = await AboutHero.findOne();
    if (hero) {
      await AboutHero.updateOne({}, data);
    } else {
      hero = await AboutHero.create(data);
    }

    res.status(200).json({ message: 'About Hero section saved successfully' });
  } catch (err) {
      console.error('Error saving hero:', err);
      res.status(500).json({ message: 'Server error while saving hero section' });
  }
};

// Get About Hero
exports.getAboutHero = async (req, res) => {
  try {
    const hero = await AboutHero.findOne();
    res.status(200).json(hero);
  } catch (err) {
    console.error('Error fetching hero:', err);
    res.status(500).json({ message: 'Server error while fetching hero section' });
  }
};
