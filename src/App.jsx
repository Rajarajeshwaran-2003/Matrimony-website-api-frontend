import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; 
import Home from './pages/Home';
import Candidates from './pages/Candidates';
import Testimony from './pages/Testimony';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Register from './pages/Register';
import CreateProfile from './pages/CreateProfile';
import EditProfile from './pages/EditProfile';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/editprofile" element={<EditProfile />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/candidates" element={<Candidates />} />
        <Route path="/Profile" element={<CreateProfile />} />
        <Route path="/testimony" element={<Testimony />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path='/logout' element={<Logout />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
