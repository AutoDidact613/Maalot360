import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const MeetingForm = ({
  open,
  onClose,
  formData,
  onChange,
  onSubmit,
  editMode,
  onDeleteHomeworkFile,
  onDeleteVideoFile,
}) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{editMode ? "ערוך מפגש" : "הוסף מפגש חדש"}</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          name="title"
          label="כותרת"
          fullWidth
          value={formData.title}
          onChange={onChange}
        />
        <TextField
          margin="dense"
          name="lessonDate"
          label="תאריך שיעור"
          type="date"
          fullWidth
          InputLabelProps={{ shrink: true }}
          value={formData.lessonDate}
          onChange={onChange}
        />
        <TextField
          margin="dense"
          name="startHour"
          label="שעת התחלה"
          type="time"
          fullWidth
          InputLabelProps={{ shrink: true }}
          value={formData.startHour}
          onChange={onChange}
        />
        <TextField
          margin="dense"
          name="endHour"
          label="שעת סיום"
          type="time"
          fullWidth
          InputLabelProps={{ shrink: true }}
          value={formData.endHour}
          onChange={onChange}
        />
        <TextField
          margin="dense"
          name="description"
          label="תיאור"
          fullWidth
          multiline
          value={formData.description}
          onChange={onChange}
        />
        <TextField
          margin="dense"
          name="teacherId"
          label="מזהה מורה"
          fullWidth
          value={formData.teacherId}
          onChange={onChange}
        />
        <TextField
          margin="dense"
          name="homeWork"
          label="עבודת בית"
          fullWidth
          value={formData.homeWork}
          onChange={onChange}
        />
        <input
          type="file"
          name="homeWorkFile"
          onChange={onChange}
          accept=".pdf,.doc,.docx"
        />

        {formData.existingHomeWorkFile && (
          <>
            <Typography>עבודת בית קיימת:</Typography>
            <a
              href={formData.existingHomeWorkFile}
              target="_blank"
              rel="noopener noreferrer"
            >
              צפייה
            </a>
            <Button
              onClick={() => {
                if (window.confirm("האם את בטוחה שברצונך למחוק את עבודת הבית?")) {
                  onDeleteHomeworkFile();
                }
              }}
            >
              מחקי קובץ
            </Button>
          </>
        )}

        <input
          type="file"
          name="videoFiles"
          multiple
          onChange={onChange}
          accept="video/*"
        />

        {formData.existingVideoFiles && formData.existingVideoFiles.length > 0 && (
          <>
            <Typography>סרטונים קיימים:</Typography>
            <List>
              {formData.existingVideoFiles.map((video, index) => (
                <ListItem key={index}>
                  <ListItemText>
                    <a href={video} target="_blank" rel="noopener noreferrer">
                      צפייה בסרטון {index + 1}
                    </a>
                  </ListItemText>
                  <Button
                    onClick={() => {
                      if (window.confirm("האם את בטוחה שברצונך למחוק את הסרטון?")) {
                        onDeleteVideoFile(index);
                      }
                    }}
                  >
                    מחקי סרטון
                  </Button>
                </ListItem>
              ))}
            </List>
          </>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>ביטול</Button>
        <Button onClick={onSubmit} variant="contained" color="primary">
          {editMode ? "שמור שינויים" : "הוסף"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MeetingForm;
