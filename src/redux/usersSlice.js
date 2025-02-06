// src/redux/usersSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUsers, getFacilitators, getFacilitatorByCourse } from '../utils/firestoreService';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  return await getUsers();
});

export const fetchFacilitators = createAsyncThunk('users/fetchFacilitators', async () => {
  return await getFacilitators();
});

export const fetchFacilitatorByCourseId = createAsyncThunk('users/fetchFacilitatorByCourseId', async (courseId) => {
  return await getFacilitatorByCourse(courseId);
});

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    facilitators: [],
    facilitatorByCourse: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchFacilitators.fulfilled, (state, action) => {
        state.facilitators = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchFacilitatorByCourseId.fulfilled, (state, action) => {
        state.facilitatorByCourse = action.payload;
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

export default usersSlice.reducer;
