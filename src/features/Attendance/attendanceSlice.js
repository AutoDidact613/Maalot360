import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    courses: [
        { name: 'HTML ', sessions: 12 },
        { name: 'JAVA', sessions: 14 },
        { name: 'UI UX', sessions: 10 },
    ],
};

const viewAllAttendanceSlice = createSlice({
    name: 'viewAllAttendance',
    initialState,
    reducers: {
        setCourses: (state, action) => {
            state.courses = action.payload;
        },
    },
});

export const { setCourses } = viewAllAttendanceSlice.actions;

export default viewAllAttendanceSlice.reducer;