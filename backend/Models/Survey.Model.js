const mongoose = require("mongoose");
const autopopulate = require("mongoose-autopopulate");
const Schema = mongoose.Schema;

const surveySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    questions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Question",
        autopopulate: true, // Enable autopopulate for questions
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Apply the autopopulate plugin
surveySchema.plugin(autopopulate);

module.exports = mongoose.model("Survey", surveySchema);
