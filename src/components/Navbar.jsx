import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaHeart, FaBars, FaTimes } from 'react-icons/fa';

function Navbar() {
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  // Responsive check
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Check login status
  useEffect(() => {
    const email = localStorage.getItem('userEmail'); // or authToken
    setIsLoggedIn(!!email);
  }, [location]);

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    setIsLoggedIn(false);
    navigate('/login');
  };

  const renderLinks = () => (
  <>
    <Link
      to="/"
      className={location.pathname === '/' ? 'active' : ''}
      onClick={() => setMobileMenuOpen(false)}
    >
      Home
    </Link>
    <Link
      to="/candidates"
      className={location.pathname === '/candidates' ? 'active' : ''}
      onClick={() => setMobileMenuOpen(false)}
    >
      Candidates
    </Link>
    <Link
      to="/testimony"
      className={location.pathname === '/testimony' ? 'active' : ''}
      onClick={() => setMobileMenuOpen(false)}
    >
      Success Stories
    </Link>
    <Link
      to="/contact"
      className={location.pathname === '/contact' ? 'active' : ''}
      onClick={() => setMobileMenuOpen(false)}
    >
      Contact
    </Link>

    {isLoggedIn ? (
      <>
        <Link
          to="/dashboard"
          className={location.pathname === '/dashboard' ? 'active' : ''}
          onClick={() => setMobileMenuOpen(false)}
        >
          Dashboard
        </Link>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </>
    ) : (
      <>
        <Link
          to="/login"
          className={location.pathname === '/login' ? 'active' : ''}
          onClick={() => setMobileMenuOpen(false)}
        >
          Login
        </Link>
        <Link
          to="/register"
          className="register-btn"
          onClick={() => setMobileMenuOpen(false)}
        >
          Register
        </Link>
      </>
    )}
  </>
);


  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="logo" onClick={() => setMobileMenuOpen(false)}>
          <FaHeart className="heart-icon" />
          <span>MatriMony</span>
        </Link>

        {isMobile ? (
          <>
            <button
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
            {mobileMenuOpen && (
              <div className="mobile-nav-links">{renderLinks()}</div>
            )}
          </>
        ) : (
          <div className="nav-links">{renderLinks()}</div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
