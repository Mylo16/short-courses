import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCourseVideos, addVideo } from "../utils/firestoreService";

export const fetchCourseVideos = createAsyncThunk("videos/fetchCourseVideos", async (courseId) => {
  return await getCourseVideos(courseId);
});

export const createVideo = createAsyncThunk("videos/createVideo", async (videoData) => {
  return await addVideo(videoData);
});

const videosSlice = createSlice({
  name: "videos",
  initialState: {
    videos: [],
    loading: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourseVideos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCourseVideos.fulfilled, (state, action) => {
        state.loading = false;
        state.videos = action.payload;
      })
      .addCase(fetchCourseVideos.rejected, (state, action) => {
        state.loading = null;
        state.error = action.error.message;
      })
      .addCase(createVideo.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createVideo.pending, (state) => {
        state.loading = true;
      })
      .addCase(createVideo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })
  },
});

export default videosSlice.reducer;
