import { useNavigate } from 'react-router-dom';
import NavBar2 from '../components/NavBar2';
import '../css/courses.css';
import courses from '../utils/courses';
import images from '../utils/images';

function Courses() {

   const navigate = useNavigate();
    
  return(
    <>
      <NavBar2 />
      <div className='courses-ctn'>
        <div className='courses-title'>Courses</div>
        <div className='courses-msg'>Find various courses under various categories</div>
        <section className="category">
          <div className='cat-title'>Science and Technology</div>
          <div className="yc-ctn">
          {
            courses.science_and_technology.map((course, index) => (
              <div onClick={() => navigate('/course-details')} className='yc-card' key={index}>
                <div className="yc-img-ctn"><img src={course.course_pic} /></div>
                <div className="yc-summary-ctn">
                  <div>▶️ {course.videos}</div>
                  <div>⌚ {course.duration}</div>
                </div>
                <div className="yc-name">{course.course_name}</div>
                <div className="yc-status tp-price">GHC {course.price}</div>
                <div className="yc-profile-ctn">
                  <div className="yc-profile"><img src={course.lecturer_img}/></div>
                  <div>{course.lecturer_name}</div>
                </div>     
              </div>
            ))
          }
          </div>
        </section>
        <section className="category">
          <div className='cat-title'>Social Science</div>
          <div className="yc-ctn">
          {
            courses.social_science.map((course, index) => (
              <div className='yc-card' key={index}>
                <div className="yc-img-ctn"><img src={course.course_pic} /></div>
                <div className="yc-summary-ctn">
                  <div>▶️ {course.videos}</div>
                  <div>⌚ {course.duration}</div>
                </div>
                <div className="yc-name">{course.course_name}</div>
                <div className="yc-status tp-price">GHC {course.price}</div>
                <div className="yc-profile-ctn">
                  <div className="yc-profile"><img src={course.lecturer_img}/></div>
                  <div>{course.lecturer_name}</div>
                </div>     
              </div>
            ))
          }
          </div>
        </section>
        <section className="category">
          <div className='cat-title'>Agricultural Science</div>
          <div className="yc-ctn">
          {
            courses.agricultural_science.map((course, index) => (
              <div className='yc-card' key={index}>
                <div className="yc-img-ctn"><img src={course.course_pic} /></div>
                <div className="yc-summary-ctn">
                  <div>▶️ {course.videos}</div>
                  <div>⌚ {course.duration}</div>
                </div>
                <div className="yc-name">{course.course_name}</div>
                <div className="yc-status tp-price">GHC {course.price}</div>
                <div className="yc-profile-ctn">
                  <div className="yc-profile"><img src={course.lecturer_img}/></div>
                  <div>{course.lecturer_name}</div>
                </div>     
              </div>
            ))
          }
          </div>
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

export default Courses;