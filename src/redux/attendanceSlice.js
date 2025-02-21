import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { updateAttendance, createAttendance, getStudentAttendance } from '../utils/firestoreService';

export const updateUserAttendance = createAsyncThunk('attendance/updateUserAttendance', async (eventId) => {
  return await updateAttendance(eventId);
});

export const createUserAttendance = createAsyncThunk('attendance/createUserAttendance', async ({ eventId, userData }) => {
  return await createAttendance(eventId, userData);
});

export const fetchUserAttendance = createAsyncThunk('attendance/fetchUserAttendance', async (userId) => {
  return await getStudentAttendance(userId);
});

const attendanceSlice = createSlice({
  name: 'attendance',
  initialState: {
    attendance: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUserAttendance.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateUserAttendance.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(fetchUserAttendance.fulfilled, (state, action) => {
        state.loading = false;
        state.attendance = action.payload;
      })
      .addMatcher((action) => action.type.endsWith('/pending'), (state) => {
        state.loading = true;
      })
      .addMatcher((action) => action.type.endsWith('/rejected'), (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export default attendanceSlice.reducer;
