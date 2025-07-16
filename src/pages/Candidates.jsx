import React, { useEffect, useState } from 'react';
import CandidateCard from '../components/CandidateCard';

function Candidates() {
  const [allCandidates, setAllCandidates] = useState([]);
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [ageRange, setAgeRange] = useState([25, 35]);
  const [selectedCity, setSelectedCity] = useState('All');

  // Fetch data from backend
  useEffect(() => {
    fetch('https://matrimony-website-api-backend.onrender.com/candidates/')
      .then(res => res.json())
      .then(data => {
        setAllCandidates(data);
        setFilteredCandidates(data);
      })
      .catch(err => console.error('Failed to fetch candidates:', err));
  }, []);

  // Get unique cities for dropdown
  const cities = ['All', ...new Set(allCandidates.map(c => c.city.split(',')[0]))];

  // Handle filtering
  const handleSearch = () => {
    const results = allCandidates.filter(candidate => {
      const matchesSearch =
        candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.profession.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (candidate.interests && candidate.interests.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesAge = candidate.age >= ageRange[0] && candidate.age <= ageRange[1];
      const matchesCity = selectedCity === 'All' || candidate.city.startsWith(selectedCity);

      return matchesSearch && matchesAge && matchesCity;
    });

    setFilteredCandidates(results);
  };

  return (
    <div className="candidates-page">
      <div className="page-header">
        <h2>Find Your Perfect Match</h2>
        <p>Browse through our verified profiles to find someone special</p>
      </div>

      <div className="search-filters">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by name, profession or interests..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>

        <div className="filter-controls">
          <div className="filter-group">
            <label>Age Range: {ageRange[0]} - {ageRange[1]}</label>
            <input
              type="range"
              min="22"
              max="45"
              value={ageRange[0]}
              onChange={(e) => setAgeRange([parseInt(e.target.value), ageRange[1]])}
            />
            <input
              type="range"
              min="22"
              max="45"
              value={ageRange[1]}
              onChange={(e) => setAgeRange([ageRange[0], parseInt(e.target.value)])}
            />
          </div>

          <div className="filter-group">
            <label>City:</label>
            <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)}>
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="candidates-grid">
        {filteredCandidates.length > 0 ? (
          filteredCandidates.map((candidate, idx) => (
            <CandidateCard
              key={idx}
              name={candidate.name}
              age={candidate.age}
              city={candidate.city}
              education={candidate.education}
              profession={candidate.profession}
              photo={
                candidate.photo
                  ? `http://127.0.0.1:8000${candidate.photo}`
                  : '/images/default-profile.png'
              }
              interests={candidate.interests ? candidate.interests.split(',').map(i => i.trim()) : []}
            />
          ))
        ) : (
          <div className="no-results">
            <h3>No candidates match your search criteria</h3>
            <p>Try adjusting your filters or search term</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Candidates;
