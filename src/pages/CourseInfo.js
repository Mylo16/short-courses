import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourseById } from "../redux/coursesSlice";
import NavBar2 from "../components/NavBar2";
import LoadingBar from "../components/loadingBar";
import '../css/courseInfo.css';
import { fetchCourseVideos } from "../redux/videosSlice";

export default function CourseInfo() {
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const { selectedCourse } = useSelector((state) => state.courses);
  const { videos } = useSelector((state) => state.videos);
  console.log(videos);

  useEffect(() => {
    if (courseId) {
      dispatch(fetchCourseById(courseId));
      dispatch(fetchCourseVideos(courseId));
    }
  }, [courseId, dispatch]);

  return (
    <>
      <NavBar2 />
      {!selectedCourse ?  
      <LoadingBar /> :
      <div className="course-details">
      <iframe
         className="video-embedder"
         src="https://www.youtube.com/embed/rck3MnC7OXA" 
         frameBorder="0" 
         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
         allowFullScreen>
      </iframe>
      <button className="enroll-btn">Enroll Now</button>

      <div className="cd-ctn">
        <div className="cd-pic">
          <img src={selectedCourse.course_pic} alt="course-pic"/>
        </div>
        <div className="cd-info">
        <div className="course-name">{selectedCourse.course_name}</div>
        <p>{selectedCourse.description}</p>
        <p><strong>Category:</strong> {selectedCourse.programme}</p>
        <p><strong>Duration:</strong> {selectedCourse.duration}</p>
        <p><strong>Number of Videos:</strong> {selectedCourse.numVideos}</p>
        <p><strong>Number of Lessons:</strong> {selectedCourse.lessons.length}</p>
        <p><strong>Enrollment Price:</strong> GHC {selectedCourse.price}</p>


        {selectedCourse.facilitator && (
          <div className="instructor">
            <img src={selectedCourse.facilitator.user_img} alt={selectedCourse.facilitator.name} />
            <p>Instructor: {selectedCourse.facilitator.name}</p>
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
