import { configureStore } from "@reduxjs/toolkit";
import calendarReducer from "./calendarSlice";
import coursesReducer from "./coursesSlice";
import usersReducer from "./usersSlice";
import lessonsReducer from "./lessonsSlice";
import enrollmentsReducer from "./enrollmentsSlice";
import attendanceReducer from "./attendanceSlice";
import videosReducer from "./videosSlice";

export const store = configureStore({
  reducer: {
    calendar: calendarReducer,
    enrollments: enrollmentsReducer,
    courses: coursesReducer,
    users: usersReducer,
    lessons: lessonsReducer,
    attendance: attendanceReducer,
    videos: videosReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
        // // Ignore actions with non-serializable values in these paths
        // ignoredActions: [
        //   'users/fetchFacilitators/fulfilled',
        //   'users/fetchUsers/fulfilled',
        //   'courses/fetchCourses/fulfilled'
        // ],
        // // Ignore these specific paths in the state
        // ignoredPaths: [
        //   'users.facilitators',
        //   'users.users',
        //   'courses.courses.facilitator.enrolledCourses',
        //   'courses.courses',
        // ],
    }),
});
