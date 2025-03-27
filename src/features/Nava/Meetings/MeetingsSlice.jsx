
import { createSlice } from "@reduxjs/toolkit";

const meetingsSlice = createSlice({
  name: "meetings",
  initialState: {
    meetings: [
      { id: 1, courseId: "101", teacherId: "T01", lessonDate: "2025-04-01", startHour: "10:00", endHour: "12:00", title: "מפגש פתיחה", description: "היכרות עם הקורס", homeWork: "לקרוא פרק 1", homeWorkFile: "" },
      { id: 2, courseId: "101", teacherId: "T02", lessonDate: "2025-04-05", startHour: "14:00", endHour: "16:00", title: "שיעור מתקדם", description: "תרגול מעשי", homeWork: "לפתור תרגיל 5", homeWorkFile: "https://example.com/hw5.pdf" },
      { id: 3, courseId: "102", teacherId: "T03", lessonDate: "2025-04-02", startHour: "09:00", endHour: "11:00", title: "מבוא לתכנות", description: "סקירה כללית", homeWork: "להגיש דו סיכום", homeWorkFile: "" },
      { id: 4, courseId: "102", teacherId: "T03", lessonDate: "2025-04-02", startHour: "09:00", endHour: "11:00", title: "מבוא לתכנות", description: "סקירה כללית", homeWork: "להגיש דו סיכום", homeWorkFile: "" },
      { id: 5, courseId: "102", teacherId: "T03", lessonDate: "2025-04-02", startHour: "09:00", endHour: "11:00", title: "מבוא לתכנות", description: "סקירה כללית", homeWork: "להגיש דו סיכום", homeWorkFile: "" },
    ],
  },
  reducers: {
    fetchMeetings: (state, action) => {
      return {
        ...state,
        meetings: state.meetings.filter(meeting => meeting.courseId === action.payload)
      };
    },
  },
});

export const { fetchMeetings } = meetingsSlice.actions;
export default meetingsSlice.reducer;
