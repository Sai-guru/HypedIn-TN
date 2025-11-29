// controllers/ctaController.js
const CtaSection = require('../../models/home/ctaModel'); // Adjust path as needed


exports.getCTASection = async (req, res) => {   
  try {     
    const cta = await CtaSection.findOne({ id: 'main-cta' });     
    if (!cta) {       
      return res.status(404).json({ 
        success: false, message: 'CTA section not found' });     
      }     
      res.json({ success: true, data: cta });   
    } catch (err) {     
      console.error(err);     
      res.status(500).json({ success: false, message: 'Server error' });   
    } 
  }; 

exports.saveCTASection = async (req, res) => {
  try {
    console.log('Received CTA Data:', req.body);

    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    // Check if already exists
    let cta = await CtaSection.findOne({ id });
    if (cta) {
      // Update if exists
      cta = await CtaSection.findOneAndUpdate({ id }, req.body, { new: true, runValidators: true });
    } else {
      // Create new
      cta = new CtaSection(req.body);
      await cta.save();
    }

    res.json({ success: true, message: 'CTA saved successfully', data: cta });
  } catch (err) {
    console.error('Error saving CTA:', err);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};


exports.updateCTASection = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    const cta = await CtaSection.findOneAndUpdate(
      { id: id },
      updateData,
      { new: true, upsert: true }
    );
    
    res.json({
      success: true,
      message: 'CTA section updated successfully',
      data: cta
    });
  } catch (err) {
    console.error('Error updating CTA:', err);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};