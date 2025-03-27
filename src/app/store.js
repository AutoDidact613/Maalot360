import { configureStore } from '@reduxjs/toolkit'
<<<<<<< HEAD
import meetingsReducer from "../features/Nava/Meetings/MeetingsSlice";

export const store = configureStore({
  reducer: {
    meetings: meetingsReducer, 
=======
import taskReducer from '../featuers/lecturer/taskSlice'

export const store = configureStore({
  reducer: {
     taskSlice:taskReducer
>>>>>>> 14e61a6f3fbb1f2d21c2ee88acd175ecad82628b
  },
})