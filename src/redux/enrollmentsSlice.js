import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchEnrolledCourses, enrollUserInCourse, getCompletedLessons } from '../utils/firestoreService';

export const fetchEnrollments = createAsyncThunk('enrollments/fetchEnrollments', async (userId) => {
  return await fetchEnrolledCourses(userId);
});

export const fetchCompletedLessons = createAsyncThunk('enrollments/getCompletedLessons', async ({ userId, courseId }) => {
  return await getCompletedLessons(userId, courseId);
});

export const enrollUser = createAsyncThunk('enrollments/enrollUser', async ({ userId, courseId }) => {
  await enrollUserInCourse(userId, courseId);
  return { userId, courseId };
});

const enrollmentsSlice = createSlice({
  name: 'enrollments',
  initialState: {
    enrolledCourses: [],
    activeCourses: [],
    completedCourses: [],
    completedLessons: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEnrollments.fulfilled, (state, action) => {
        state.enrolledCourses = action.payload;
        state.activeCourses = action.payload.filter(course => course.progress < 100);
        state.completedCourses = action.payload.filter(course => course.progress === 100);
        state.status = 'succeeded';
      })
      .addCase(enrollUser.fulfilled, (state, action) => {
        state.enrolledCourses.push(action.payload);
        state.activeCourses.push(action.payload);
        state.status = 'succeeded';
      })
      .addCase(fetchCompletedLessons.fulfilled, (state, action) => {
        state.completedLessons = action.payload;
        state.status = 'succeeded';
      })
      .addMatcher((action) => action.type.endsWith('/pending'), (state) => {
        state.status = 'loading';
      })
      .addMatcher((action) => action.type.endsWith('/rejected'), (state, action) => {
        state.error = action.error.message;
        state.status = 'failed';
      });
  },
});

export default enrollmentsSlice.reducer;
