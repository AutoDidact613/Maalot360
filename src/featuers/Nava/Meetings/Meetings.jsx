// import { useSelector, useDispatch } from "react-redux";
// import { fetchMeetings } from "../../../featuers/Nava/Meetings/MeetingsSlice";
// import { useEffect, useState } from "react";
// import { addMeeting, deleteMeeting, updateMeeting } from "../../../featuers/Nava/Meetings/MeetingsSlice";
// import { v4 as uuidv4 } from "uuid"; // ליצירת מזהה ייחודי
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';
// import {
//   Box,
//   Grid,
//   Card,
//   CardContent,
//   Typography,
//   Button,
//   Link,
//   Paper,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   Input,
// } from "@mui/material";



// const Meetings = ({ courseId }) => {

//   const dispatch = useDispatch();
//   const meetings = useSelector((state) => state.meetings.meetings);

//   const [selectedMeeting, setSelectedMeeting] = useState(null);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [user, setUser] = useState('student');
//   const [editMode, setEditMode] = useState(false);
//   const [formData, setFormData] = useState({
//     title: "",
//     lessonDate: "",
//     startHour: "",
//     endHour: "",
//     description: "",
//     teacherId: "",
//     homeWork: "",
//     homeWorkFile: null,
//     videoFiles: [],
//   });



//   //בטעינת הדף
//   useEffect(() => {
//     if (courseId) {
//       dispatch(fetchMeetings(courseId));
//     }
//   }, [dispatch, courseId]);

//   //שמירת המפגש הנוכחי במשתנה
//   const moveToMeet = (meeting) => {
//     setSelectedMeeting(meeting);
//   };

//   //מתמודדת עם כל שינוי בטופס ושומרת לפי הסוג
//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (files) {
//       // אם מדובר בריבוי סרטונים
//       if (name === "videoFiles") {
//         setFormData({ ...formData, [name]: Array.from(files) });
//       } else {
//         setFormData({ ...formData, [name]: files[0] });
//       }
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   //מטפל בשמירה של הוספה או עריכה
//   const handleSubmit = () => {
//     const updatedMeeting = {
//       ...formData,
//       //במצב הוספה מייצר קוד יחודי
//       id: formData.id || uuidv4(),
//       homeWorkFile: formData.homeWorkFile
//         ? URL.createObjectURL(formData.homeWorkFile)
//         : selectedMeeting?.homeWorkFile || null,
//       videoFiles: formData.videoFiles.length
//         ? formData.videoFiles.map((file) => URL.createObjectURL(file))
//         : selectedMeeting?.videoFiles || [],
//       courseId,
//     };

//     //בדיקת הוספה או עריכה ושליחה לפונקציה במתאימה
//     if (editMode) {
//       dispatch(updateMeeting(updatedMeeting));
//     } else {
//       dispatch(addMeeting(updatedMeeting));
//     }

//     //סגירת הטופס
//     setOpenDialog(false);
//     setEditMode(false);
//     setFormData({
//       title: "",
//       lessonDate: "",
//       startHour: "",
//       endHour: "",
//       description: "",
//       teacherId: "",
//       homeWork: "",
//       homeWorkFile: null,
//       videoFiles: [],
//     });
//   };


//   const handleEditMeeting = (meeting) => {
//     setFormData({
//       ...meeting,
//       homeWorkFile: null,
//       videoFiles: [],
//     });
//     //איפוס משתנים
//     setSelectedMeeting(null);
//     setEditMode(true);
//     setOpenDialog(true);
//   };

//   return (

//     <Box sx={{ p: 4 }}>
//       <Typography variant="h4" gutterBottom>
//         מפגשים לקורס {courseId}
//       </Typography>


//       <Box mb={3}>
//         <Button variant="contained" color="success" onClick={() => setUser('manager')}>
//           מנהלת
//         </Button>
//       </Box>


//       {user === 'manager' && (
//         <Box mb={3}>
//           <Button variant="contained" color="success" onClick={() => setOpenDialog(true)}>
//             ➕ הוסף מפגש
//           </Button>
//         </Box>
//       )}




