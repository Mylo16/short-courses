// src/redux/lessonsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addLesson, getLessonsByCourse } from '../utils/firestoreService';

export const fetchLessonsByCourse = createAsyncThunk('lessons/fetchLessonsByCourse', async (courseId) => {
  return await getLessonsByCourse(courseId);
});

export const createLesson = createAsyncThunk('lessons/createLesson', async (lessonData) => {
  return await addLesson(lessonData);
});

const lessonsSlice = createSlice({
  name: 'lessons',
  initialState: {
    lessons: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLessonsByCourse.fulfilled, (state, action) => {
        state.lessons = action.payload;
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

export default lessonsSlice.reducer;
