import React from 'react';
import { useParams } from 'react-router-dom';
import SurveyDetail from '../Components/SurveyDetail';
import SurveyResponse from '../Components/SurveyResponse';

const SurveyPage = () => {
  const { id } = useParams();
  
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <SurveyDetail />
      <SurveyResponse match={{ params: { id } }} />
    </div>
  );
};

export default SurveyPage;
