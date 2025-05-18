import { Card, CardContent, Typography, Box, Button } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import InfoIcon from "@mui/icons-material/Info";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const MeetingCard = ({ meeting, onSelect, onEdit, onDelete, user }) => {
  return (
    <Card className="meeting-card" onClick={() => onSelect(meeting)}>
      <CardContent className="meeting-card-content">
        <Typography component="h3" className="meeting-title">{meeting.title}</Typography>
        <Box className="meeting-row">
          <CalendarTodayIcon fontSize="small" />
          <Typography variant="body2">{meeting.lessonDate}</Typography>
        </Box>
        <Box className="meeting-row">
          <AccessTimeIcon fontSize="small" />
          <Typography variant="body2">{meeting.startHour} - {meeting.endHour}</Typography>
        </Box>
        <Box className="meeting-row">
          <InfoIcon fontSize="small" />
          <Typography variant="body2">{meeting.description}</Typography>
        </Box>
      </CardContent>

      {user === "manager" && (
        <Box className="button-group">
          <Button className="edit-btn" onClick={(e) => { e.stopPropagation(); onEdit(meeting); }}>
            <EditIcon />
          </Button>
          <Button
            className="delete-btn"
            onClick={(e) => {
              e.stopPropagation();
              if (window.confirm("האם את בטוחה שברצונך למחוק את המפגש?")) {
                onDelete(meeting.id);
              }
            }}
          >
            <DeleteIcon />
          </Button>

        </Box>
      )}
    </Card>
  );
};

export default MeetingCard;
