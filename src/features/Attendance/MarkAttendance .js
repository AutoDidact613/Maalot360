import React, { useState, useEffect } from 'react';
import {
  Checkbox,
  Button,
  Typography,
  Paper,
  Box,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { setCourses } from './attendanceSlice'; // ודא שהנתיב נכון

// מחזיר את התאריך הנוכחי בפורמט YYYY-MM-DD
const getTodayDate = () => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

export default function MarkAttendance() {
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.attendance.courses);

  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [date, setDate] = useState(getTodayDate());
  const [attendance, setAttendance] = useState({});

  const course = courses.find((c) => c.id === selectedCourseId);

  // טוען נוכחות כשמשתנים קורס או תאריך
  useEffect(() => {
    if (!course || !date) {
      setAttendance({});
      return;
    }

    const newAttendance = {};
    course.students.forEach((student) => {
      newAttendance[student.id] = student.attendance?.[date] || false;
    });
    setAttendance(newAttendance);
  }, [course, date]);

  const handleCheckboxChange = (studentId) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: !prev[studentId],
    }));
  };

  const handleSave = () => {
    if (!course || !date) return;

    const updatedCourses = courses.map((c) => {
      if (c.id !== course.id) return c;

      const updatedStudents = c.students.map((student) => ({
        ...student,
        attendance: {
          ...student.attendance,
          [date]: attendance[student.id] || false,
        },
      }));

      const updatedSessions = c.sessions.includes(date)
        ? c.sessions
        : [...c.sessions, date];

      return {
        ...c,
        sessions: updatedSessions,
        students: updatedStudents,
      };
    });

    dispatch(setCourses(updatedCourses));
    alert('נוכחות נשמרה בהצלחה');
  };

  return (
    <Box sx={{ padding: 4, direction: 'rtl', maxWidth: 600, margin: '0 auto' }}>
      <Typography variant="h5" align="center" gutterBottom>
        רישום נוכחות למרצה
      </Typography>

      <FormControl fullWidth margin="normal">
        <InputLabel id="course-select-label">בחר קורס</InputLabel>
        <Select
          labelId="course-select-label"
          value={selectedCourseId}
          label="בחר קורס"
          onChange={(e) => {
            setSelectedCourseId(e.target.value);
            setAttendance({});
          }}
        >
          {courses.map((c) => (
            <MenuItem key={c.id} value={c.id}>
              {c.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <TextField
          label="תאריך"
          type="date"
          variant="outlined"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
      </FormControl>

      {course && (
        <Paper sx={{ padding: 2, marginTop: 2 }}>
          <Typography variant="h6">
            תלמידות בקורס: {course.name}
          </Typography>

          {course.students.map((student) => (
            <FormControlLabel
              key={student.id}
              control={
                <Checkbox
                  checked={attendance[student.id] || false}
                  onChange={() => handleCheckboxChange(student.id)}
                />
              }
              label={student.name}
            />
          ))}

          <Box mt={2}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleSave}
            >
              שמור נוכחות
            </Button>
          </Box>
        </Paper>
      )}
    </Box>
  );
}
