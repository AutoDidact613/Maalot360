import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  { 
    id: 1, 
    title: "מפגש", 
    start: new Date(2025, 2, 5, 17, 30), 
    end: new Date(2025, 2, 6, 18, 30),
    importance: "3", 
    eventMessage: " סמינר מעלות בשעה:12:00",
    visible:true
  },
  { 
    id: 2, 
    title: "הגשת פרויקט", 
    start: new Date(2025, 2, 20, 10, 0), 
    end: new Date(2025, 2, 20, 12, 0),
    importance: "2", 
    eventMessage: "הגשת מסמכים וסיכום תיעוד",
    visible:true

  },
  { 
    id: 3, 
    title: " מפגש בזום", 
    start: new Date(2025, 2, 10, 10, 0), 
    end: new Date(2025, 2, 10, 12, 0),
    importance: "2", 
    eventMessage: "הנחיות לגבי הגשת הפרויקט",
    visible:true

  },
];

const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    // addEvent: (state, action) => {
    //   state.push(action.payload);
    // },
  },
});

// export const { addEvent } = eventSlice.actions;
export default eventSlice.reducer;
