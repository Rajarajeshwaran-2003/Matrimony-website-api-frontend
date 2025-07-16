import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateProfile() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    city: '',
    education: '',
    profession: '',
    interests: '',
    photo: null
  });

  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    if (!email) {
      // If not logged in, redirect to login
      navigate('/login');
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = localStorage.getItem('userEmail');
    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) payload.append(key, value);
    });
    payload.append('email', email); // associate profile with logged-in user
    try {
      const res = await fetch(`https://matrimony-website-api-backend.onrender.com/update/${email}/`, {
  method: 'PATCH',  // ✅ use PATCH instead of PUT
  body: payload,
});


      if (response.ok) {
        alert('Profile created successfully!');
        navigate('/candidates');
      } else {
        const errorData = await response.json();
        alert('Error: ' + (errorData.error || 'Profile creation failed.'));
      }
    } catch (err) {
      console.error(err);
      alert('Network error');
    }
  };

  return (
    <div className="create-profile-page">
      <h2>Create Your Profile</h2>
      <form onSubmit={handleSubmit} className="profile-form">
        <input name="name" type="text" placeholder="Full Name" onChange={handleChange} required />
        <input name="age" type="number" placeholder="Age" onChange={handleChange} required />
        <input name="city" type="text" placeholder="City" onChange={handleChange} required />
        <input name="education" type="text" placeholder="Education" onChange={handleChange} required />
        <input name="profession" type="text" placeholder="Profession" onChange={handleChange} required />
        <input name="interests" type="text" placeholder="Interests (comma-separated)" onChange={handleChange} required />
        <input name="photo" type="file" accept="image/*" onChange={handleChange} />
        <button type="submit">Submit Profile</button>
      </form>
    </div>
  );
}

export default CreateProfile;
