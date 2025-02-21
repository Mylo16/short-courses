const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config(); // Use environment variables

const app = express();
app.use(cors()); // Enable CORS
app.use(express.json()); // Enable JSON parsing

// Environment variables for Zoom credentials
const ZOOM_ACCOUNT_ID = process.env.ZOOM_ACCOUNT_ID;
const ZOOM_CLIENT_ID = process.env.ZOOM_CLIENT_ID;
const ZOOM_CLIENT_SECRET = process.env.ZOOM_CLIENT_SECRET;
const ZOOM_BASE_URL = "https://api.zoom.us/v2";

// Route to get Zoom OAuth token
app.post("/get-zoom-token", async (req, res) => {
  try {
    const response = await axios.post(
      "https://zoom.us/oauth/token",
      null,
      {
        params: {
          grant_type: "account_credentials",
          account_id: ZOOM_ACCOUNT_ID,
        },
        auth: {
          username: ZOOM_CLIENT_ID,
          password: ZOOM_CLIENT_SECRET,
        },
      }
    );

    res.json({ token: response.data.access_token });
  } catch (error) {
    console.error("Error fetching Zoom token:", {
      message: error.message,
      data: error.response?.data,
    });
    res.status(500).json({
      error: "Failed to fetch Zoom token",
      details: error.response?.data || error.message,
    });
  }
});

// Route to get participants for a given meeting
app.get("/participants/:meetingId", async (req, res) => {
  const { meetingId } = req.params;

  try {
    // Fetch the Zoom OAuth token
    const tokenResponse = await axios.post(
      "https://zoom.us/oauth/token",
      null,
      {
        params: {
          grant_type: "account_credentials",
          account_id: ZOOM_ACCOUNT_ID,
        },
        auth: {
          username: ZOOM_CLIENT_ID,
          password: ZOOM_CLIENT_SECRET,
        },
      }
    );
    const token = tokenResponse.data.access_token;

    // Fetch meeting participants
    const participantsResponse = await axios.get(
      `${ZOOM_BASE_URL}/report/meetings/${meetingId}/participants`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    res.json(participantsResponse.data.participants);
  } catch (error) {
    console.error("Error fetching participants:", {
      message: error.message,
      data: error.response?.data,
      status: error.response?.status,
    });
    res.status(500).json({
      error: "Failed to fetch participants",
      details: error.response?.data || error.message,
    });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
