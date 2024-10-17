import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const SurveyList = () => {
  const [surveys, setSurveys] = useState([]);

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const response = await axios.get("http://localhost:5000/allsurveys");
        console.log("Fetched data:", response.data);
        setSurveys(response.data);
      } catch (error) {
        console.error("Error fetching surveys:", error);
      }
    };

    fetchSurveys();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h2 className="text-3xl font-bold text-gray-800 text-center">
        Survey List
      </h2>
      {surveys.length === 0 ? (
        <div className="text-center text-gray-500">No surveys available.</div>
      ) : (
        surveys.map((survey) => (
          <div
            key={survey._id}
            className="p-6 border rounded-lg bg-white shadow hover:shadow-lg transition duration-300"
          >
            <h3 className="text-2xl font-semibold text-gray-800">
              {survey.title}
            </h3>
            <p className="text-gray-600 mt-2">{survey.description}</p>
            <p className="text-sm text-gray-500 mt-1">
              Start Date: {new Date(survey.startDate).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-500">
              End Date: {new Date(survey.endDate).toLocaleDateString()}
            </p>
            <p
              className={`mt-2 font-semibold ${
                survey.isActive ? "text-green-600" : "text-red-600"
              }`}
            >
              {survey.isActive ? "Active" : "Inactive"}
            </p>
            <Link to={`/survey/${survey._id}`}>
              <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition duration-300">
                View Survey
              </button>
            </Link>
          </div>
        ))
      )}
    </div>
  );
};

export default SurveyList;







































// // SurveyList.js
// import React, { useEffect, useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import axios from "axios";

// const SurveyList = () => {
//   const [surveys, setSurveys] = useState([]);
//   const location = useLocation();

//   // Determine if we're in the admin route
//   const isAdmin = location.pathname.startsWith('/admin');

//   useEffect(() => {
//     const fetchSurveys = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/allsurveys");
//         console.log("Fetched data:", response.data);
//         setSurveys(response.data);
//       } catch (error) {
//         console.error("Error fetching surveys:", error);
//       }
//     };

//     fetchSurveys();
//   }, []);

//   return (
//     <div className="p-6 max-w-4xl mx-auto space-y-6">
//       <h2 className="text-3xl font-bold text-gray-800 text-center">
//         Survey List
//       </h2>
//       {surveys.length === 0 ? (
//         <div className="text-center text-gray-500">No surveys available.</div>
//       ) : (
//         surveys.map((survey) => (
//           <div
//             key={survey._id}
//             className="p-6 border rounded-lg bg-white shadow hover:shadow-lg transition duration-300"
//           >
//             <h3 className="text-2xl font-semibold text-gray-800">
//               {survey.title}
//             </h3>
//             <p className="text-gray-600 mt-2">{survey.description}</p>
//             <p className="text-sm text-gray-500 mt-1">
//               Start Date: {new Date(survey.startDate).toLocaleDateString()}
//             </p>
//             <p className="text-sm text-gray-500">
//               End Date: {new Date(survey.endDate).toLocaleDateString()}
//             </p>
//             <p
//               className={`mt-2 font-semibold ${
//                 survey.isActive ? "text-green-600" : "text-red-600"
//               }`}
//             >
//               {survey.isActive ? "Active" : "Inactive"}
//             </p>
//             <div className="mt-4 space-x-2">
//               {/* Public "View Survey" Link */}
//               {!isAdmin && (
//                 <Link to={`/survey/${survey._id}`}>
//                   <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition duration-300">
//                     View Survey
//                   </button>
//                 </Link>
//               )}

//               {/* Admin Links: Manage, Responses, Analytics */}
//               {isAdmin && (
//                 <>
//                   <Link to={`surveys/${survey._id}`}>
//                     <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300">
//                       Manage Survey
//                     </button>
//                   </Link>
//                   <Link to={`responses/${survey._id}`}>
//                     <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-300">
//                       Responses
//                     </button>
//                   </Link>
//                   <Link to={`analytics/${survey._id}`}>
//                     <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition duration-300">
//                       Analytics
//                     </button>
//                   </Link>
//                 </>
//               )}
//             </div>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default SurveyList;
