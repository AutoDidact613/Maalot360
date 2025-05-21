import React from 'react';
import MarkAttendance from '../features/Attendance/MarkAttendance ';
import ViewAllAttendance from '../features/Attendance/ViewAllAttendance';
import StudentAttendanceByCourse from '../features/Attendance/StudentAttendanceByCourse'
import CoursePage from '../features/Attendance/CoursePage'

const Attendance = () => {
  return (
    <div>

      <MarkAttendance />
      <ViewAllAttendance />
      <StudentAttendanceByCourse />
      <CoursePage />
  
    </div>
  );
};

export default Attendance;