//       {/* אם לא נבחר מפגש מציג את כולם */}
//       {!selectedMeeting ? (
//         <Grid container spacing={3}>
//           {meetings.map((meeting) => (
//             <Grid item xs={12} sm={6} md={4} key={meeting.id}>
//               <Card
//                 onClick={() => moveToMeet(meeting)}
//                 sx={{ cursor: "pointer", transition: "0.3s", "&:hover": { boxShadow: 6 } }}
//               >
//                 <CardContent>
//                   <Typography variant="h6" gutterBottom>{meeting.title}</Typography>
//                   <Typography>📅 תאריך: {meeting.lessonDate}</Typography>
//                   <Typography>🕒 {meeting.startHour} - {meeting.endHour}</Typography>
//                   <Typography>📖 תוכן: {meeting.description}</Typography>
//                 </CardContent>

//                 {/*  מציג כפתורי עריכה ומחיקה עבור מנהל */}
//                 {user === 'manager' && (
//                   <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1, gap: 1 }}>
//                     <Button
//                       onClick={(e) => {
//                         //מנטרל את הצגת המידע
//                         e.stopPropagation();
//                         // פונקציית מחיקה
//                         dispatch(deleteMeeting(meeting.id));
//                       }}
//                       color="error"
//                       size="small"
//                       variant="text"
//                     >
//                       <DeleteIcon />
//                     </Button>
//                     <Button
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         setFormData({ ...meeting, homeWorkFile: null, videoFiles: [] });
//                         setEditMode(true); // מעבר למצב עריכה
//                         setOpenDialog(true);//פתיחת הטופס לשינוי
//                       }}
//                       color="primary"
//                       size="small"
//                       variant="text"
//                     >
//                       <EditIcon />
//                     </Button>
//                   </Box>
//                 )}

//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       ) : (
//         <Paper elevation={4} sx={{ p: 3, maxWidth: 600, mx: "auto" }}>
//           <Typography variant="h5" gutterBottom>{selectedMeeting.title}</Typography>
//           <Typography>📅 תאריך: {selectedMeeting.lessonDate}</Typography>
//           <Typography>🕒 {selectedMeeting.startHour} - {selectedMeeting.endHour}</Typography>
//           <Typography>👨‍🏫 קוד מורה: {selectedMeeting.teacherId}</Typography>
//           <Typography>📖 תוכן: {selectedMeeting.description}</Typography>
//           <Typography>🏠 ש.ב: {selectedMeeting.homeWork}</Typography>
//           {selectedMeeting.homeWorkFile && (
//             <Typography>
//               📂 <Link href={selectedMeeting.homeWorkFile} target="_blank" rel="noopener">קובץ ש.ב</Link>
//             </Typography>
//           )}

// {selectedMeeting.videoFiles && selectedMeeting.videoFiles.length > 0 && (
//   <Box mt={2}>
//     <Typography variant="subtitle1">🎬 סרטונים:</Typography>
//     <Box display="flex" flexWrap="wrap" gap={2}>
//       {selectedMeeting.videoFiles.map((videoUrl, index) => (
//         <Box key={index} sx={{ width: 160, height: 100, border: '1px solid #ccc', borderRadius: 2, overflow: 'hidden' }}>
//           <video
//             width="100%"
//             height="100%"
//             preload="metadata"
//             controls
//             controlsList="nodownload"
//             style={{ objectFit: 'cover', cursor: 'pointer' }}
//             onPlay={(e) => {
//               document.querySelectorAll("video").forEach((v) => {
//                 if (v !== e.target) v.pause();
//               });
//             }}
//           >
//             <source src={videoUrl} type="video/mp4" />
//             הדפדפן שלך לא תומך בניגון וידאו.
//           </video>
//         </Box>
//       ))}
//     </Box>
//   </Box>
// )}



//           <Box mt={2}>
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={() => setSelectedMeeting(null)}
//             >
//               סגור
//             </Button>
//           </Box>
//         </Paper>
//       )}

