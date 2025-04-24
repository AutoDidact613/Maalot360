

import { configureStore } from '@reduxjs/toolkit'
import chatReducer from '../featuers/Chat/chatSlice';
import taskReducer from '../featuers/lecturer/taskSlice'
import meetingsReducer from "../featuers/Nava/Meetings/MeetingsSlice";

export const store = configureStore({
  reducer: {
     tasks: taskReducer,
     taskSlice:taskReducer,
     chat: chatReducer,
    //  taskSlice:taskReducer,
     meetings: meetingsReducer
  },
})

