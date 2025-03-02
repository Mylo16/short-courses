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
import { fetchRecentCourse, fetchTopPicks } from "../redux/coursesSlice";
import { fetchEvents } from "../redux/calendarSlice";
import LoadingBar from "../components/loadingBar";
import { createUserAttendance, fetchUserAttendance, updateUserAttendance } from "../redux/attendanceSlice";
import { fetchCurrentUser } from "../redux/usersSlice";

export default function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { activeCourses, completedCourses, fetchEnrollmentsLoading } = useSelector((state) => state.enrollments);
  const { topPicks, topPicksLoading } = useSelector((state) => state.courses);
  const { eventsOnTimeline, loading } = useSelector((state) => state.calendar);
  const { currentUser } = useSelector((state) => state.users);
  const [isActive, setIsActive] = useState(true);
  console.log(eventsOnTimeline);
  useEffect(() => {
    dispatch(fetchEnrollments(auth.currentUser.uid));
    dispatch(fetchEvents(auth.currentUser.uid));
    dispatch(fetchTopPicks());
    dispatch(fetchRecentCourse(auth.currentUser.uid));
    dispatch(fetchUserAttendance(auth.currentUser.uid));
    dispatch(fetchCurrentUser(auth.currentUser.uid));
    dispatch(fetchUserAttendance(auth.currentUser.uid));
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

  const joinZoomClass = async (zoomUrl, eventId) => {
    try {
    await dispatch(createUserAttendance({ eventId, userData: currentUser }));
    console.log(auth.currentUser.uid);
    window.open(zoomUrl, "_blank");
    } catch (error) {
      console.error("error joining zoom class:", error);
    }
  };

  return(
    <main className="main-view">
    <section className="content-view">
      <NavBar2 />
      <div className="dashboard-ctn">
        <section className="timeline-stn">
          <div className="welcome-msg">Welcome {currentUser.firstName} 👋</div>
          <div className="yc-header">Your Courses</div>
          <div className='toggle-stn'>
            <div className="toggle-stn-ctn">
              <div className="tsc-main">
                <div onClick={() => setIsActive(true)} className={`active-stn ${isActive ? 'highlight': ''}`}>Active</div>
                <div onClick={() => setIsActive(false)} className={`completed-stn ${!isActive ? 'highlight': ''}`}>Completed</div>
              </div>
            </div>
          </div>
          {isActive ? (
            <div className="yc-container">
              {fetchEnrollmentsLoading ? <LoadingBar /> : (  
              activeCourses.length === 0 ? (
                <div>You haven't registered for a course yet</div>
              ): (
              activeCourses.map((course, index) => (
                <div onClick={() => navigate(`/course-details/${course.id}`)} key={index} className="yc-item">
                  <div className="yc-left">
                    <img src={course.course_icon} alt="course"/>
                    <div className="yc-course-ctn">
                      <div className="yc-course-name">{course.course_name}</div>
                      <div className="yc-message">Click to continue with course...</div>
                    </div>
                  </div>
                  <div className="yc-right">
                    <CircleProgressBar percentage={course.progress}/>
                  </div>
                </div>
              ))
              )
              )}
            </div>
          ):(
            <div className="yc-container">
              {completedCourses.length === 0 ? (
                <div>You haven't completed any course yet</div>
              ):(

              completedCourses.map((course, index) => (
                <div key={index} className="yc-item completed">
                  <div className="yc-left">
                    <img src={course.course_icon} alt="course"/>
                    <div className="yc-course-ctn">
                      <div className="yc-course-name">{course.course_name}</div>
                      <div className="yc-message">Congratulations Pal 🎉! Your certificate is ready.</div>
                    </div>                  
                  </div>
                  <div className="yc-right">
                    <div onClick={() => navigate(`/certificate/${course.id}`)} className="yc-cert-ctn">
                      <img src={images.certificateIcon}/>
                      <div className="view-cert">View Certificate</div>
                    </div>
                  </div>
                </div>
              ))
              )}
            </div>
          )}
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
                  <div className="tl-btn-ctn">
                    <button onClick={() => joinZoomClass(event.zoomLink, event.id)} type="button">Join Now</button>
                    {currentUser.role === "admin" && (
                      <button onClick={() => dispatch(updateUserAttendance(event.id))} type="button">Mark Attendance</button>
                    )}
                  </div>
                </div>
              ))
            }
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
                    <div>⌚ {course.duration}</div>
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
          <AdminCalendar user={currentUser} />
        </section>
      </div>
    </section>
    </main>
  );
}