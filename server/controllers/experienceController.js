const Experience = require('../models/Experience');

// @desc    Get all experiences
// @route   GET /api/experiences
// @access  Public
const getExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find({});
    res.json(experiences);
  } catch (error) {
    console.error('Error fetching experiences:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get single experience
// @route   GET /api/experiences/:id
// @access  Public
const getExperienceById = async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);
    if (experience) {
      res.json(experience);
    } else {
      res.status(404).json({ message: 'Experience not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create an experience
// @route   POST /api/experiences
// @access  Private/Admin
const createExperience = async (req, res) => {
  try {
    const experience = new Experience(req.body);
    const createdExperience = await experience.save();
    res.status(201).json(createdExperience);
  } catch (error) {
    res.status(400).json({ message: 'Invalid experience data', error: error.message });
  }
};

// @desc    Update an experience
// @route   PUT /api/experiences/:id
// @access  Private/Admin
const updateExperience = async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);

    if (experience) {
      experience.company = req.body.company || experience.company;
      experience.role = req.body.role || experience.role;
      experience.description = req.body.description || experience.description;
      experience.year = req.body.year || experience.year;

      const updatedExperience = await experience.save();
      res.json(updatedExperience);
    } else {
      res.status(404).json({ message: 'Experience not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Invalid experience data', error: error.message });
  }
};

// @desc    Delete an experience
// @route   DELETE /api/experiences/:id
// @access  Private/Admin
const deleteExperience = async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);

    if (experience) {
      await Experience.deleteOne({ _id: experience._id });
      res.json({ message: 'Experience removed' });
    } else {
      res.status(404).json({ message: 'Experience not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getExperiences,
  getExperienceById,
  createExperience,
  updateExperience,
  deleteExperience,
};
