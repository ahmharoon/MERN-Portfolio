const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Project = require('./models/Project');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const dummyProjects = [
  {
    title: 'FlyEz',
    description: 'An NLP-based flight booking app using the Gemini API.',
    category: 'Final Year Project',
    techStack: ['Node.js', 'React', 'Gemini API', 'MongoDB'],
    highlights: ['Integrated Aviationstack API', 'Implemented rate-limiting for cost control'],
    githubLink: '#',
    liveLink: '#'
  },
  {
    title: 'Bookagame',
    description: 'A sports venue booking platform.',
    category: 'Startup',
    techStack: ['Node.js', 'Express', 'MongoDB', 'React'],
    highlights: ['Node.js backend logic for court availability', 'Dynamic commission calculations'],
    githubLink: '#',
    liveLink: '#'
  },
  {
    title: 'Blissful Adornments',
    description: 'An e-commerce application.',
    category: 'E-commerce',
    techStack: ['React', 'Redux', 'Node.js', 'Stripe'],
    highlights: ['Complex state management using Redux/Context API', 'Secure payment integration', 'User authentication'],
    githubLink: '#',
    liveLink: '#'
  },
  {
    title: 'Chess Application',
    description: 'A fully functional multiplayer chess game.',
    category: 'Gaming',
    techStack: ['React', 'Socket.io', 'Node.js', 'chess.js'],
    highlights: ['Complex game logic and move validation', 'Real-time state management'],
    githubLink: '#',
    liveLink: '#'
  },
  {
    title: 'Chatting Application',
    description: 'A real-time messaging platform.',
    category: 'Communication',
    techStack: ['React', 'Socket.io', 'MongoDB'],
    highlights: ['Real-time bidirectional communication using Socket.io', 'Message persistence in MongoDB'],
    githubLink: '#',
    liveLink: '#'
  }
];

const seedData = async () => {
  try {
    await Project.deleteMany(); // Clear existing projects to avoid duplicates if run multiple times
    await Project.insertMany(dummyProjects);
    console.log('Projects Seeded Successfully!');
    process.exit();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
