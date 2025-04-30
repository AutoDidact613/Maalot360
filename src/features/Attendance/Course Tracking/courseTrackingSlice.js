const initialState = {
    attendanceData: [
        { lessonId: 1, studentId: 'S001', dateAndTime: '2025-04-23T10:00', status: 'נוכחות' },
        { lessonId: 1, studentId: 'S002', dateAndTime: '2025-04-23T10:00', status: ' חיסור' },
        { lessonId: 2, studentId: 'S001', dateAndTime: '2025-04-24T12:00', status: 'נוכחות' },
        { lessonId: 2, studentId: 'S003', dateAndTime: '2025-04-24T12:00', status: 'חיסור' },
    ],
};

const courseTrackingSlice = createSlice({
    name: 'courseTracking',
    initialState,
    reducers: {},
});

export default courseTrackingSlice.reducer;



