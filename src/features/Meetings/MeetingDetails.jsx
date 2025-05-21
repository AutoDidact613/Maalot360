import { Paper, Typography, Box, Button, Link } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const MeetingDetails = ({ meeting, onClose }) => {
  return (
    <Paper className="single-meeting">
      <Typography variant="h5" gutterBottom>{meeting.title}</Typography>
      <Typography>
        <CalendarTodayIcon fontSize="small" /> {meeting.lessonDate}
      </Typography>
      <Typography>
        <AccessTimeIcon fontSize="small" /> {meeting.startHour} - {meeting.endHour}
      </Typography>
      <Typography>👨‍🏫 קוד מורה: {meeting.teacherId}</Typography>
      <Typography>📖 {meeting.description}</Typography>
      <Typography>🏠 ש.ב: {meeting.homeWork}</Typography>

      {meeting.homeWorkFile && (
        <Typography>
          📂 <Link href={meeting.homeWorkFile} target="_blank" rel="noopener">קובץ ש.ב</Link>
        </Typography>
      )}

      {meeting.videoFiles?.length > 0 && (
        <Box mt={2}>
          <Typography variant="subtitle1">🎬 סרטונים:</Typography>
          <Box display="flex" flexWrap="wrap" gap={2}>
            {meeting.videoFiles.map((url, i) => (
              <Box key={i} className="video-box">
                <video
                  width="100%"
                  height="100%"
                  preload="metadata"
                  controls
                  controlsList="nodownload"
                  style={{ objectFit: "cover", cursor: "pointer" }}
                  onPlay={(e) => {
                    document.querySelectorAll("video").forEach((v) => {
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
        <Button variant="contained" color="primary" onClick={onClose}>
          סגור
        </Button>
      </Box>
    </Paper>
  );
};

export default MeetingDetails;
