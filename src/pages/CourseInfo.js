import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourseById } from "../redux/coursesSlice";
import NavBar2 from "../components/NavBar2";
import LoadingBar from "../components/loadingBar";
import '../css/courseInfo.css';
import { fetchCourseVideos } from "../redux/videosSlice";
import { auth } from "../utils/firebaseConfig";

export default function CourseInfo() {
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const { selectedCourse } = useSelector((state) => state.courses);
  const [openModal, setOpenModal] = useState(false);
  const handleClickOutside = (event) => {
    if (openModal && !event.target.closest('.em-ctn') && !event.target.closest('.enroll-btn')) {
      setOpenModal(false);
    }
  };

  useEffect(() => {
    if (openModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [openModal]);

  useEffect(() => {
    if (courseId) {
      dispatch(fetchCourseById(courseId));
      dispatch(fetchCourseVideos(courseId));
    }
  }, [courseId, dispatch]);

  return (
    <>
      {auth.currentUser ? <NavBar2 /> : ""}
      {openModal && 
        <div onClick={() => setOpenModal(false)} className="enroll-modal-overlay">
          <div onClick={(e) => e.stopPropagation()} className="em-ctn">
            <div>Please Contact the following Number to initiate enrollment process:</div>
            <div className="em-number">+233 (0) 50 717 7117</div>
          </div>
        </div>
      }
      {!selectedCourse ?  
      <LoadingBar /> :
      <div className={auth.currentUser ? "course-details" : "cd-no-user"}>
      <iframe
         className="video-embedder"
         src={selectedCourse.course_video} 
         frameBorder="0" 
         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
         allowFullScreen>
      </iframe>
      <button onClick={() => setOpenModal(true)} className="enroll-btn">Enroll Now</button>

      <div className="ci-ctn">
        <div className="ci-pic">
          <img src={selectedCourse.course_pic} alt="course-pic"/>
        </div>
        <div className="ci-info">
        <div className="course-name">{selectedCourse.course_name}</div>
        <p>{selectedCourse.description}</p>
        <p><strong>Category:</strong> {selectedCourse.programme}</p>
        <p><strong>Duration:</strong> {selectedCourse.duration}</p>
        <p><strong>Number of Videos:</strong> {selectedCourse.numVideos}</p>
        <p><strong>Number of Lessons:</strong> {selectedCourse.lessons.length}</p>
        <p><strong>Enrollment Price:</strong> GHC {selectedCourse.price}</p>


        {selectedCourse.facilitator && (
          <div className="instructor">
            <img src={selectedCourse.facilitator.user_img} alt={selectedCourse.facilitator.firstName} />
            <p>Instructor: {selectedCourse.facilitator.firstName} {selectedCourse.facilitator.lastName}</p>
          </div>
        )}
        <h3>Course Content</h3>
        <div>{selectedCourse.course_description}</div>
        <div><strong>Lessons</strong></div>
        <ul>
          {selectedCourse.lessons?.map((lesson, index) => (
            <li key={index}>
              {index + 1}. {lesson.title}
            </li>
          ))}
        </ul>

        </div>
        </div>
      </div>
      }
    </>
  );
}
