import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const email = localStorage.getItem('userEmail');

  useEffect(() => {
    if (!email) {
      navigate('/login');
      return;
    }

    // Fetch user profile details
    fetch(`https://matrimony-website-api-backend.onrender.com/profile/${email}/`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch profile');
        return res.json();
      })
      .then(data => {
        setUserData(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [email, navigate]);

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate('/login');
  };

  if (loading) return <p>Loading dashboard...</p>;

  return (
    <div className="dashboard-container">
        <center>
      <h2>Welcome, {userData?.name || email}!</h2>
      </center>

      <div className="profile-summary">
        {userData?.photo && (
          <img
            src={`https://matrimony-website-api-backend.onrender.com${userData.photo}`}
            alt="Profile"
            className="profile-photo"
          />
        )}
        <p><strong>Age:</strong> {userData.age}</p>
        <p><strong>City:</strong> {userData.city}</p>
        <p><strong>Profession:</strong> {userData.profession}</p>
        <p><strong>Education:</strong> {userData.education}</p>
        <p><strong>Interests:</strong> {userData.interests}</p>
      </div>

      <div className="dashboard-actions">
        <Link to="/editprofile" className="dashboard-btn">Edit Profile</Link>
        <Link to="/candidates" className="dashboard-btn">View Candidates</Link>
        <Link to="/testimony" className="dashboard-btn">Success Stories</Link>
        <button onClick={handleLogout} className="dashboard-btn logout">Logout</button>
      </div>
    </div>
  );
}

export default Dashboard;
