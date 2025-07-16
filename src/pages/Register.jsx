import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaUser, FaEnvelope, FaLock, FaVenusMars, FaCalendarAlt,
  FaPhone, FaMapMarkerAlt, FaBriefcase, FaGraduationCap, FaHeart, FaImage
} from 'react-icons/fa';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    dob: '',
    phone: '',
    city: '',
    age: '',
    profession: '',
    education: '',
    interests: '',
    photo: null
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 8) newErrors.password = 'Minimum 8 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.dob) newErrors.dob = 'Date of birth is required';
    else {
      const age = Math.floor((new Date() - new Date(formData.dob)) / (365.25 * 24 * 60 * 60 * 1000));
      if (age < 18) newErrors.dob = 'Must be at least 18 years old';
    }
    if (!formData.phone || !/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Phone must be 10 digits';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.profession) newErrors.profession = 'Profession is required';
    if (!formData.education) newErrors.education = 'Education is required';
    if (!formData.interests) newErrors.interests = 'Interests are required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    const payload = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (value) payload.append(key, value);
    });

    try {
     const response = await fetch('https://matrimony-website-api-backend.onrender.com/register/', {
        method: 'POST',
        body: payload
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMsg('Registration successful! Redirecting...');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setErrors(data);
      }
    } catch (error) {
      setErrors({ general: 'Network error. Try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <h2>Create Your Account</h2>
          <p>Start your journey</p>
        </div>

        {successMsg && <div className="success-message"><p>{successMsg}</p></div>}
        {errors.general && <p className="error-message">{errors.general}</p>}

        <form className="auth-form" onSubmit={handleSubmit}>
          {/* Basic Info */}
          <InputField icon={<FaUser />} name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} error={errors.name} />
          <InputField icon={<FaEnvelope />} name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} error={errors.email} />
          <InputField icon={<FaLock />} name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} error={errors.password} />
          <InputField icon={<FaLock />} name="confirmPassword" type="password" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} error={errors.confirmPassword} />

          {/* Gender and DOB */}
          <div className="form-row">
            <div className="form-group">
              <label>Gender</label>
              <div className="input-with-icon">
                <FaVenusMars className="input-icon" />
                <select name="gender" value={formData.gender} onChange={handleChange} className={errors.gender ? 'error' : ''}>
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              {errors.gender && <span className="error-message">{errors.gender}</span>}
            </div>
            <InputField icon={<FaCalendarAlt />} name="dob" type="date" placeholder="DOB" value={formData.dob} onChange={handleChange} error={errors.dob} />
          </div>

          {/* Contact & Address */}
          <div className="form-row">
            <InputField icon={<FaPhone />} name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} error={errors.phone} />
            <InputField icon={<FaMapMarkerAlt />} name="city" placeholder="City" value={formData.city} onChange={handleChange} error={errors.city} />
          </div>

          {/* Profile Info */}
          <InputField icon={<FaBriefcase />} name="profession" placeholder="Profession" value={formData.profession} onChange={handleChange} error={errors.profession} />
          <InputField icon={<FaGraduationCap />} name="education" placeholder="Education" value={formData.education} onChange={handleChange} error={errors.education} />
          <InputField icon={<FaHeart />} name="interests" placeholder="Interests (comma-separated)" value={formData.interests} onChange={handleChange} error={errors.interests} />
          <InputField icon={<FaImage />} name="photo" type="file" accept="image/*" onChange={handleChange} />

          <div className="form-group terms">
            <input type="checkbox" id="terms" required />
            <label htmlFor="terms">I agree to <a href="/terms">Terms</a> and <a href="/privacy">Privacy</a></label>
          </div>

          <button type="submit" className="auth-btn" disabled={isLoading}>
            {isLoading ? 'Registering...' : 'Create Account'}
          </button>
        </form>

        <div className="auth-footer">
          <p>Already have an account? <a href="/login">Login</a></p>
        </div>
      </div>
    </div>
  );
}

// 🔁 Reusable Input Field Component
function InputField({ icon, name, type = 'text', placeholder, value, onChange, error, accept }) {
  return (
    <div className="form-group">
      <div className="input-with-icon">
        {icon}
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={type !== 'file' ? value : undefined}
          onChange={onChange}
          className={error ? 'error' : ''}
          accept={accept}
        />
      </div>
      {error && <span className="error-message">{error}</span>}
    </div>
  );
}

export default Register;