//       {/* הוספת מפגש*/}
//       <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth maxWidth="sm">
//         <DialogTitle>הוסף מפגש חדש</DialogTitle>
//         <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
//           <TextField name="title" label="כותרת" value={formData.title} onChange={handleChange} fullWidth />
//           <TextField name="lessonDate" label="תאריך" type="date" value={formData.lessonDate} onChange={handleChange} InputLabelProps={{ shrink: true }} />
//           <TextField name="startHour" label="שעת התחלה" type="time" value={formData.startHour} onChange={handleChange} InputLabelProps={{ shrink: true }} />
//           <TextField name="endHour" label="שעת סיום" type="time" value={formData.endHour} onChange={handleChange} InputLabelProps={{ shrink: true }} />
//           <TextField name="teacherId" label="קוד מורה" value={formData.teacherId} onChange={handleChange} />
//           <TextField name="description" label="תיאור" multiline rows={3} value={formData.description} onChange={handleChange} />
//           <TextField name="homeWork" label="שיעורי בית" multiline rows={2} value={formData.homeWork} onChange={handleChange} />
//           <Typography variant="subtitle1">קובץ שיעורי בית</Typography>
//           <Input type="file" name="homeWorkFile" onChange={handleChange} />
//           <Typography variant="subtitle1">סירטונים</Typography>
//           <Input
//             type="file"
//             name="videoFiles"
//             onChange={handleChange}
//             inputProps={{ multiple: true }}
//           />

//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpenDialog(false)}>ביטול</Button>
//           <Button onClick={handleSubmit} variant="contained" color="primary">שמור</Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default Meetings;


// src/featuers/Nava/Meetings/Meetings.jsx

// src/featuers/Nava/Meetings/Meetings.jsx
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchMeetings,
  addMeeting,
  deleteMeeting,
  updateMeeting,
} from "../../../featuers/Nava/Meetings/MeetingsSlice";
import { v4 as uuidv4 } from "uuid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import InfoIcon from "@mui/icons-material/Info";
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
import "./Meetings.css";

