import { configureStore } from '@reduxjs/toolkit'
import taskReducer from '../featuers/lecturer/taskSlice'
import meetingsReducer from "../featuers/Nava/Meetings/MeetingsSlice";

export const store = configureStore({
  reducer: {
     taskSlice:taskReducer,
     meetings: meetingsReducer
  },
})