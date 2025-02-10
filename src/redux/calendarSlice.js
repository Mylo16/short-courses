import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addEvent, getStudentEvents, deleteCourseEvent, getEventsForDate } from "../utils/firestoreService";

export const createEvent = createAsyncThunk('calendar/createEvent', async (eventData) => {
  return await addEvent(eventData);
});

export const fetchEvents = createAsyncThunk('calendar/fetchEvent', async (userId) => {
  return await getStudentEvents(userId);
});

export const fetchEventsForDate = createAsyncThunk('calendar/fetchEventsForDate', async ({date, studentId}) => {
  return await getEventsForDate(date, studentId);
});

export const deleteEvent = createAsyncThunk('calendar/deleteEvent', async (eventId) => {
  return await deleteCourseEvent(eventId);
});

function convertTo24HourFormat(time) {
  const [hours, minutes] = time.split(/[: ]/);
  const isPM = time.toLowerCase().includes("pm");
  let formattedHours = parseInt(hours, 10);

  if (isPM && formattedHours !== 12) formattedHours += 12;
  if (!isPM && formattedHours === 12) formattedHours = 0;

  return `${String(formattedHours).padStart(2, "0")}:${minutes}`;
}


const calendarSlice = createSlice({
  name: "calendar",
  initialState: {
    eventsOnCalendar: [],
    eventsOnTimeline: [],
    eventsForDate: [],
    loading: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.eventsOnTimeline = action.payload;
        state.eventsOnCalendar = action.payload.map((event) => {
          const formattedDate = new Date(event.eventDate).toISOString().split("T")[0]; // Extract date in YYYY-MM-DD
          const startTime = convertTo24HourFormat(event.startTime);
          const endTime = convertTo24HourFormat(event.endTime);
      
          return {
            id: event.id,
            title: event.title,
            start: `${formattedDate}T${startTime}:00`,
            end: `${formattedDate}T${endTime}:00`,
          };
        });
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.eventsOnCalendar.push(action.payload);
        state.eventsOnTimeline.push(action.payload);
      })
      .addCase(fetchEventsForDate.fulfilled, (state, action) => {
        state.eventsForDate = action.payload;
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.eventsForDate.filter((event) => event.id !== action.payload);
        state.eventsOnCalendar.filter((event) => event.id !== action.payload);

      })
  }
});

export default calendarSlice.reducer;
