// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './components/auth/AuthContext';
import Login from './components/auth/Login';
import Signup from './components/auth/SignUp';
import Dashboard from './components/auth/Dashboard';
import PrivateRoute from './components/auth/PrivateRoute';
import Navbar from './components/layout/Navbar';
import Favourite from './components/layout/Favourite';



const App = () => {
  return (
    <Router>
      <AuthProvider>
        <div className='wrap'>
        <Navbar/>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
              <Route
              path="/favourite"
              element={
                <PrivateRoute>
                  <Favourite />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;