const Meetings = ({ courseId }) => {
  const dispatch = useDispatch();
  const meetings = useSelector((state) => state.meetings.meetings);

  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [user, setUser] = useState("student");
  const [editMode, setEditMode] = useState(false);
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
    if (courseId) dispatch(fetchMeetings(courseId));
  }, [dispatch, courseId]);

  const moveToMeet = (meeting) => {
    setSelectedMeeting(meeting);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({
        ...formData,
        [name]: name === "videoFiles" ? Array.from(files) : files[0],
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = () => {
    const updatedMeeting = {
      ...formData,
      id: formData.id || uuidv4(),
      homeWorkFile: formData.homeWorkFile
        ? URL.createObjectURL(formData.homeWorkFile)
        : selectedMeeting?.homeWorkFile || null,
      videoFiles: formData.videoFiles.length
        ? formData.videoFiles.map((f) => URL.createObjectURL(f))
        : selectedMeeting?.videoFiles || [],
      courseId,
    };

    if (editMode) dispatch(updateMeeting(updatedMeeting));
    else dispatch(addMeeting(updatedMeeting));

    setOpenDialog(false);
    setEditMode(false);
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

  const handleEditMeeting = (meeting) => {
    setFormData({ ...meeting, homeWorkFile: null, videoFiles: [] });
    setSelectedMeeting(null);
    setEditMode(true);
    setOpenDialog(true);
  };

  return (
    <Box className="meetings-container">
      <Typography variant="h4" gutterBottom>
        מפגשים לקורס {courseId}
      </Typography>

      <Box className="add-button-wrapper">
        <Button
          className="manager-button"
          onClick={() => setUser("manager")}
        >
          מנהלת
        </Button>
      </Box>

      {user === "manager" && (
        <Box className="add-button-wrapper">
          <Button
            className="additional-button"
            onClick={() => setOpenDialog(true)}
          >
            ➕ הוסף מפגש
          </Button>
        </Box>
      )}

      {!selectedMeeting ? (
        <Grid container direction="column" className="meetings-grid">
          {meetings.map((meeting) => (
            <Grid item key={meeting.id}>
              <Card
                className="meeting-card"
                onClick={() => moveToMeet(meeting)}
              >
                <CardContent className="meeting-card-content">
                  <Typography
                    component="h3"
                    className="meeting-title"
                  >
                    {meeting.title}
                  </Typography>
                  <Box className="meeting-row">
                    <CalendarTodayIcon fontSize="small" />
                    <Typography variant="body2">
                      {meeting.lessonDate}
                    </Typography>
                  </Box>
                  <Box className="meeting-row">
                    <AccessTimeIcon fontSize="small" />
                    <Typography variant="body2">
                      {meeting.startHour} - {meeting.endHour}
                    </Typography>
                  </Box>
                  <Box className="meeting-row">
                    <InfoIcon fontSize="small" />
                    <Typography variant="body2">
                      {meeting.description}
                    </Typography>
                  </Box>
                </CardContent>
                {user === "manager" && (
                  <Box className="button-group">
                    <Button
                      className="edit-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditMeeting(meeting);
                      }}
                    >
                      <EditIcon />
                    </Button>
                    <Button
                      className="delete-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        dispatch(deleteMeeting(meeting.id));
                      }}
                    >
                      <DeleteIcon />
                    </Button>
                  </Box>
                )}
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Paper className="single-meeting">
          <Typography variant="h5" gutterBottom>
            {selectedMeeting.title}
          </Typography>
          <Typography>
            <CalendarTodayIcon fontSize="small" /> {selectedMeeting.lessonDate}
          </Typography>
          <Typography>
            <AccessTimeIcon fontSize="small" />{" "}
            {selectedMeeting.startHour} - {selectedMeeting.endHour}
          </Typography>
          <Typography>
            👨‍🏫 קוד מורה: {selectedMeeting.teacherId}
          </Typography>
          <Typography>
            📖 {selectedMeeting.description}
          </Typography>
          <Typography>
            🏠 ש.ב: {selectedMeeting.homeWork}
          </Typography>
          {selectedMeeting.homeWorkFile && (
            <Typography>
              📂{" "}
              <Link
                href={selectedMeeting.homeWorkFile}
                target="_blank"
                rel="noopener"
              >
                קובץ ש.ב
              </Link>
            </Typography>
          )}
          {selectedMeeting.videoFiles?.length > 0 && (
            <Box mt={2}>
              <Typography variant="subtitle1">🎬 סרטונים:</Typography>
              <Box display="flex" flexWrap="wrap" gap={2}>
                {selectedMeeting.videoFiles.map((url, i) => (
                  <Box key={i} className="video-box">
                    <video
                      width="100%"
                      height="100%"
                      preload="metadata"
                      controls
                      controlsList="nodownload"
                      style={{ objectFit: "cover", cursor: "pointer" }}
                      onPlay={(e) => {
                        document
                          .querySelectorAll("video")
                          .forEach((v) => {
                            if (v !== e.target) v.pause();
                          });
                      }}
                    >
                      <source src={url} type="video/mp4" />
                      הדפדפן שלך לא תומך בניגון וידאו.
                    </video>
                  </Box>
                ))}
              </Box>
            </Box>
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

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>הוסף מפגש חדש</DialogTitle>
        <DialogContent className="form-content">
          <TextField
            name="title"
            label="כותרת"
            value={formData.title}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            name="lessonDate"
            label="תאריך"
            type="date"
            value={formData.lessonDate}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            name="startHour"
            label="שעת התחלה"
            type="time"
            value={formData.startHour}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            name="endHour"
            label="שעת סיום"
            type="time"
            value={formData.endHour}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            name="teacherId"
            label="קוד מורה"
            value={formData.teacherId}
            onChange={handleChange}
          />
          <TextField
            name="description"
            label="תיאור"
            multiline
            rows={3}
            value={formData.description}
            onChange={handleChange}
          />
          <TextField
            name="homeWork"
            label="שיעורי בית"
            multiline
            rows={2}
            value={formData.homeWork}
            onChange={handleChange}
          />
          <Typography variant="subtitle1">
            קובץ שיעורי בית
          </Typography>
          <Input
            type="file"
            name="homeWorkFile"
            onChange={handleChange}
          />
          <Typography variant="subtitle1">
            סרטונים
          </Typography>
          <Input
            type="file"
            name="videoFiles"
            onChange={handleChange}
            inputProps={{ multiple: true }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>ביטול</Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
          >
            שמור
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Meetings;


