import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Header from './Components/Header';
import Home from './Pages/Home';
import Footer from './Components/Footer';
import Services from './Pages/Services';
import Courses from './Pages/Courses';
import Alumni from './Pages/Alumni';
import ConsultancyForm from './Pages/ConsultancyForm';
import AboutUs from './Pages/AboutUs';
import ContactUs from './Pages/ContactUs';
import ContactForm from './Pages/ContactForm';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import SingleApplication from './Pages/SingleApplication';
import ScrollUp from './Common/ScrollUp';
import ProtectedRoute from './Common/ProtectedRoute';
import TeacherDashboard from './Pages/TeacherDashboard';
import SubmitAssessment from './Pages/SubmitAssessment';
import AssignAssisment from './Pages/AssignAssisment';


function App() {
  const userType = localStorage.getItem("userType");

  return (
    <div className="App">
      <Header/>
      <ScrollUp />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/services" element={<Services/>}/>
        <Route path="/courses" element={<Courses/>}/>
        <Route path="/alumni" element={<Alumni/>}/>
        <Route path="/consultancy" element={<ConsultancyForm/>}/>
        <Route path="/about" element={<AboutUs/>}/>
        <Route path="/contact-us" element={<ContactUs/>}/>
        <Route path="/contact" element={<ContactForm/>}/>
        <Route path="/submit-assessment/:id" element={<SubmitAssessment/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/singleApplication/:id" element={<SingleApplication/>}/>
        
        {/* Protected Routes */}
        {userType === "admin" && <Route path="/dashboard" element={<ProtectedRoute element={Dashboard}/>} />}
        {userType === "admin" && <Route path="/assign-Assisment/:id" element={<ProtectedRoute element={AssignAssisment}/>} />}
        {userType === "teacher" && <Route path="/teacherDashboard/:userId" element={<ProtectedRoute element={TeacherDashboard}/>} />}
        
        {/* Redirect to login if userType is not admin or teacher */}
        {!userType && <Navigate to="/login" />}
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
