const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://muhammadbilalsaleemawan786:tu8SsausXCqOOlQl@survey-form.tcq21.mongodb.net/?retryWrites=true&w=majority&appName=Survey-Form";

async function connectToDb() {
  try {
    await mongoose.connect(mongoURI, {
    });
    console.log('Connected to MongoDB Successfully!');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit the process with an error code   

  }
}

module.exports =  connectToDb;

// const mongoURI = "mongodb+srv://muhammadbilalsaleemawan786:tu8SsausXCqOOlQl@survey-form.tcq21.mongodb.net/?retryWrites=true&w=majority&appName=Survey-Form"