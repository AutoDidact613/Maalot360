import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Grid, Typography } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import './Meetings.css';
import {
  fetchMeetings,
  addMeeting,
  updateMeeting,
  deleteMeeting,
} from "../Meetings/MeetingsSlice";

import MeetingCard from "./MeetingCard";
import MeetingForm from "./MeetingForm";
import MeetingDetails from "./MeetingDetails";

const Meetings = ({ courseId }) => {
  const dispatch = useDispatch();
  const allMeetings = useSelector((state) => state.meetings.meetings);

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
    existingHomeWorkFile: null,
    videoFiles: [],
    existingVideoFiles: [],
  });

  useEffect(() => {
    if (courseId) dispatch(fetchMeetings(courseId));
  }, [dispatch, courseId]);


  const meetings = Array.isArray(allMeetings) ? allMeetings.filter((m) => m.courseId === courseId) : [];

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "videoFiles") {
      setFormData((prev) => ({
        ...prev,
        videoFiles: Array.from(files),
      }));
    } else if (name === "homeWorkFile") {
      setFormData((prev) => ({
        ...prev,
        homeWorkFile: files[0] || null,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = () => {
    const updatedMeeting = {
      ...formData,
      id: formData.id || uuidv4(),
      homeWorkFile: formData.homeWorkFile
        ? URL.createObjectURL(formData.homeWorkFile)
        : formData.existingHomeWorkFile || null,
      videoFiles: [
        ...(formData.existingVideoFiles || []),
        ...formData.videoFiles.map((file) => URL.createObjectURL(file)),
      ],
      courseId,
    };

    if (editMode) dispatch(updateMeeting(updatedMeeting));
    else dispatch(addMeeting(updatedMeeting));

    setOpenDialog(false);
    setEditMode(false);
    resetForm();
  };

  const resetForm = () => {
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
      existingHomeWorkFile: null,
      existingVideoFiles: [],
    });
  };

  const handleEditMeeting = (meeting) => {
    setFormData({
      ...meeting,
      homeWorkFile: null,
      videoFiles: [],
      existingHomeWorkFile: meeting.homeWorkFile || null,
      existingVideoFiles: meeting.videoFiles || [],
    });
    setSelectedMeeting(null);
    setEditMode(true);
    setOpenDialog(true);
  };

  const handleDeleteExistingHomework = () => {
    setFormData((prev) => ({ ...prev, existingHomeWorkFile: null }));
  };

  const handleDeleteExistingVideo = (indexToDelete) => {
    setFormData((prev) => ({
      ...prev,
      existingVideoFiles: prev.existingVideoFiles.filter(
        (_, i) => i !== indexToDelete
      ),
    }));
  };

  return (
    <Box className="meetings-container">
      <Typography variant="h4" gutterBottom>
        מפגשים לקורס {courseId}
      </Typography>

      <Box className="add-button-wrapper">
        <Button className="manager-button" onClick={() => setUser("manager")}>
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
              <MeetingCard
                meeting={meeting}
                onSelect={setSelectedMeeting}
                onEdit={handleEditMeeting}
                onDelete={(id) => dispatch(deleteMeeting(id))}
                user={user}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <MeetingDetails
          meeting={selectedMeeting}
          onClose={() => setSelectedMeeting(null)}
        />
      )}

      <MeetingForm
        open={openDialog}
        onClose={() => {
          setOpenDialog(false);
          setEditMode(false);
        }}
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        editMode={editMode}
        onDeleteHomeworkFile={handleDeleteExistingHomework}
        onDeleteVideoFile={handleDeleteExistingVideo}
      />
    </Box>
  );
};

export default Meetings;
