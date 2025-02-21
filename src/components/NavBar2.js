import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import '../css/navbar.css';
import '../css/navbar2.css';
import images from "../utils/images";
import { useAuth } from "../utils/authProvider";
import { useSelector } from "react-redux";

export default function NavBar2() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const {allCourses, loading} = useSelector((state) => state.courses);
  const [expandedCourses, setExpandedCourses] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCourses, setFilteredCourses] = useState([]);
  const navigate = useNavigate();
  
  const toggleCourses = () => {
    setExpandedCourses(!expandedCourses);
  };

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

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredCourses([]);
    } else {
      const filtered = allCourses.filter((course) =>
        course.course_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCourses(filtered);
    }
  }, [searchTerm, allCourses]);

  return (
    <>
      <nav className="nav nav2">
        <div className="logo">
          <img className='logo-pic' src={images.logo} alt="Logo" />
        </div>
        <div className="search-container">
        <input
          type="text"
          placeholder="Search courses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        
        {filteredCourses.length > 0 && (
          <ul className="search-results">
            {filteredCourses.map((course) => (
              <li
                key={course.id}
                onClick={() => {
                  navigate(`/course-info/${course.id}`);
                  setSearchTerm("");
                }}
                className="search-item"
              >
                {course.course_name}
              </li>
            ))}
          </ul>
        )}
      </div>
        <div className="nav2-right">
        <img className="notification" src={images.notification} alt="Notification" />
        <div onClick={() => { logout() }} className='sign-in sign-in2'>
          <img className='profile' src={images.profile} alt="Profile" />
        </div>
        </div>
        <div className="menu-icon menu-icon2" onClick={() => setIsOpen(!isOpen)}>
          <span className={`icon-bar ${isOpen ? 'rotate' : ''}`}></span>
          <span className={`icon-bar ${isOpen ? 'fade-out' : ''}`}></span>
          <span className={`icon-bar ${isOpen ? 'rotate-reverse' : ''}`}></span>
        </div>
        <div className={`links links2 ${isOpen ? 'open' : ''}`}>
          <ul className="side-links">
            <li className={`side-link ${location.pathname === '/dashboard' ? 'active' : ''}`} onClick={() => setIsOpen(false)}>
              <img className="link-icon" src={images.dashboard} alt="dashboard"/>
              <Link className="link" to="/dashboard">Dashboard</Link>
            </li>
            <li className={`side-link ${location.pathname === '/courses' ? 'active' : ''}`} onClick={() => {toggleCourses(); setIsOpen(false)}}>
              <img className="link-icon" src={images.courses} alt="courses"/>
              <Link className="link" to="/courses">
                Courses
              </Link>
              <img className={`chevron-down ${expandedCourses && location.pathname === "/courses" ? "rotate" : ""}`} src={images.chevronDown} alt="Chevron Down" />
            </li>
            {location.pathname === "/courses" && !loading && (
              <div className={`course-links ${expandedCourses ? "expanded" : ""}`}>
                {allCourses.map((course, index) => (
                  <Link key={index} className="course-link">{course.course_name}</Link>
                ))}
              </div>
            )}
            <li className={`side-link ${location.pathname === '/about' ? 'active' : ''}`} onClick={() => setIsOpen(false)}>
              <img className="link-icon" src={images.aboutUs} alt="about-us"/>
              <Link className="link" to="/about">About Us</Link>
            </li>
            <li className={`side-link ${location.pathname === '/summary' ? 'active' : ''}`} onClick={() => setIsOpen(false)}>
              <img className="link-icon" src={images.summary} alt="summary"/>            
              <Link className="link" to="/summary">Summary</Link>
            </li>
            <li className={`side-link ${location.pathname === '/certificate' ? 'active' : ''}`} onClick={() => setIsOpen(false)}>
              <img className="link-icon" src={images.certificateIcon} alt="certificate"/>  
              <Link className="link" to="/certificate">Certificate</Link>
            </li>
            <li className={`side-link ${user.role !== "admin" ? 'not-admin' : ''} ${location.pathname === '/admin' ? 'active' : ''}`} onClick={() => setIsOpen(false)}>
              <img className="link-icon" src={images.admin} alt="admin"/>
              <Link className="link" to="/admin">Admin Panel</Link>
            </li>
          </ul>
        </div>
        {isOpen && <div className="overlay" onClick={() => setIsOpen(false)} />}
      </nav>
    </>
  );
}
