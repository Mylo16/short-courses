import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar2 from "../components/NavBar2";
import images from "../utils/images";
import '../css/dashboard.css';
import CircleProgressBar from "../utils/progressbar";
import AdminCalendar from "../components/Calendar";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../utils/firebaseConfig";
import { fetchEnrollments } from "../redux/enrollmentsSlice";
import { fetchCourses, fetchTopPicks } from "../redux/coursesSlice";
import { fetchEvents } from "../redux/calendarSlice";
import LoadingBar from "../components/loadingBar";

export default function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enrolledCourses, status } = useSelector((state) => state.enrollments);
  const { topPicks, topPicksLoading } = useSelector((state) => state.courses);
  const { eventsOnTimeline, loading } = useSelector((state) => state.calendar);

  useEffect(() => {
    
    dispatch(fetchEnrollments(auth.currentUser.uid));
    dispatch(fetchCourses());
    dispatch(fetchEvents(auth.currentUser.uid));
    dispatch(fetchTopPicks());

  }, []);

  
  useEffect(() => {
    const handleBackButton = () => {
      navigate("/", { replace: true });
    };

    window.addEventListener("popstate", handleBackButton);

    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, [navigate]);

  const handleCourseClick = (courseId) => {
    navigate(`/course-details/${courseId}`);
  }

  const joinZoomClass = (zoomUrl) => {
    window.location.href = zoomUrl;
  }

  return(
    <>
      <NavBar2 />
      <div className="dashboard-ctn">
        <section className="timeline-stn">
          <div className="welcome-msg">Welcome back, Richard 👋</div>

          <div className="tl-header">Timeline</div>
          <div className="tl-description">See below links for your next classes or activities</div>
          <div className="tl-ctn">
            {loading ?
              <LoadingBar /> : 
              eventsOnTimeline.map((event, index) => (
                <div key={index} className="tl-card">
                  <div className="tl-cat">{event.title}</div>
                  <div className="tl-title">{event.courseName}</div>
                  <div className="tl-date-ctn">
                    <span>📅</span>
                    <div>{event.eventDate}</div>
                  </div>
                  <div className="tl-date-ctn">
                    <span>⏰</span>
                    <div>{event.startTime} - {event.endTime} GMT</div>
                  </div>
                  <div className="tl-profile-ctn">
                    <div className="tl-profile"><img src={event.facilitatorImage}/></div>
                    <div>{event.facilitatorName}</div>
                  </div>
                  <button onClick={() => joinZoomClass(event.zoomLink)} type="button">Join Now</button>
                </div>
              ))
            }
          </div>
        </section>
        <section className="your-courses">
          
          {enrolledCourses.length > 0 && (<div className="yc-title">Your Courses</div>)}
          <div className="yc-ctn">
          {enrolledCourses && enrolledCourses.map((course, index) => (
              <div key={index} onClick={() => handleCourseClick(course.id)} className="yc-card">
                <div className="yc-img-ctn"><img src={course.course_pic} alt="course-pic"/></div>
                <div className="yc-summary-ctn">
                  <div>▶️ {course.numVideos} videos</div>
                  <div>⌚ {course.duration}</div>
                </div>
                <div className="yc-name">{course.course_name}</div>
                <div className="yc-status-ctn">
                  <div className="yc-status">Enrolled</div>
                  <CircleProgressBar percentage={course.progress} />
                </div>
                <div className="yc-profile-ctn">
                  <div className="yc-profile"><img src={course.facilitatorImage}/></div>
                  <div>{course.facilitatorName}</div>
                </div>
              </div>
          ))}
          </div>
        </section>
        <section className="courses-stn">
          <div className="yc-title-ctn">
            <div className="yc-title">Top Picks</div>
            <button className="yc-view-btn" onClick={() => navigate('/courses')} type="button">View all</button>
          </div>
          <div className="yc-ctn">
            {topPicksLoading ?
              <LoadingBar /> :
              topPicks.map((course, index) => (
                <div key={index} className="yc-card">
                  <div className="yc-img-ctn"><img src={course.course_pic} /></div>
                  <div className="yc-summary-ctn">
                    <div>▶️ {course.numVideos} videos</div>
                    <div>⌚ {course.duration} weeks</div>
                  </div>
                  <div className="yc-name">{course.course_name}</div>
                  <div className="yc-status tp-price">GHC {course.price}.00</div>
                  <div className="yc-profile-ctn">
                    <div className="yc-profile"><img src={course.facilitatorImg}/></div>
                    <div>{course.facilitatorName}</div>
                  </div>
                </div>
              ))
            }
          </div>
        </section>
        <section className="calendar-stn">
          <AdminCalendar user="admin" />
        </section>
        <div className='logo-strike bottom'>
          <img className='strike-mob' src={images.logo2}/>
          <img className='strike-mob' src={images.logo2}/>
          <img className='strike-mob' src={images.logo2}/>
          <img className='strike-pc' src={images.logo2}/>
          <img className='strike-pc' src={images.logo2}/>
        </div>
      </div>
    </>
  );
}