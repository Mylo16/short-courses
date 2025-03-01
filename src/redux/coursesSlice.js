import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCourses, getCourseById, addCourse, enrollUserInCourse, getTopEnrolledCourses, getRecentCourse, updateRecentCourse } from "../utils/firestoreService";

export const fetchCourses = createAsyncThunk("courses/fetchCourses", async () => {
  return await getCourses();
});

export const fetchCourseById = createAsyncThunk("courses/fetchCourseById", async (courseId) => {
  return await getCourseById(courseId);
});

export const createCourse = createAsyncThunk("courses/createCourse", async (courseData) => {
  return await addCourse(courseData);
});

export const enrollInCourse = createAsyncThunk("courses/enrollInCourse", async ({ userId, courseId, lessons }) => {
  await enrollUserInCourse(userId, courseId, lessons);
  return { courseId };
});

export const fetchTopPicks = createAsyncThunk("courses/fetchTopPicks", async () => {
  return await getTopEnrolledCourses();
});

export const fetchRecentCourse = createAsyncThunk("courses/fetchRecentCourse", async (userId) => {
  return await getRecentCourse(userId);
});

export const updateRecent = createAsyncThunk("courses/updateRecent", async ({userId, courseData}) => {
  return await updateRecentCourse(userId, courseData);
});

const coursesSlice = createSlice({
  name: "courses",
  initialState: {
    courses: [],
    recentCourse: {},
    selectedCourse: null,
    topPicks: [],
    allCourses: [],
    topPicksLoading: false,
    loading: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload;
        state.allCourses = action.payload.flat().sort((a, b) => a.course_name.localeCompare(b.course_name));
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = null;
        state.error = action.error.message;
      })
      .addCase(fetchRecentCourse.fulfilled, (state, action) => {
        state.recentCourse = action.payload;
      })
      .addCase(updateRecent.fulfilled, (state, action) => {
        state.recentCourse = action.payload;
      })
      .addCase(fetchCourseById.fulfilled, (state, action) => {
        state.selectedCourse = action.payload;
      })
      .addCase(fetchCourseById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCourseById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
      .addCase(fetchTopPicks.fulfilled, (state, action) => {
        state.topPicks = action.payload;
        state.topPicksLoading = false;
      })
      .addCase(fetchTopPicks.pending, (state) => {
        state.topPicksLoading = true;
      });
  },
});

export default coursesSlice.reducer;
