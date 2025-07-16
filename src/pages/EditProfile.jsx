import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function EditProfile() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    gender: '',
    dob: '',
    age: '',
    profession: '',
    education: '',
    interests: '',
    photo: null,
  });

  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState('');
  const email = localStorage.getItem('userEmail'); // User email stored on login

  useEffect(() => {
    if (!email) {
      navigate('/login');
      return;
    }

    // Fetch user data
    fetch(`https://matrimony-website-api-backend.onrender.com/profile/${email}/`)
      .then(res => res.json())
      .then(data => {
        setFormData(prev => ({
          ...prev,
          ...data
        }));
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [email, navigate]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (value) payload.append(key, value);
    });

    try {
      const res = await fetch(`https://matrimony-website-api-backend.onrender.com/update/${email}/`, {
        method: 'PUT',
        body: payload
      });

      if (res.ok) {
        setMsg('Profile updated successfully!');
        setTimeout(() => navigate('/dashboard'), 2000);
      } else {
        const errData = await res.json();
        setMsg(errData.error || 'Failed to update');
      }
    } catch (err) {
      setMsg('Network error.');
    }
  };

  if (loading) return <p>Loading profile...</p>;

  return (
    <div className="edit-profile-page">
      <h2>Edit Your Profile</h2>
      {msg && <p>{msg}</p>}
      <form onSubmit={handleSubmit} className="edit-profile-form">
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" required />
        <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" required />
        <input name="city" value={formData.city} onChange={handleChange} placeholder="City" required />
        <select name="gender" value={formData.gender} onChange={handleChange} required>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <input name="dob" type="date" value={formData.dob} onChange={handleChange} required />
        <input name="age" type="number" value={formData.age} onChange={handleChange} required />
        <input name="profession" value={formData.profession} onChange={handleChange} placeholder="Profession" />
        <input name="education" value={formData.education} onChange={handleChange} placeholder="Education" />
        <input name="interests" value={formData.interests} onChange={handleChange} placeholder="Interests (comma-separated)" />
        <input name="photo" type="file" accept="image/*" onChange={handleChange} />
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
}

export default EditProfile;
