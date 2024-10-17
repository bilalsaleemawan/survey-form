import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios"; 

const SurveyDetail = () => {
  const { id } = useParams(); 
  const [survey, setSurvey] = useState(null);

  useEffect(() => {
    console.log("ID from useParams:", id);
    const fetchSurvey = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/surveys/${id}`); 
        setSurvey(response.data);
      } catch (error) {
        console.error("Error fetching survey:", error);
      }
    };

    if (id) fetchSurvey(); // Fetch survey data if id exists
  }, [id]);

  if (!survey) return <div className="p-6 text-center">Loading...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">{survey.title}</h2>
      <p className="text-gray-700 mb-2">{survey.description}</p>
      <p className="text-sm text-gray-500">
        Start Date: {new Date(survey.startDate).toLocaleDateString()}
      </p>
      <p className="text-sm text-gray-500 mb-4">
        End Date: {new Date(survey.endDate).toLocaleDateString()}
      </p>
      <p
        className={`font-semibold ${survey.isActive ? "text-green-600" : "text-red-600"}`}
      >
        {survey.isActive ? "Active" : "Inactive"}
      </p>

      <div className="mt-6 space-y-4">
        {survey.questions.map((question, index) => (
          <div
            key={index}
            className="p-4 border rounded-lg bg-gray-50 hover:bg-gray-100 transition duration-300"
          >
            <h4 className="text-xl font-semibold text-gray-800">
              {index + 1}. {question.questionText}
            </h4>
            {/* Render question types as in your original code */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SurveyDetail;
