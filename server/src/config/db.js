require('dotenv').config();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://dhananjaychoudhary017:dhananjaychoudhary017@foodi.j04sp.mongodb.net/?retryWrites=true&w=majority&appName=Foodi");
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
   
  }
};

module.exports = connectDB;