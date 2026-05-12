const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Project = require('./models/Project');
const Experience = require('./models/Experience');
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
    link: 'https://github.com/ahmharoon/FlyEz'
  },
  {
    title: 'Bookagame',
    description: 'A sports venue booking platform.',
    category: 'Startup',
    techStack: ['Node.js', 'Express', 'MongoDB', 'React'],
    highlights: ['Node.js backend logic for court availability', 'Dynamic commission calculations'],
    link: 'https://bookagame.net'
  },
  {
    title: 'Blissful Adornments',
    description: 'An e-commerce application.',
    category: 'E-commerce',
    techStack: ['React', 'Redux', 'Node.js', 'Stripe'],
    highlights: ['Complex state management using Redux/Context API', 'Secure payment integration', 'User authentication'],
    link: 'https://github.com/ahmharoon/Blissful-Adornments'
  },
  {
    title: 'Chess Application',
    description: 'A fully functional multiplayer chess game.',
    category: 'Gaming',
    techStack: ['React', 'Socket.io', 'Node.js', 'chess.js'],
    highlights: ['Complex game logic and move validation', 'Real-time state management'],
    link: 'https://github.com/ahmharoon/chess'
  },
  {
    title: 'Chatting Application',
    description: 'A real-time messaging platform.',
    category: 'Communication',
    techStack: ['React', 'Socket.io', 'MongoDB'],
    highlights: ['Real-time bidirectional communication using Socket.io', 'Message persistence in MongoDB'],
    link: 'https://github.com/ahmharoon/chattu'
  }
];

const dummyExperiences = [
  {
    company: 'Turing (USA Remote)',
    role: 'LLM Trainer and AI Coach',
    description: 'Stress-tested models like GPT and Gemini. Maintained 99%+ data quality across training sets.',
    year: '09/25 - 01/26'
  },
  {
    company: 'Skillsable (Australia Remote)',
    role: 'Frontend Developer',
    description: 'Developed responsive front-end implementations and optimized assets for faster load times.',
    year: '05/24 - 06/24'
  }
];

const seedData = async () => {
  try {
    await Project.deleteMany();
    await Experience.deleteMany();
    
    await Project.insertMany(dummyProjects);
    await Experience.insertMany(dummyExperiences);
    console.log('Projects Seeded Successfully!');
    process.exit();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
