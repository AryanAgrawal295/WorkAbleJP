import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async action to submit feedback
export const submitFeedback = createAsyncThunk(
  "feedback/submitFeedback",
  async (feedbackText, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/feedback/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ feedback: feedbackText }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      return data.message || "Feedback submitted successfully!";
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const feedbackSlice = createSlice({
  name: "feedback",
  initialState: {
    message: "",
    error: "",
    loading: false,
  },
  reducers: {
    clearMessages: (state) => {
      state.message = "";
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitFeedback.pending, (state) => {
        state.loading = true;
        state.message = "";
        state.error = "";
      })
      .addCase(submitFeedback.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload;
        state.error = "";
      })
      .addCase(submitFeedback.rejected, (state, action) => {
        state.loading = false;
        state.message = "";
        state.error = action.payload;
      });
  },
});

export const { clearMessages } = feedbackSlice.actions;
export default feedbackSlice.reducer;
