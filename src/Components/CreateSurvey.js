import React, { useState } from "react";
import { XCircleIcon } from "@heroicons/react/solid";

const CreateSurvey = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [questions, setQuestions] = useState([]);

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      {
        questionText: "",
        questionType: "short-answer",
        options: [""],
        isRequired: false,
        order: questions.length + 1,
        response: "",
      },
    ]);
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = questions.map((question, i) =>
      i === index ? { ...question, [field]: value } : question
    );
    setQuestions(updatedQuestions);
  };

  const handleAddOption = (index) => {
    const updatedQuestions = questions.map((question, i) =>
      i === index
        ? { ...question, options: [...question.options, ""] }
        : question
    );
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const updatedQuestions = questions.map((question, i) =>
      i === qIndex
        ? {
            ...question,
            options: question.options.map((option, j) =>
              j === oIndex ? value : option
            ),
          }
        : question
    );
    setQuestions(updatedQuestions);
  };

  const handleRemoveOption = (qIndex, oIndex) => {
    const updatedQuestions = questions.map((question, i) =>
      i === qIndex
        ? {
            ...question,
            options: question.options.filter((_, j) => j !== oIndex),
          }
        : question
    );
    setQuestions(updatedQuestions);
  };

  const handleRemoveQuestion = (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  const handleResponseChange = (index, value) => {
    const updatedQuestions = questions.map((question, i) =>
      i === index ? { ...question, response: value } : question
    );
    setQuestions(updatedQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate that all required fields are filled during survey creation
    const isValid = questions.every((question) => {
      // Validate that required fields have question text and options (for multiple-choice or dropdown)
      if (question.questionText.trim() === "") {
        return false;
      }
  
      if (
        ["multiple-choice", "dropdown"].includes(question.questionType) &&
        question.options.some((option) => option.trim() === "")
      ) {
        return false;
      }
  
      return true;
    });
  
    if (!isValid) {
      alert("Please complete all required fields and ensure options are filled.");
      return;
    }
  
    const newSurvey = {
      title,
      description,
      isActive,
      startDate,
      endDate,
      questions,
    };
  
    try {
      const response = await fetch("http://localhost:5000/addsurvey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSurvey),
      });
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      alert("Survey created successfully!");
    } catch (error) {
      console.error("Error creating survey:", error);
      alert("Failed to create survey. Please try again.");
    }
  };
  

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
        Create a New Survey
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="title"
            className="block text-lg font-semibold text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
            placeholder="Enter survey title"
            required
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-lg font-semibold text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
            rows="4"
            placeholder="Provide a brief description"
          ></textarea>
        </div>
        <div className="flex items-center space-x-4">
          <label
            htmlFor="isActive"
            className="text-lg font-semibold text-gray-700"
          >
            Active:
          </label>
          <input
            type="checkbox"
            id="isActive"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
            className="w-6 h-6"
          />
        </div>
        <div>
          <label
            htmlFor="startDate"
            className="block text-lg font-semibold text-gray-700"
          >
            Start Date
          </label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="mt-1 block w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="endDate"
            className="block text-lg font-semibold text-gray-700"
          >
            End Date
          </label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="mt-1 block w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-2xl font-semibold text-gray-800">Questions</h3>
          {questions.map((question, index) => (
            <div
              key={index}
              className="p-4 border rounded-lg shadow-sm space-y-4 relative"
            >
              <button
                type="button"
                onClick={() => handleRemoveQuestion(index)}
                className="absolute top-0 right-0 p-2 text-red-600 hover:text-red-800"
              >
                <XCircleIcon className="w-6 h-6" />
              </button>
              <div>
                <label
                  htmlFor={`questionText-${index}`}
                  className="block text-lg font-semibold text-gray-700"
                >
                  Question Text
                </label>
                <input
                  type="text"
                  id={`questionText-${index}`}
                  value={question.questionText}
                  onChange={(e) =>
                    handleQuestionChange(index, "questionText", e.target.value)
                  }
                  className="mt-1 block w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                  placeholder="Enter question text"
                  required
                />
              </div>
              <div className="flex items-center space-x-4">
                <label
                  htmlFor={`questionType-${index}`}
                  className="block text-lg font-semibold text-gray-700"
                >
                  Question Type
                </label>
                <select
                  id={`questionType-${index}`}
                  value={question.questionType}
                  onChange={(e) =>
                    handleQuestionChange(index, "questionType", e.target.value)
                  }
                  className="mt-1 block w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="short-answer">Short Answer</option>
                  <option value="long-answer">Long Answer</option>
                  <option value="multiple-choice">Multiple Choice</option>
                  <option value="rating">Rating</option>
                  <option value="dropdown">Dropdown</option>
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <label className="block text-lg font-semibold text-gray-700">
                  Required:
                </label>
                <input
                  type="checkbox"
                  checked={question.isRequired}
                  onChange={(e) =>
                    handleQuestionChange(index, "isRequired", e.target.checked)
                  }
                  className="w-6 h-6"
                />
              </div>
              {["multiple-choice", "dropdown"].includes(
                question.questionType
              ) && (
                <div>
                  <label className="block text-lg font-semibold text-gray-700">
                    Options
                  </label>
                  {question.options.map((option, oIndex) => (
                    <div
                      key={oIndex}
                      className="flex items-center space-x-2 mb-2"
                    >
                      <input
                        type="text"
                        value={option}
                        onChange={(e) =>
                          handleOptionChange(index, oIndex, e.target.value)
                        }
                        className="block w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
                        placeholder={`Option ${oIndex + 1}`}
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveOption(index, oIndex)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <XCircleIcon className="w-6 h-6" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => handleAddOption(index)}
                    className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
                  >
                    Add Option
                  </button>
                </div>
              )}
              {["short-answer", "long-answer"].includes(
                question.questionType
              ) && (
                <div>
                  <label
                    htmlFor={`response-${index}`}
                    className="block text-lg font-semibold text-gray-700"
                  >
                    Your Response
                  </label>
                  <textarea
                    id={`response-${index}`}
                    value={question.response}
                    onChange={(e) =>
                      handleResponseChange(index, e.target.value)
                    }
                    className="mt-1 block w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="3"
                    placeholder="Enter your answer here..."
                  ></textarea>
                </div>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddQuestion}
            className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
          >
            Add Question
          </button>
        </div>

        <button
          type="submit"
          className="bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 w-full"
        >
          Create Survey
        </button>
      </form>
    </div>
  );
};

export default CreateSurvey;
