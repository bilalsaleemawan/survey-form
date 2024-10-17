import { useState, useEffect } from "react";

const SurveyAnalytics = () => {
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      const response = await fetch('/api/surveys/analytics');
      const data = await response.json();
      setAnalytics(data);
    };

    fetchAnalytics();
  }, []);

  if (!analytics) return <div className="p-4 text-center">Loading...</div>;

  return (
    <div className="container mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">{analytics.title} - Analytics</h2>
      <div className="space-y-6">
        {analytics.responses.map((response, index) => (
          <div key={index} className="p-4 border rounded-lg bg-gray-50 hover:bg-gray-100 transition duration-300">
            <p className="text-gray-700 mb-2">
              <strong>Q{index + 1}:</strong> {response.question}
            </p>
            <p className="text-gray-900">
              <strong>A:</strong> {response.answer}
            </p>
          </div>
        ))}
      </div>

      {/* Optionally, add statistics or visualizations here */}
      <div className="mt-6 border-t pt-4">
        <h3 className="text-lg font-semibold">Survey Statistics</h3>
        <p className="text-gray-600">Total Responses: {analytics.totalResponses}</p>
        <p className="text-gray-600">Average Rating: {analytics.averageRating}</p>
        {/* Add more statistics as necessary */}
      </div>
    </div>
  );
};

export default SurveyAnalytics;
