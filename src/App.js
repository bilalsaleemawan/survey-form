// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Common/Navbar';
import Register from './Pages/Register';
import Login from './Pages/Login';
import ForgotPassword from './Pages/ForgetPassword';
import SurveyList from './Components/SurveyList';
import HomePage from './Pages/HomePage';
import SurveyPage from './Pages/SurveyPage';
import CreateSurvey from './Components/CreateSurvey';
import SurveyDetail from './Components/SurveyDetail';
import SurveyResponse from './Components/SurveyResponse';
import SurveyAnalytics from './Components/SurveyAnalytics';
import Layout from './Components/Layout/Layout'; // Ensure the import is correct
import UserLayout from './Components/Layout/UserLayout'
import UserDashboard from './Components/Dashboard/UserDashboard';
import Dashboard from './Components/Dashboard/Dashboard'; // Newly added
import Profile from './Components/Profile';
function App() {
  return (
    <Router>
      {/* Render Navbar for all pages */}
      <Navbar />
      
      <Routes>
        {/* Main Routes */}
        <Route path="/survey/:id" element={<SurveyPage/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/" element={<HomePage/>} />
        


        <Route path="/user" element={<UserLayout />}>
          <Route index element={<UserDashboard />} />
          <Route path="surveylist" element={<SurveyList />} />
          <Route path="analytics" element={<SurveyAnalytics />} />
          <Route path="profile" element={<Profile />} />
        </Route>



        {/* Routes under the Layout for survey-related pages */}
        <Route path="/admin" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="create" element={<CreateSurvey />} />
          <Route path="surveylist" element={<SurveyList />} />
          <Route path="surveys/:id" element={<SurveyDetail/>} />
          <Route path="responses/:id" element={<SurveyResponse />} />
          <Route path="analytics/:id" element={<SurveyAnalytics />} />
          <Route path="profile" element={<Profile />} /> {/* Add the profile route */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
