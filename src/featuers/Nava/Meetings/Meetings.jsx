import { useSelector, useDispatch } from "react-redux";
import { fetchMeetings } from "../../../featuers/Nava/Meetings/MeetingsSlice";
import { useEffect, useState } from "react";
import { addMeeting } from "../../../featuers/Nava/Meetings/MeetingsSlice";
import { v4 as uuidv4 } from "uuid"; // ליצירת מזהה ייחודי
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Link,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Input,
} from "@mui/material";

const Meetings = ({ courseId }) => {
  const dispatch = useDispatch();
  const meetings = useSelector((state) => state.meetings.meetings);
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    lessonDate: "",
    startHour: "",
    endHour: "",
    description: "",
    teacherId: "",
    homeWork: "",
    homeWorkFile: null,
    videoFiles: [],
  });


  useEffect(() => {
    if (courseId) {
      dispatch(fetchMeetings(courseId));
    }
  }, [dispatch, courseId]);

  const moveToMeet = (meeting) => {
    setSelectedMeeting(meeting);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      // אם מדובר בריבוי סרטונים
      if (name === "videoFiles") {
        setFormData({ ...formData, [name]: Array.from(files) });
      } else {
        setFormData({ ...formData, [name]: files[0] });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };


  const handleSubmit = () => {
    const newMeeting = {
      id: uuidv4(),
      title: formData.title,
      lessonDate: formData.lessonDate,
      startHour: formData.startHour,
      endHour: formData.endHour,
      description: formData.description,
      teacherId: formData.teacherId,
      homeWork: formData.homeWork,
      homeWorkFile: formData.homeWorkFile ? URL.createObjectURL(formData.homeWorkFile) : null,
      videoFiles: formData.videoFiles.map((file) => URL.createObjectURL(file)),
      courseId,
    };
  
    dispatch(addMeeting(newMeeting));
  
    setOpenDialog(false);
    setFormData({
      title: "",
      lessonDate: "",
      startHour: "",
      endHour: "",
      description: "",
      teacherId: "",
      homeWork: "",
      homeWorkFile: null,
      videoFiles: [],
    });
  };


  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        מפגשים לקורס {courseId}
      </Typography>

      <Box mb={3}>
        <Button variant="contained" color="success" onClick={() => setOpenDialog(true)}>
          ➕ הוסף מפגש
        </Button>
      </Box>

      {!selectedMeeting ? (
        <Grid container spacing={3}>
          {meetings.map((meeting) => (
            <Grid item xs={12} sm={6} md={4} key={meeting.id}>
              <Card
                onClick={() => moveToMeet(meeting)}
                sx={{ cursor: "pointer", transition: "0.3s", "&:hover": { boxShadow: 6 } }}
              >
                <CardContent>
                  <Typography variant="h6" gutterBottom>{meeting.title}</Typography>
                  <Typography>📅 תאריך: {meeting.lessonDate}</Typography>
                  <Typography>🕒 {meeting.startHour} - {meeting.endHour}</Typography>
                  <Typography>📖 תוכן: {meeting.description}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Paper elevation={4} sx={{ p: 3, maxWidth: 600, mx: "auto" }}>
          <Typography variant="h5" gutterBottom>{selectedMeeting.title}</Typography>
          <Typography>📅 תאריך: {selectedMeeting.lessonDate}</Typography>
          <Typography>🕒 {selectedMeeting.startHour} - {selectedMeeting.endHour}</Typography>
          <Typography>👨‍🏫 קוד מורה: {selectedMeeting.teacherId}</Typography>
          <Typography>📖 תוכן: {selectedMeeting.description}</Typography>
          <Typography>🏠 ש.ב: {selectedMeeting.homeWork}</Typography>
          {selectedMeeting.homeWorkFile && (
            <Typography>
              📂 <Link href={selectedMeeting.homeWorkFile} target="_blank" rel="noopener">קובץ ש.ב</Link>
            </Typography>
          )}
          <Box mt={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setSelectedMeeting(null)}
            >
              סגור
            </Button>
          </Box>
        </Paper>
      )}

      {/* Dialog for new meeting */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth maxWidth="sm">
        <DialogTitle>הוסף מפגש חדש</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField name="title" label="כותרת" value={formData.title} onChange={handleChange} fullWidth />
          <TextField name="lessonDate" label="תאריך" type="date" value={formData.lessonDate} onChange={handleChange} InputLabelProps={{ shrink: true }} />
          <TextField name="startHour" label="שעת התחלה" type="time" value={formData.startHour} onChange={handleChange} InputLabelProps={{ shrink: true }} />
          <TextField name="endHour" label="שעת סיום" type="time" value={formData.endHour} onChange={handleChange} InputLabelProps={{ shrink: true }} />
          <TextField name="teacherId" label="קוד מורה" value={formData.teacherId} onChange={handleChange} />
          <TextField name="description" label="תיאור" multiline rows={3} value={formData.description} onChange={handleChange} />
          <TextField name="homeWork" label="שיעורי בית" multiline rows={2} value={formData.homeWork} onChange={handleChange} />
          <Input type="file" name="homeWorkFile" onChange={handleChange} />
          <Input type="file" name="videoFile" onChange={handleChange} />
          <Input
            type="file"
            name="videoFiles"
            onChange={handleChange}
            inputProps={{ multiple: true }}
          />

        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>ביטול</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">שמור</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Meetings;
