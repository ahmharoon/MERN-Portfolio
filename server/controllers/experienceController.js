const Experience = require('../models/Experience');

// @desc    Get all experiences
// @route   GET /api/experiences
// @access  Public
const getExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find({});
    
    // Sort experiences: latest at the top, oldest at the bottom
    const parseDateString = (yearStr, isPresent) => {
      if (isPresent) {
        return { end: new Date(8640000000000000), start: new Date(0) }; // Infinite future
      }
      if (!yearStr) {
        return { end: new Date(0), start: new Date(0) };
      }

      const parts = yearStr.split('-');
      const startStr = parts[0].trim();
      const endStr = parts[1] ? parts[1].trim() : '';

      const parseMonthYear = (str) => {
        if (!str) return null;
        if (str.toLowerCase() === 'present') {
          return new Date(8640000000000000);
        }
        const dateParts = str.split('/');
        if (dateParts.length === 2) {
          const month = parseInt(dateParts[0]) - 1;
          let year = parseInt(dateParts[1]);
          if (year < 100) year += 2000;
          return new Date(year, month, 1);
        }
        const yr = parseInt(str);
        if (!isNaN(yr)) {
          return new Date(yr, 0, 1);
        }
        return null;
      };

      const start = parseMonthYear(startStr) || new Date(0);
      let end;
      if (endStr) {
        end = parseMonthYear(endStr) || start;
      } else {
        end = start;
      }

      return { start, end };
    };

    experiences.sort((a, b) => {
      const dateA = parseDateString(a.year, a.present);
      const dateB = parseDateString(b.year, b.present);

      if (dateB.end.getTime() !== dateA.end.getTime()) {
        return dateB.end - dateA.end;
      }
      return dateB.start - dateA.start;
    });

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
      experience.present = req.body.present !== undefined ? req.body.present : experience.present;

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
