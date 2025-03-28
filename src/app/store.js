import { configureStore } from '@reduxjs/toolkit'
import meetingsReducer from "../features/Nava/Meetings/MeetingsSlice";

export const store = configureStore({
  reducer: {
    meetings: meetingsReducer, 
  },
})