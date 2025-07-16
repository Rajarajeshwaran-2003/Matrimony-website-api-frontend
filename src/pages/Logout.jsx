import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    const logoutUser = async () => {
      try {
        // Optional: Notify the backend if logout endpoint exists
        await fetch('https://matrimony-website-api-backend.onrender.com/logout/', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: localStorage.getItem('userEmail') }) // if needed
        });

        // Clear all stored user data
        localStorage.clear();
        sessionStorage.clear();

        // Redirect to login page
        navigate('/login');
      } catch (error) {
        console.error('Logout failed:', error);
        navigate('/login'); // Still redirect even if backend logout fails
      }
    };

    logoutUser();
  }, [navigate]);

  return (
    <div className="logout-page">
      <div className="logout-container">
        <p>Logging out...</p>
      </div>
    </div>
  );
}

export default Logout;