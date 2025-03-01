import { useParams } from "react-router-dom";
import LoadingBar from "../components/loadingBar";
import NavBar2 from "../components/NavBar2";
import { openQuizForm } from "../utils/formPrefill";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourseById } from "../redux/coursesSlice";
import "../css/courseDetails.css";
import images from "../utils/images";
import { fetchCompletedLessons } from "../redux/enrollmentsSlice";
import { auth } from "../utils/firebaseConfig";
import { fetchCourseVideos } from "../redux/videosSlice";

function CourseDetails() {
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const { selectedCourse } = useSelector((state) => state.courses);
  const { completedLessons } = useSelector((state) => state.enrollments);
  const { videos } = useSelector((state) => state.videos);
  
  useEffect(() => {
    dispatch(fetchCourseById(courseId));
    dispatch(fetchCompletedLessons({ userId: auth.currentUser.uid, courseId }));
    dispatch(fetchCourseVideos(courseId));
  }, [courseId]);


  const [expandedLesson, setExpandedLesson] = useState(null);

  const toggleLesson = (lessonId) => {
    setExpandedLesson(expandedLesson === lessonId ? null : lessonId);
  };

  const isQuizPassed = (lessonId) => {
    const lesson = completedLessons.find((l) => l.lessonId === lessonId);
    return lesson?.quizPassed || false;
  };

  if (!selectedCourse) {
    return <LoadingBar />;
  }

  return(
    <>
      <NavBar2 />
      <div className="cd-ctn">
      <div className="cd-title">{selectedCourse?.course_name}</div>
      <div className="cd-description">{selectedCourse?.course_description}</div>
      <div className="cd-instructions-main">
      <div className="cd-instructions-ctn">
        <div>Take note of the following: </div>
        <ul>
          <li>Every course comes with a number of lessons</li>
          <li>Each lesson has an attached quiz for assessment</li>
          <li>For a lesson to be completed, the student must pass the quiz</li>
          <li>Courses are completed only if the lessons are completed</li>
        </ul>
      </div>
      </div>
      <div className="cd-lessons-ctn">
        <div className="cd-lessons-header">Lessons</div>
        {selectedCourse.lessons.map((lesson, index) => (
          <div key={index} className={`cd-lesson ${expandedLesson === lesson.id ? 'expanded' : ''}`}>
          <div 
            className={`cd-lesson-wrap ${expandedLesson === lesson.id ? 'expanded' : ''}`} 
            onClick={() => toggleLesson(lesson.id)}
          >
            <div>{index + 1}. {lesson.title}</div>
            {isQuizPassed(lesson.id) && <span className="quiz-passed">Completed: ✅</span>}
            <div className="chevron-down">
              <img src={images.chevronDown} alt="Chevron Down" />
            </div>
          </div>
          {expandedLesson === lesson.id && (
            <div className="lesson-details">
              <a href={lesson.content} className="cd-lesson-content">Click to open Lesson</a>
              <button className="cd-lesson-btn" onClick={() => openQuizForm(lesson.quizUrl, selectedCourse?.id, lesson)} type="button">
                Take Quiz
              </button>
            </div>
          )}
          </div>
        ))}
      </div>
      <div className="cd-videos-ctn">
        <div className="cd-videos-title">Course Videos</div>
        {videos.length === 0 ? (
          <div className="no-videos">There are no videos for this course yet</div>
        ):(
          videos.map((video, index) => (
            <div className="cd-video-ctn" key={index}>
              <div>{video.title}</div>
              <iframe
                className="cd-video-embedder"
                src={video.video_url} 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen>
              </iframe>
            </div>
          ))
        )}
        

      </div>
      </div>
      
    </>
    
  );
}

export default CourseDetails;