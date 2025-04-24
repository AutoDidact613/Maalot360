import { configureStore } from '@reduxjs/toolkit'
import taskSlice from '../featuers/lecturer/taskSlice'
import questionSlice from '../featuers/lecturer/questionSlice'

export const store = configureStore({
  reducer: {
     taskSlice: taskSlice,
     questions: questionSlice,  
  },
})