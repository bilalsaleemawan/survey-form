const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionSchema = new Schema({
  surveyId: {
    type: Schema.Types.ObjectId,
    ref: "Survey",
    required: true,
  },
  questionText: {
    type: String,
    required: true,
  },
  questionType: {
    type: String,
    enum: [
      "multiple-choice",
      "short-answer",
      "long-answer",
      "rating",
      "dropdown",
    ],
    required: true,
  },
  options: [
    {
      type: String,
    },
  ],
  isRequired: {
    type: Boolean,
    default: false,
  },
  order: {
    type: Number,
    required: true,
  },
  response: { type: String, default: "" },
});

module.exports = mongoose.model("Question", questionSchema);
