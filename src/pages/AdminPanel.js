import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import NavBar2 from "../components/NavBar2";
import { fetchFacilitators, fetchUsers } from "../redux/usersSlice";
import { enrollUser } from "../redux/enrollmentsSlice";
import { createCourse, fetchCourses } from "../redux/coursesSlice";
import { createLesson } from "../redux/lessonsSlice";
import "../css/AdminPanel.css";

const AdminPanel = () => {
  const [courseData, setCourseData] = useState({
    name: "",
    pic: "",
    duration: "",
    numVideos: "",
    price: "",
    description: "",
    facilitatorId: "",
    programme: "",
  });

  const [lessonData, setLessonData] = useState({
    title: "",
    content: "",
    quizUrl: "",
    courseId: "",
    mappingUserId: "",
    mappingCourseId: "",
    mappingLessonId: "",
  });

  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { courses } = useSelector((state) => state.courses);
  const { facilitators, users } = useSelector((state) => state.users);

  // Fetch data when the component mounts
  useEffect(() => {
    dispatch(fetchCourses());
    dispatch(fetchFacilitators());
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleCourseChange = (e) => {
    const { name, value } = e.target;
    setCourseData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLessonChange = (e) => {
    const { name, value } = e.target;
    setLessonData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCourseSubmit = async (e) => {
    e.preventDefault();
    console.log(courseData);
    await dispatch(createCourse(courseData));
    navigate(0);
  };

  const handleLessonSubmit = async (e) => {
    e.preventDefault();
    if (lessonData.courseId) {
      await dispatch(createLesson(lessonData));
      navigate(0);
    } else {
      alert("Please select a course first.");
    }
  };

  const handleEnrollSubmit = async (e) => {
    e.preventDefault();
    if (selectedUser && selectedCourse) {
      await dispatch(
        enrollUser({
          userId: selectedUser.value,
          courseId: selectedCourse.value,
        })
      );
      navigate(0);
    } else {
      alert("Please select both user and course.");
    }
  };

  return (
    <>
      <NavBar2 />
      <div className="admin-panel">
        <h2 className="header">Admin Panel</h2>

        <div className="ap-form-container">
          <h3>Create New Course</h3>
          <form onSubmit={handleCourseSubmit} className="ap-form">
            <select
              name="facilitatorId"
              value={courseData.facilitatorId}
              onChange={handleCourseChange}
              required
            >
              <option value="">Select Facilitator</option>
              {facilitators.map((facilitator) => (
                <option key={facilitator.id} value={facilitator.id}>
                  {facilitator.name}
                </option>
              ))}
            </select>

            <select
              name="programme"
              value={courseData.programme}
              onChange={handleCourseChange}
              required
            >
              <option value="">Select Programme</option>
              <option value="Science and Technology">Science and Technology</option>
              <option value="Social Science">Social Science</option>
              <option value="Agricultural Science">Agricultural Science</option>
              <option value="Health Science">Health Science</option>
            </select>

            <input
              type="text"
              name="name"
              placeholder="Course Name"
              value={courseData.name}
              onChange={handleCourseChange}
              required
            />
            <input
              type="text"
              name="pic"
              placeholder="Course Picture URL"
              value={courseData.pic}
              onChange={handleCourseChange}
              required
            />
            <textarea
              name="description"
              placeholder="Course Description"
              value={courseData.description}
              onChange={handleCourseChange}
              required
            />
            <input
              type="text"
              name="duration"
              placeholder="Duration"
              value={courseData.duration}
              onChange={handleCourseChange}
              required
            />
            <input
              type="number"
              name="numVideos"
              placeholder="Number of Videos"
              value={courseData.numVideos}
              onChange={handleCourseChange}
              required
            />
            <input
              type="number"
              name="price"
              placeholder="Enrollment Price"
              value={courseData.price}
              onChange={handleCourseChange}
              required
            />
            <button type="submit">Create Course</button>
          </form>
        </div>

        <div className="ap-form-container">
          <h3>Create New Lesson</h3>
          <form onSubmit={handleLessonSubmit} className="ap-form">
            <select
              name="courseId"
              value={lessonData.courseId}
              onChange={handleLessonChange}
              required
            >
              <option value="">Select Course</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.course_name}
                </option>
              ))}
            </select>
            <input
              type="text"
              name="title"
              placeholder="Lesson Title"
              value={lessonData.title}
              onChange={handleLessonChange}
              required
            />
            <input
              type="text"
              name="quizUrl"
              placeholder="Quiz URL"
              value={lessonData.quizUrl}
              onChange={handleLessonChange}
              required
            />
            <input
              type="text"
              name="mappingUserId"
              placeholder="Quiz Entry Mapping User ID"
              value={lessonData.mappingUserId}
              onChange={handleLessonChange}
              required
            />
             <input
              type="text"
              name="mappingCourseId"
              placeholder="Quiz Entry Mapping Course ID"
              value={lessonData.mappingCourseId}
              onChange={handleLessonChange}
              required
            />
             <input
              type="text"
              name="mappingLessonId"
              placeholder="Quiz Entry Mapping Lesson ID"
              value={lessonData.mappingLessonId}
              onChange={handleLessonChange}
              required
            />
            <textarea
              name="content"
              placeholder="Lesson URL"
              value={lessonData.content}
              onChange={handleLessonChange}
              required
            />
            <button type="submit">Create Lesson</button>
          </form>
        </div>

        <div className="ap-form-container">
          <h3>Enroll User</h3>
          <form onSubmit={handleEnrollSubmit} className="ap-form">
            <Select
              options={users.map((user) => ({ value: user.id, label: user.name }))}
              onChange={setSelectedUser}
              placeholder="Select User"
              className="react-select"
            />
            <Select
              options={courses.map((course) => ({ value: course.id, label: course.course_name }))}
              onChange={setSelectedCourse}
              placeholder="Select Course"
              className="react-select"
            />
            <button type="submit">Enroll User</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminPanel;

/* AddCourse and AddLesson functions should be properly imported and implemented */
