import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
} from '@mui/material';
import { CheckCircle, Cancel } from '@mui/icons-material';

export default function CoursePage() {
  const courses = useSelector((state) => state.attendance.courses);
  const [courseId, setCourseId] = useState('');
  const course = courses.find((c) => c.id === courseId);

  return (
    <Box sx={{ padding: 3, direction: 'rtl', maxWidth: 1000, margin: '0 auto' }}>
      <Typography variant="h4" gutterBottom align="center">
        צפייה בנוכחות לפי קורס
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
        <FormControl fullWidth sx={{ maxWidth: 300 }}>
          <InputLabel id="course-select-label">בחר קורס</InputLabel>
          <Select
            labelId="course-select-label"
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
            label="בחר קורס"
          >
            {courses.map((course) => (
              <MenuItem key={course.id} value={course.id}>
                {course.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {course ? (
        <>
          <Typography variant="h5" align="center" gutterBottom>
            קורס: {course.name}
          </Typography>
          <Typography variant="subtitle1" align="center" gutterBottom>
            מרצה: {course.teacher}
          </Typography>

          <TableContainer component={Paper} sx={{ mt: 3 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center" sx={{ width: '20%' }}>
                    תלמידה
                  </TableCell>
                  {course.sessions.map((date) => (
                    <TableCell
                      key={date}
                      align="center"
                      sx={{ width: `${80 / course.sessions.length}%` }}
                    >
                      {date}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {course.students.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell align="center">{student.name}</TableCell>
                    {course.sessions.map((date) => (
                      <TableCell key={date} align="center">
                        {student.attendance[date] ? (
                          <CheckCircle color="success" />
                        ) : (
                          <Cancel color="error" />
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ) : (
        courseId && (
          <Typography color="error" align="center" sx={{ mt: 2 }}>
            לא נמצא קורס.
          </Typography>
        )
      )}
    </Box>
  );
}
