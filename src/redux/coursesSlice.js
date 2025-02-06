import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCourses, getCourseById, addCourse, enrollUserInCourse } from "../utils/firestoreService";

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

const coursesSlice = createSlice({
  name: "courses",
  initialState: {
    courses: [],
    selectedCourse: null,
    loading: false,
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
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchCourseById.fulfilled, (state, action) => {
        state.selectedCourse = action.payload;
      });
  },
});

export default coursesSlice.reducer;
