const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    console.error(`Ensure MONGODB_URI is correctly set in Vercel Environment Variables.`);
    // process.exit(1); // Removed for Vercel serverless compatibility
  }
};

module.exports = connectDB;
