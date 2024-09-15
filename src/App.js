import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import DoctorDashboard from './pages/DoctorDashboard';
import PetOwnerDashboard from './pages/PetOwnerDashboard';
import { AuthProvider, useAuth } from './AuthContext';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const { accessToken } = useAuth(); // Access authentication state

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Protect routes that require authentication */}
        <Route path="/doctor" element={accessToken ? <DoctorDashboard /> : <Navigate to="/" />} />
        <Route path="/pet-owner" element={accessToken ? <PetOwnerDashboard /> : <Navigate to="/" />} />
        {/* You may add more protected routes here */}
      </Routes>
    </Router>
  );
}

export default App;
