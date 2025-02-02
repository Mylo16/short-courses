import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar2 from "../components/NavBar2";
import images from "../utils/images";
import '../css/dashboard.css';
import CircleProgressBar from "../utils/progressbar";
import AdminCalendar from "../components/Calendar";
import { getCourses } from "../utils/firestoreService";

export default function Dashboard() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState('');
  

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const fetchedCourses = await getCourses(); // Wait for the data
        setCourses(fetchedCourses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
  
    fetchCourses();
  }, []);

  console.log(courses);
  
  useEffect(() => {
    const handleBackButton = () => {
      navigate("/", { replace: true });
    };

    window.addEventListener("popstate", handleBackButton);

    return () => {
      window.removeEventListener("popstate", handleBackButton);
    };
  }, [navigate]);

  return(
    <>
      <NavBar2 />
      <div className="dashboard-ctn">
        <section className="timeline-stn">
          <div className="welcome-msg">Welcome back, Richard 👋</div>

          <div className="tl-header">Timeline</div>
          <div className="tl-description">See below links for your next classes or activities</div>
          <div className="tl-ctn">
            <div className="tl-card">
                <div className="tl-cat">Online Class</div>
                <div className="tl-title">MATH 356 - Statistics II</div>
                <div className="tl-date-ctn">
                    <span>📅</span>
                    <div>Tue, January 28, 2025</div>
                </div>
                <div className="tl-date-ctn">
                    <span>⏰</span>
                    <div>4:00 PM - 6:00 PM GMT</div>
                </div>
                <div className="tl-profile-ctn">
                   <div className="tl-profile"><img src={images.lec1}/></div>
                    <div>Dr. B.A Amponsah</div>
                </div>
                <button type="button">Join Now</button>
            </div>
            <div className="tl-card">
                <div className="tl-cat">Online Class</div>
                <div className="tl-title">BIT 375 - Data Structures</div>
                <div className="tl-date-ctn">
                    <span>📅</span>
                    <div>Tue, January 29, 2025</div>
                </div>
                <div className="tl-date-ctn">
                    <span>⏰</span>
                    <div>4:00 PM - 6:00 PM GMT</div>
                </div>
                <div className="tl-profile-ctn">
                    <div className="tl-profile"><img src={images.lec4}/></div>
                    <div>Dr. Aborah Abigail</div>
                </div>
                <button type="button">Join Now</button>
            </div>
            <div className="tl-card">
                <div className="tl-cat">Online Class</div>
                <div className="tl-title">MATH 356 - Statistics II</div>
                <div className="tl-date-ctn">
                    <span>📅</span>
                    <div>Tue, January 28, 2025</div>
                </div>
                <div className="tl-date-ctn">
                    <span>⏰</span>
                    <div>4:00 PM - 6:00 PM GMT</div>
                </div>
                <div className="tl-profile-ctn">
                    <div className="tl-profile"><img src={images.lec3}/></div>
                    <div>Dr. Roselyn Mensah</div>
                </div>
                <button type="button">Join Now</button>
            </div>
          </div>
        </section>
        <section className="your-courses">
          <div className="yc-title">Your Courses</div>
          {courses && courses.map((course, index) => (
            <div key={index} className="yc-ctn">
              <div className="yc-card">
                <div className="yc-img-ctn"><img src={course.course_pic} alt="course-pic"/></div>
                <div className="yc-summary-ctn">
                  <div>▶️ {course.videos}</div>
                  <div>⌚ {course.duration}</div>
                </div>
                <div className="yc-name">{course.course_name}</div>
                <div className="yc-status tp-price">GHC {course.price}</div>
                <div className="yc-profile-ctn">
                  <div className="yc-profile"><img src={course.facilitator.user_img}/></div>
                  <div>{course.facilitator.name}</div>
                </div>
              </div>
            </div>
          ))}
          <div className="yc-ctn">
            <div className="yc-card">
              <div className="yc-img-ctn"><img src={images.card1} /></div>
              <div className="yc-summary-ctn">
                <div>▶️ 10 videos</div>
                <div>⌚ 8 weeks</div>
              </div>
              <div className="yc-name">Financial Accounting Basics</div>
              <div className="yc-status-ctn">
                <div className="yc-status">Enrolled</div>
                <CircleProgressBar percentage={75} />
              </div>
              <div className="yc-profile-ctn">
                <div className="yc-profile"><img src={images.lec1}/></div>
                <div>Prince Darabor</div>
              </div>
              
            </div>
            <div className="yc-card">
              <div className="yc-img-ctn"><img src={images.card3} /></div>
              <div className="yc-summary-ctn">
                <div>▶️ 10 videos</div>
                <div>⌚ 8 weeks</div>
              </div>
              <div className="yc-name">Financial Accounting Basics</div>
              <div className="yc-status-ctn">
                <div className="yc-status">Enrolled</div>
                <CircleProgressBar percentage={60} />
              </div>
              <div className="yc-profile-ctn">
                <div className="yc-profile"><img src={images.lec1}/></div>
                <div>Prince Darabor</div>
              </div>
              
            </div>
          </div>
        </section>
        <section className="courses-stn">
          <div className="yc-title-ctn">
            <div className="yc-title">Top Picks</div>
            <button className="yc-view-btn" onClick={() => navigate('/courses')} type="button">View all</button>
          </div>
          <div className="yc-ctn">
            <div className="yc-card">
              <div className="yc-img-ctn"><img src={images.card1} /></div>
              <div className="yc-summary-ctn">
                <div>▶️ 10 videos</div>
                <div>⌚ 8 weeks</div>
              </div>
              <div className="yc-name">Financial Accounting Basics</div>
              <div className="yc-status tp-price">GHC 400.00</div>
              <div className="yc-profile-ctn">
                <div className="yc-profile"><img src={images.lec3}/></div>
                <div>Prince Darabor</div>
              </div>
              
            </div>
            <div className="yc-card">
              <div className="yc-img-ctn"><img src={images.card2} /></div>
              <div className="yc-summary-ctn">
                <div>▶️ 10 videos</div>
                <div>⌚ 8 weeks</div>
              </div>
              <div className="yc-name">Financial Accounting Basics</div>
              <div className="yc-status tp-price">GHC 700</div>
              <div className="yc-profile-ctn">
                <div className="yc-profile"><img src={images.lec1}/></div>
                <div>Prince Darabor</div>
              </div>
              
            </div>
            <div className="yc-card">
              <div className="yc-img-ctn"><img src={images.card3} /></div>
              <div className="yc-summary-ctn">
                <div>▶️ 10 videos</div>
                <div>⌚ 8 weeks</div>
              </div>
              <div className="yc-name">Financial Accounting Basics</div>
              <div className="yc-status tp-price">GHC 1000</div>
              <div className="yc-profile-ctn">
                <div className="yc-profile"><img src={images.lec1}/></div>
                <div>Prince Darabor</div>
              </div>     
            </div>
          </div>
        </section>
        <section className="calendar-stn">
          <AdminCalendar user="user" />
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