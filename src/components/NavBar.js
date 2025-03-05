import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import images from '../utils/images';
import '../css/navbar.css'
import ThemeToggle from '../utils/ThemeToggle';

function Navbar({ user }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleClickOutside = (event) => {
    if (isOpen && !event.target.closest('.nav') && !event.target.closest('.links')) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  const handleSignIn = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  }

  return (
    <>
      <nav className="nav">
        <div onClick={() => navigate("/")} className="logo">
          <img className='logo-pic' src={images.logo}/>
        </div>
        <div className='right-nav'>
          <ThemeToggle />
          <div onClick={handleSignIn} className='sign-in'>
            <img className='profile' src={images.profile} />
            <p>Sign in</p>
          </div>
        </div>
        
        <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
          <span className={`icon-bar ${isOpen ? 'rotate' : ''}`}></span>
          <span className={`icon-bar ${isOpen ? 'fade-out' : ''}`}></span>
          <span className={`icon-bar ${isOpen ? 'rotate-reverse' : ''}`}></span>
        </div>
        <div className={`links ${isOpen ? 'open' : ''}`}>
          <ul className="side-links">
            <li className="side-link">
              <a className="link" href="/">Home</a>
            </li>
            <li className="side-link">
              <a className="link" href="/#courses">Courses</a>
            </li>
            <li className="side-link">
              <a className="link" href="/#teachers">Teachers</a>
            </li>
            <li className="side-link">
              <a className="link" href="/#about">About Us</a>
            </li>
          </ul>
        </div>
        
        {isOpen && <div className="overlay" onClick={() => setIsOpen(false)} />}
      </nav>
      <div className="outlet"><Outlet /></div>
    </>
  );
}

export default Navbar;
