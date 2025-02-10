import { useNavigate } from 'react-router-dom';
import NavBar2 from '../components/NavBar2';
import images from '../utils/images';
import { useSelector } from 'react-redux';
import '../css/courses.css';

function Courses() {

   const navigate = useNavigate();
   const { courses } = useSelector((state) => state.courses);
   console.log(courses);

    
  return(
    <>
      <NavBar2 />
      <div className='courses-ctn'>
        <div className='courses-title'>Courses</div>
        <div className='courses-msg'>Find various courses under various categories</div>
        <section className="category">
          <div className='cat-title'>Health Science</div>
          <div className="yc-ctn">
          {
            courses[0].map((course, index) => (
              <div onClick={() => navigate('/course-details')} className='yc-card' key={index}>
                <div className="yc-img-ctn"><img src={course.course_pic} /></div>
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
            ))
          }
          </div>
        </section>
        <section className="category">
          <div className='cat-title'>Social Science</div>
          <div className="yc-ctn">
          {
            courses[1].map((course, index) => (
              <div className='yc-card' key={index}>
                <div className="yc-img-ctn"><img src={course.course_pic} /></div>
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
            ))
          }
          </div>
        </section>
        <section className="category">
          <div className='cat-title'>Science and Technology</div>
          <div className="yc-ctn">
          {
            courses[2].map((course, index) => (
              <div className='yc-card' key={index}>
                <div className="yc-img-ctn"><img src={course.course_pic} /></div>
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
            ))
          }
          </div>
        </section>
        
      </div>
      <div className='logo-strike bottom'>
        <img className='strike-mob' src={images.logo2}/>
        <img className='strike-mob' src={images.logo2}/>
        <img className='strike-mob' src={images.logo2}/>
        <img className='strike-pc' src={images.logo2}/>
        <img className='strike-pc' src={images.logo2}/>
      </div>
    </>
  );
}

export default Courses;