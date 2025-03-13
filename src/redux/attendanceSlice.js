import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { updateAttendance, createAttendance, getStudentAttendance, getFrequentAbsenteesByCourse } from '../utils/firestoreService';

export const updateUserAttendance = createAsyncThunk('attendance/updateUserAttendance', async (eventId) => {
  return await updateAttendance(eventId);
});

export const createUserAttendance = createAsyncThunk('attendance/createUserAttendance', async ({ eventId, userData, courseId }) => {
  return await createAttendance(eventId, userData, courseId);
});

export const fetchUserAttendance = createAsyncThunk('attendance/fetchUserAttendance', async (userId) => {
  return await getStudentAttendance(userId);
});

export const fetchAbsentees = createAsyncThunk('attendance/fetchAbsentees', async (courseId) => {
  return await getFrequentAbsenteesByCourse(courseId);
});

const attendanceSlice = createSlice({
  name: 'attendance',
  initialState: {
    attendance: [],
    absentees: [],
    absenteesLoading: false,
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
      .addCase(fetchAbsentees.fulfilled, (state, action) => {
        state.absenteesLoading = false;
        state.absentees = action.payload;
      })
      .addCase(fetchAbsentees.pending, (state) => {
        state.absenteesLoading = true;
      })
      .addCase(fetchAbsentees.rejected, (state, action) => {
        state.absenteesLoading = false;
        state.error = action.error.message;
      });
  },
});

export default attendanceSlice.reducer;
