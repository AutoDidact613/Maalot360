import { useSelector, useDispatch } from "react-redux";
import { fetchMeetings } from "../../../features/Nava/Meetings/MeetingsSlice";
import { useEffect, useState } from "react";
import styles from "./Meetings.module.css"; // משתמשים ב-CSS מודול

const Meetings = ({ courseId }) => {
  const dispatch = useDispatch();
  const meetings = useSelector((state) => state.meetings.meetings);
  const [selectedMeeting, setSelectedMeeting] = useState(null);

  useEffect(() => {
    if (courseId) {
      dispatch(fetchMeetings(courseId));
    }
  }, [dispatch, courseId]);

  const moveToMeet = (meeting) => {
    setSelectedMeeting(meeting);
  };

  return (
    <div className={styles["meetings-container"]}>
      <h2>מפגשים לקורס {courseId}</h2>
      {!selectedMeeting ? (
        <div className={styles["meetings-grid"]}>
          {meetings.map((meeting) => (
            <div
              key={meeting.id}
              onClick={() => moveToMeet(meeting)}
              className={styles["meeting-card"]}>
              <h3>{meeting.title}</h3>
              <p>📅 תאריך: {meeting.lessonDate}</p>
              <p>🕒 {meeting.startHour} - {meeting.endHour}</p>
              <p>📖 תוכן: {meeting.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles["meeting-details"]}>
          <h2>{selectedMeeting.title}</h2>
          <p>📅 תאריך: {selectedMeeting.lessonDate}</p>
          <p>🕒 {selectedMeeting.startHour} - {selectedMeeting.endHour}</p>
          <p>👨‍🏫 קוד מורה: {selectedMeeting.teacherId}</p>
          <p>📖 תוכן: {selectedMeeting.description}</p>
          <p>🏠 ש.ב: {selectedMeeting.homeWork}</p>
          {selectedMeeting.homeWorkFile && (
            <p>📂 <a href={selectedMeeting.homeWorkFile} target="_blank" rel="noopener noreferrer">קובץ ש.ב</a></p>
          )}
          <button onClick={() => setSelectedMeeting(null)} className={styles["close-button"]}>סגור</button>
        </div>
      )}
    </div>
  );
};

export default Meetings;
