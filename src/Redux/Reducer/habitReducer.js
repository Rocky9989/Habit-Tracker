// redux toolkit functions to create slice and async thunk
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// list of image URLs to render a new image on the home screen each time the page re-renders
import { DisplayImage } from '../../Data/DisplayImage';

// initial state of redux state
const initialState = {
  habits: [], // list of all the habits selected by a user
  quote: null, // updated to null for better conditional handling
  suggestionSelected: null,
  showStatus: null,
  displayImageUrl: '',
};

// fetching list of quotes to show on screen
export const quoteFetchThunk = createAsyncThunk('quotes/fetch', async () => {
  const response = await fetch('https://dummyjson.com/quotes');
  const data = await response.json();
  return data.quotes; // Extract quotes array properly
});

// creating Slice to manage habits and quotes
const habitSlice = createSlice({
  name: 'habitTracker',
  initialState,
  reducers: {
    addHabit: (state, action) => {
      state.habits.push(action.payload);
      state.showStatus = null;
    },
    setSuggestionSelected: (state, action) => {
      state.suggestionSelected = action.payload;
    },
    setShowStatus: (state, action) => {
      state.showStatus = action.payload;
    },
    toggleHabitStatus: (state, action) => {
      const { habitIndex, dayIndex, status } = action.payload;

      if (state.showStatus === null) {
        state.showStatus = { ...state.habits[habitIndex] };
      }

      if (status) {
        if (!state.showStatus.weekStatus[dayIndex]) {
          state.showStatus.completedDays++;
        }
      } else if (status === false) {
        if (state.showStatus.weekStatus[dayIndex]) {
          state.showStatus.completedDays--;
        }
      } else {
        if (state.showStatus.weekStatus[dayIndex]) {
          state.showStatus.completedDays--;
        }
      }

      state.showStatus.weekStatus[dayIndex] = status;
      state.habits = state.habits.filter(
        (habit) => habit.id !== state.showStatus.id
      );
      state.habits.push(state.showStatus);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(quoteFetchThunk.fulfilled, (state, action) => {
      if (action.payload.length > 0) {
        const index = Math.floor(Math.random() * action.payload.length);
        state.quote = action.payload[index]; // Corrected to access quotes properly
      }

      if (DisplayImage.length > 0) {
        const imageIndex = Math.floor(Math.random() * DisplayImage.length);
        state.displayImageUrl = DisplayImage[imageIndex].url;
      }
    });
  },
});

// export the habitReducer to create the store and access the state
export const habitReducer = habitSlice.reducer;

// exporting all the actions
export const {
  addHabit,
  setSuggestionSelected,
  setShowStatus,
  toggleHabitStatus,
} = habitSlice.actions;

// exporting habitReducer's state to use state outside
export const habitSelector = (state) => state.habitReducer;
