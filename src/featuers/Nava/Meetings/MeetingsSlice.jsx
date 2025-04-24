import { createSlice } from "@reduxjs/toolkit";

const meetingsSlice = createSlice({
  name: "meetings",
  initialState: {
    meetings: [
      { id: 1, courseId: "101", teacherId: "T01", lessonDate: "2025-04-01", startHour: "10:00", endHour: "12:00", title: "מפגש פתיחה", description: "היכרות עם הקורס", homeWork: "לקרוא פרק 1", homeWorkFile: "" },
      { id: 2, courseId: "102", teacherId: "T02", lessonDate: "2025-04-05", startHour: "14:00", endHour: "16:00", title: "שיעור מתקדם", description: "תרגול מעשי", homeWork: "לפתור תרגיל 5", homeWorkFile: "https://example.com/hw5.pdf" },
      { id: 3, courseId: "102", teacherId: "T03", lessonDate: "2025-04-02", startHour: "09:00", endHour: "11:00", title: "מבוא לתכנות", description: "סקירה כללית", homeWork: "להגיש דו סיכום", homeWorkFile: "" },
      { id: 4, courseId: "103", teacherId: "T03", lessonDate: "2025-04-02", startHour: "09:00", endHour: "11:00", title: "מבוא לתכנות", description: "סקירה כללית", homeWork: "להגיש דו סיכום", homeWorkFile: "" },
      { id: 5, courseId: "102", teacherId: "T03", lessonDate: "2025-04-02", startHour: "09:00", endHour: "11:00", title: "מבוא לתכנות", description: "סקירה כללית", homeWork: "להגיש דו סיכום", homeWorkFile: "" },
      { id: 6, courseId: "101", teacherId: "T03", lessonDate: "2025-04-02", startHour: "09:00", endHour: "11:00", title: "מבוא לתכנות", description: "סקירה כללית", homeWork: "להגיש דו סיכום", homeWorkFile: "" },
    ],
  },
  reducers: {
    fetchMeetings: (state, action) => {
      state.meetings = state.meetings.filter(
        (meeting) => meeting.courseId === action.payload
      );
    },
    addMeeting: (state, action) => {
      state.meetings.push(action.payload);
    },
    deleteMeeting: (state, action) => {
      state.meetings = state.meetings.filter(
        (meeting) => meeting.id !== action.payload
      );
    },
    updateMeeting: (state, action) => {
      const index = state.meetings.findIndex(
        (m) => m.id === action.payload.id
      );
      if (index !== -1) {
        state.meetings[index] = action.payload;
      }
    },
    setMeetings: (state, action) => {
      state.meetings = action.payload;
    },
  },
});

export const {
  fetchMeetings,
  addMeeting,
  deleteMeeting,
  updateMeeting,
  setMeetings,
} = meetingsSlice.actions;

export default meetingsSlice.reducer;
