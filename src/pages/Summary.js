import { useEffect, useRef, useState } from "react";
import NavBar2 from "../components/NavBar2";
import "../css/summary.css";
import images from "../utils/images";
import { useDispatch, useSelector } from "react-redux";
import { fetchAbsentees, fetchUserAttendance } from "../redux/attendanceSlice";
import { auth } from "../utils/firebaseConfig";
import LoadingBar from "../components/loadingBar";
import Select from "react-select";
import { fetchCourses } from "../redux/coursesSlice";
import { fetchCurrentUser } from "../redux/usersSlice";


export default function Summary() {
  const tableHeaderRef = useRef(null);
  const tableBodyRef = useRef(null);
  const { attendance, loading, absentees, absenteesLoading } = useSelector((state) => state.attendance);
  const { allCourses } = useSelector((state) => state.courses);
  const dispatch = useDispatch();
  const [selectedCourse, setSelectedCourse] = useState(null);
  const { currentUser } = useSelector((state) => state.users);
  

  useEffect(() => {
    dispatch(fetchUserAttendance(auth.currentUser.uid));
    dispatch(fetchCourses());
    dispatch(fetchCurrentUser(auth.currentUser.uid));

  }, []);

  const syncScroll = (source, target) => {
    target.current.scrollLeft = source.current.scrollLeft;
  };

  const handleFetchAbsentees = async (e) => {
    e.preventDefault();
    if(selectedCourse) {
      await dispatch(fetchAbsentees(selectedCourse.value))
    }
  }

  return (
    <>
      <NavBar2 />
      <div className="summary-ctn">
        <section className="sum-quiz-stn">
          <div className="sum-title">Attendance</div>
          <div className="st-notice">⚠️ Missing 3 classes for a course will deny student's certificate request</div>
          {currentUser.role === "admin" ? (
            <>
            <form onSubmit={handleFetchAbsentees}>
            <Select
              options={allCourses.map((course) => ({ value: course.id, label: course.course_name }))}
              onChange={setSelectedCourse}
              placeholder="Select Course"
              className="react-select"
            />
            <button type="submit">Generate Record</button>
            </form>
          
          <div className="table-container">

            {/* Table Header */}
            <div
              ref={tableHeaderRef}
              onScroll={() => syncScroll(tableHeaderRef, tableBodyRef)}
              className="table-header"
            >
              <img
                className="table-banner1"
                src={images.tableBanner}
                alt="table-banner"
              />
              <table>
                <thead>
                  <tr>
                    <th className="table-date th-width">Absent Participants</th>
                  </tr>
                </thead>
              </table>
            </div>

            {/* Table Body */}
            <div
              ref={tableBodyRef}
              onScroll={() => syncScroll(tableBodyRef, tableHeaderRef)}
              className="table-body"
            >
              <table>
                <tbody>
                  {absenteesLoading ? (
                    <tr>
                      <td colSpan="4">
                        <LoadingBar />
                      </td>
                    </tr>
                  ) : absentees.length > 0 ? (
                    absentees.map((participant, index) => (
                      <tr key={index}>
                        <td className="table-date">
                          {participant}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4">
                        <div className="video-container">
                          <video
                            autoPlay
                            loop
                            muted
                            className="background-video"
                          >
                            <source src={images.noData} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          </>
          ): (
            <div className="table-container">

            {/* Table Header */}
            <div
              ref={tableHeaderRef}
              onScroll={() => syncScroll(tableHeaderRef, tableBodyRef)}
              className="table-header"
            >
              <img
                className="table-banner1"
                src={images.tableBanner}
                alt="table-banner"
              />
              <table>
                <thead>
                  <tr>
                    <th className="table-date th-width">Date</th>
                    <th className="item th-width">Course</th>
                    <th className="th-width">Status</th>
                    <th className="th-width">Title</th>
                  </tr>
                </thead>
              </table>
            </div>

            {/* Table Body */}
            <div
              ref={tableBodyRef}
              onScroll={() => syncScroll(tableBodyRef, tableHeaderRef)}
              className="table-body"
            >
              <table>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="4">
                        <LoadingBar />
                      </td>
                    </tr>
                  ) : attendance.length > 0 ? (
                    attendance.map((item, index) => (
                      <tr key={index}>
                        <td className="table-date">
                          {item.eventDate.toDate().toLocaleString().split(",")[0]}
                        </td>
                        <td className="item">{item.courseName}</td>
                        <td className="td-width">
                          <span
                            className={
                              item.status === "Present" ? "present" : "absent"
                            }
                          >
                            {item.status}
                          </span>
                        </td>
                        <td className="td-width">{item.title}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4">
                        <div className="video-container">
                          <video
                            autoPlay
                            loop
                            muted
                            className="background-video"
                          >
                            <source src={images.noData} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          )}
        </section>
      </div>
    </>
  );
}
