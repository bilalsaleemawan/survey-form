import React, { useEffect, useState } from "react";
import axios from "axios";

const SurveyResponse = ({ match }) => {
  const surveyId = match.params.id;
  const [survey, setSurvey] = useState(null);
  const [responses, setResponses] = useState({});

  useEffect(() => {
    const fetchSurvey = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/surveys/${surveyId}`);
        console.log("Fetched survey:", response.data);
        setSurvey(response.data);
      } catch (error) {
        console.error("Error fetching survey data:", error);
      }
    };
    fetchSurvey();
  }, [surveyId]);

  const handleChange = (questionId, value) => {
    setResponses({
      ...responses,
      [questionId]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Survey Responses Submitted:", responses);

    const submitResponses = async () => {
      try {
        await axios.post(`http://localhost:5000/surveys/${surveyId}/responses`, {
          surveyId,
          responses,
        });
        alert("Responses submitted successfully!");
      } catch (error) {
        console.error("Error submitting responses:", error);
      }
    };

    submitResponses();
  };

  if (!survey) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6">{survey.title}</h2>
      <form onSubmit={handleSubmit}>
        {survey.questions.map((question) => (
          <div key={question._id} className="mb-6 p-4 border border-gray-300 rounded-lg">
            <p className="text-gray-700 mb-2">{question.questionText}</p>
            {question.questionType === "short-answer" && (
              <input
                type="text"
                value={responses[question._id] || ""}
                onChange={(e) => handleChange(question._id, e.target.value)}
                placeholder="Your answer"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-200"
              />
            )}
            {question.questionType === "long-answer" && (
              <textarea
                value={responses[question._id] || ""}
                onChange={(e) => handleChange(question._id, e.target.value)}
                placeholder="Your answer"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-200"
                rows="5"
              />
            )}
            {question.questionType === "multiple-choice" && (
              question.options.map((option, index) => (
                <label key={index} className="block">
                  <input
                    type="radio"
                    name={question._id}
                    value={option}
                    onChange={(e) => handleChange(question._id, e.target.value)}
                    className="mr-2"
                  />
                  {option}
                </label>
              ))
            )}
            {question.questionType === "dropdown" && (
              <select
                value={responses[question._id] || ""}
                onChange={(e) => handleChange(question._id, e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition duration-200"
              >
                <option value="" disabled>
                  Select an option
                </option>
                {question.options.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            )}
          </div>
        ))}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Submit Response
        </button>
      </form>
    </div>
  );
};

export default SurveyResponse;
