const express = require("express");
const app = express();
require('dotenv').config();
const connectToDb = require("../backend/database/dbConnect");
const Survey = require("../backend/Models/Survey.Model");
const Question = require("../backend/Models/Question.Model");
const User = require('../backend/Models/User.Model');
const Response = require('../backend/Models/Response')
const authRoutes = require('./routes/auth.Routes'); // Corrected variable name and path
const { isValidObjectId } = require('../src/utility/utils');
const cors = require("cors");
connectToDb();

// Middleware
app.use(cors());
app.use(express.json());

// Use the auth routes
app.use('/user', authRoutes);


// Create a new user

app.post("/user/register", async (req, res) => { 
  try {
    const user = new User({
      userName: req.body.userName,
      email: req.body.email,
      password: req.body.password,
      isUser: req.body.isUser || false,
      isAdmin: req.body.isAdmin || false,
    });

    await user.save(); 

    res.status(201).json({ message: "User Created Successfully!", user }); 
  } catch (error) {
    res.status(501).json({
      error: "Failed to Create New User!",
      message: error.message,
    });
  }
});



  app.post("/addsurvey", async (req, res) => {
    try {
      const { title, description, isActive, startDate, endDate, questions } =
        req.body;

      // Create a new survey
      const newSurvey = new Survey({
        title,
        description,
        isActive,
        startDate,
        endDate,
      });
      await newSurvey.save();

      // Create questions and link them to the survey
      const questionIds = [];
      for (const questionData of questions) {
        const newQuestion = new Question({
          ...questionData,
          surveyId: newSurvey._id,
        });
        await newQuestion.save();
        questionIds.push(newQuestion._id);
      }

      // Update survey with the list of question IDs
      newSurvey.questions = questionIds;
      await newSurvey.save();

      res.status(201).json({
        message: "New Survey Created Successfully!",
      });
    } catch (error) {
      console.error("Failed to Create New Survey", { message: error.message });
      res.status(500).json({
        message: "Failed to Create New Survey",
        error: error.message,
      });
    }
  });

//   Get All Surveys

app.get("/allsurveys", async (req, res) => {
  try {
    const surveys = await Survey.find().populate("questions");
    res.status(200).json(surveys);
  } catch (error) {
    console.error("Failed to Fetch All Surveys", { message: error.message });
    res.status(500).json({
      message: "Failed to Fetch All Surveys",
      error: error.message,
    });
  }
});


app.get("/surveys/:id", async (req, res) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid survey ID" });
  }

  try {
    const survey = await Survey.findById(id).populate("questions");
    if (!survey) {
      return res.status(404).json({ message: "Survey not found" });
    }
    return res.status(200).json(survey);
  } catch (error) {
    console.log("Error occurred while fetching survey:", error);
    return res.status(500).json({ message: "Failed to Fetch Survey Detail" });
  }
});

  
app.post("/surveys/:id/responses", async (req, res) => {
  const { id } = req.params;
  const { responses } = req.body;

  try {
    const newResponse = new Response({
      survey: id,
      responses: Object.entries(responses).map(([questionId, response]) => ({
        questionId,
        response,
      })),
    });

    await newResponse.save();  // Save the new response to the database

    res.status(201).json({ message: "Responses submitted successfully!" });
  } catch (error) {
    console.error("Failed to submit responses", { message: error.message });
    res.status(500).json({
      message: "Failed to submit responses",
      error: error.message,
    });
  }
});



app.listen(5000, () => {
  console.log("Server running on Port 5000");
});
