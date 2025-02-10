import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../css/navbar.css';
import '../css/navbar2.css';
import images from "../utils/images";
import { useAuth } from "../utils/authProvider";

export default function NavBar2() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState(null);
  const { user, logout } = useAuth();
  const handleLinkClicked = (index) => {
    setActiveLink(index);
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    // Check if the click was inside the menu icon or links container
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
  return(
    <>
      <nav className="nav nav2">
        <div className="logo">
          <img className='logo-pic' src={images.logo}/>
        </div>
        <img className="notification" src={images.notification} />
        <div onClick={() => {logout()}} className='sign-in sign-in2'>
          <img className='profile' src={images.profile} />
        </div>
        <div className="menu-icon menu-icon2" onClick={() => setIsOpen(!isOpen)}>
          <span className={`icon-bar ${isOpen ? 'rotate' : ''}`}></span>
          <span className={`icon-bar ${isOpen ? 'fade-out' : ''}`}></span>
          <span className={`icon-bar ${isOpen ? 'rotate-reverse' : ''}`}></span>
        </div>
        <div className={`links links2 ${isOpen ? 'open' : ''}`}>
          <ul className="side-links">
            <li className={`side-link ${activeLink === 1 ? 'active' : ''}`} onClick={() => handleLinkClicked(1)}>
              <Link className="link" to="/dashboard">Dashboard</Link>
            </li>
            <li className={`side-link ${activeLink === 2 ? 'active' : ''}`} onClick={() => handleLinkClicked(2)}>
              <Link className="link" to="/courses">Courses</Link>
            </li>
            <li className={`side-link ${activeLink === 3 ? 'active' : ''}`} onClick={() => handleLinkClicked(4)}>
              <Link className="link" to="/about">About Us</Link>
            </li>
            <li className={`side-link ${activeLink === 4 ? 'active' : ''}`} onClick={() => handleLinkClicked(5)}>
              <Link className="link" to="/summary">Summary</Link>
            </li>
            <li className={`side-link ${user.role !== "admin" ? 'not-admin': ''} ${activeLink === 5 ? 'active' : ''}`} onClick={() => handleLinkClicked(6)}>
              <Link className="link" to="/admin">Admin Panel</Link>
            </li>
            
            
          </ul>
        </div>
        {isOpen && <div className="overlay" onClick={() => setIsOpen(false)} />}
      </nav>
    </>
 );
}