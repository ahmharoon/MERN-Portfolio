const mongoose = require('mongoose');

const projectSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    techStack: [
      {
        type: String,
      },
    ],
    category: {
      type: String,
    },
    imageUrl: {
      type: String,
    },
    liveLink: {
      type: String,
    },
    githubLink: {
      type: String,
    },
    highlights: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
