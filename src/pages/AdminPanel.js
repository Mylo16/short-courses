import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addCourse, addLesson, getCourses, getFacilitators } from "../utils/firestoreService"; // Import firestore functions
import NavBar2 from "../components/NavBar2";

const AdminPanel = () => {

  const [courseName, setCourseName] = useState("");
  const [coursePic, setCoursePic] = useState("");
  const [duration, setDuration] = useState("");
  const [numVideos, setNumVideos] = useState("");
  const [lessonTitle, setLessonTitle] = useState("");
  const [lessonContent, setLessonContent] = useState("");
  const [selectedCourseId, setSelectedCourseId] = useState(""); // To select course for lesson
  const [courses, setCourses] = useState([]);
  const [facilitators, setFacilitators] = useState([]);
  const [selectedFacilitatorId, setSelectedFacilitatorId] = useState("");
  const [selectedProgramme, setSelectedProgramme] = useState("");
  const [price, setPrice] = useState("");


  // Fetch courses from Firestore to display in the dropdown
  useEffect(() => {
    const fetchCourses = async () => {
      const courseData = await getCourses(); // Get courses from Firestore
      setCourses(courseData);
    };

    const fetchFacilitators = async () => {
      const courseFacilitators = await getFacilitators();
      setFacilitators(courseFacilitators);
    }

    fetchFacilitators();
    fetchCourses();
  }, []);

  const handleCourseSubmit = async (e) => {
    e.preventDefault();
    const courseId = await addCourse(courseName, selectedProgramme, selectedFacilitatorId, coursePic, duration, numVideos);
    alert("Course Created: " + courseId);
    window.location.reload();
  };

  const handleLessonSubmit = async (e) => {
    e.preventDefault();
    if (selectedCourseId) {
      const lessonId = await addLesson(lessonTitle, lessonContent, selectedCourseId);
      alert("Lesson Created: " + lessonId);
      window.location.reload();
    } else {
      alert("Please select a course first.");
    }
  };

  return (
    <>
      <NavBar2 />
      <h2>Admin Panel</h2>
      
      <div>
        <h3>Create New Course</h3>
        <form onSubmit={handleCourseSubmit}>
          <select required onChange={(e) => setSelectedFacilitatorId(e.target.value)} value={selectedFacilitatorId}>
            <option value="">Select Facilitator</option>
            {facilitators.map(facilitator => (
              <option key={facilitator.id} value={facilitator.id}>{facilitator.name}</option>
            ))}
          </select>
          <select required onChange={(e) => setSelectedProgramme(e.target.value)} value={selectedFacilitatorId}>
            <option value="">Select Programme</option>
            <option value="Science and Technology">Science and Technology</option>
            <option value="Social Science">Social Science</option>
            <option value="Agricultural Science">Agricultural Science</option>
            <option value="Health Science">Health Science</option>
          </select>
          <input 
            type="text" 
            placeholder="Course Name" 
            value={courseName} 
            onChange={(e) => setCourseName(e.target.value)}
            required
          />
          <input 
            type="text" 
            placeholder="Course Picture URL" 
            value={coursePic} 
            onChange={(e) => setCoursePic(e.target.value)}
            required
          />
          <input 
            type="text" 
            placeholder="Duration" 
            value={duration} 
            onChange={(e) => setDuration(e.target.value)}
            required
          />
          <input 
            type="number" 
            placeholder="Number of Videos" 
            value={numVideos} 
            onChange={(e) => setNumVideos(e.target.value)}
            required
          />
          <input 
            type="number" 
            placeholder="Enrollment Price" 
            value={price} 
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <button type="submit">Create Course</button>
        </form>
      </div>

      <div>
        <h3>Create New Lesson</h3>
        <form onSubmit={handleLessonSubmit}>
          <select required onChange={(e) => setSelectedCourseId(e.target.value)} value={selectedCourseId}>
            <option value="">Select Course</option>
            {/* Dynamically populate courses */}
            {courses.map(course => (
              <option key={course.id} value={course.id}>{course.course_name}</option>
            ))}
          </select>
          <input 
            type="text" 
            placeholder="Lesson Title" 
            value={lessonTitle} 
            onChange={(e) => setLessonTitle(e.target.value)}
            required
          />
          <textarea 
            placeholder="Lesson Content" 
            value={lessonContent} 
            onChange={(e) => setLessonContent(e.target.value)}
            required
          />
          <button type="submit">Create Lesson</button>
        </form>
      </div>
    </>
  );
};

export default AdminPanel;
