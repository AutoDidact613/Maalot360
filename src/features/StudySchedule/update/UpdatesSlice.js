import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  // דוגמה לאובייקטים:
  // {
  //   _id: 1,
  //   title: "עידכון: מחר יתקיים המפגש הראשון",
  //   start: "2025-04-03T17:30:00.000Z",
  //   end: "2025-04-03T17:30:00.000Z",
  //   updateMessage: "חשוב לדייק בזמנים"
  // }
];

const UpdateSlice = createSlice({
  name: "updates",
  initialState,
  reducers: {
    initUpdate: (state, action) => {
      // מחליף את כל המערך רק בטעינה ראשונית
      return action.payload;
    },
    addUpdate: (state, action) => {
      const idx = state.findIndex(update => update._id === action.payload._id);
      if (idx !== -1) {
        state[idx] = action.payload;
      } else {
        state.push(action.payload);
      }
    },
    updateUpdate: (state, action) => {
      // מוצא את העדכון לפי _id ומעדכן אותו
      const idx = state.findIndex(update => update._id === action.payload._id);
      if (idx !== -1) {
        state[idx] = action.payload;
      }
    },
    deleteUpdate: (state, action) => {
      return state.filter(update => update._id !== action.payload._id);
    },
  },
});

export const { addUpdate, updateUpdate, deleteUpdate, initUpdate } = UpdateSlice.actions;
export default UpdateSlice.reducer;