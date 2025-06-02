import { createSlice } from "@reduxjs/toolkit";

// const initialState = [
//   { 
//     id: 1, 
//     title: "מפגש השתלמות מס' 1",
//     type:"מפגשים", 
//     start: new Date(2025, 3, 4, 17, 30), 
//     end: new Date(2025, 3, 4, 17, 30),
//     importance: "3", 
//     eventMessage: " סמינר מעלות בשעה:12:00",
//     visible:true
//   },
//   { 
//     id: 2, 
//     title: "הגשת פרויקט", 
//     type:"הגשות",
//     start: new Date(2025, 3, 18, 10, 0), 
//     end: new Date(2025, 3, 18, 10, 0),
//     importance: "2", 
//     eventMessage: "הגשת הקוד+תיעוד בסרטון",
//     visible:true

//   },
//   { 
//     id: 3, 
//     title: " מפגש בזום", 
//     type:"זום",
//     start: new Date(2025, 3, 7, 10, 0), 
//     end: new Date(2025, 3, 7, 12, 0),
//     importance: "2", 
//     eventMessage: "הנחיות לגבי הגשת הפרויקט",
//     visible:true

//   },
//   { 
//     id: 4, 
//     title: " מפגש השתלמות מס' 2", 
//     type:"מפגשים",
//     start: new Date(2025, 3, 15, 10, 0), 
//     end: new Date(2025, 3, 15, 12, 0),
//     importance: "2", 
//     eventMessage: " סמינר מעלות בשעה:16:30",
//     visible:true

//   },
// ];

// const eventSlice = createSlice({
//   name: "events",
//   initialState,
//   reducers: {
//    initEvent: (state, action) => {
//   return action.payload;
// },

//     addEvent: (state, action) => {
//       const existingEventIndex = state.findIndex(event => event.id === action.payload.id);
//       if (existingEventIndex !== -1) {
//         state[existingEventIndex] = action.payload; 
//       } else {
//         state.push({ ...action.payload, id: Date.now(), visible: true });
//       }
//     },
//     deleteEvent: (state, action) => {
//       return state.filter((event) => event.id !== action.payload.id);
//     },
   
//   },
// });

// export const { addEvent ,deleteEvent,updateEvent,initEvent} = eventSlice.actions;
// export default eventSlice.reducer;

//import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  // אירועים קיימים
];

const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    initEvent: (state, action) => {
      // מחליף את כל המערך רק בטעינה ראשונית
      return action.payload;
    },
    addEvent: (state, action) => {
      // תמיד מוסיף אירוע חדש
      state.push(action.payload);
    },
    updateEvent: (state, action) => {
      // מוצא את האירוע לפי _id ומעדכן אותו
      const idx = state.findIndex(event => event._id === action.payload._id);
      if (idx !== -1) {
        state[idx] = action.payload;
      }
    },
    deleteEvent: (state, action) => {
      return state.filter(event => event._id !== action.payload._id);
    },
  },
});

export const { initEvent, addEvent, deleteEvent ,updateEvent} = eventSlice.actions;
export default eventSlice.reducer;