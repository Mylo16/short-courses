import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchEnrolledCourses, enrollUserInCourse } from '../utils/firestoreService';

export const fetchEnrollments = createAsyncThunk('enrollments/fetchEnrollments', async (userId) => {
  return await fetchEnrolledCourses(userId);
});

export const enrollUser = createAsyncThunk('enrollments/enrollUser', async ({ userId, courseId }) => {
  await enrollUserInCourse(userId, courseId);
  return { userId, courseId };
});

const enrollmentsSlice = createSlice({
  name: 'enrollments',
  initialState: {
    enrolledCourses: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEnrollments.fulfilled, (state, action) => {
        state.enrolledCourses = action.payload;
        state.status = 'succeeded';
      })
      .addCase(enrollUser.fulfilled, (state, action) => {
        state.enrolledCourses.push(action.payload);
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
