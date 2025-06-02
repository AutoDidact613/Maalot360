import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addUpdate, updateUpdate } from "./UpdatesSlice";
import { addUpdateApi,  updateUpdateApi } from "../events/Schedule_Api"; // ודאי שיש לך קובץ כזה

const UpdateForm = ({ onClose, update }) => {
  const dispatch = useDispatch();
  const [updateData, setUpdateData] = useState({
    title: "",
    start: "",
    end: "",
    updateMessage: "",
  });

  
useEffect(() => {
  // מילוי הטופס כשיש עדכון לעריכה
  if (update) {
    setUpdateData({
      title: update.title || "",
      start: typeof update.start === "string"
        ? update.start.split('T')[0]
        : new Date(update.start).toISOString().split('T')[0],
      end: typeof update.end === "string"
        ? update.end.split('T')[0]
        : new Date(update.end).toISOString().split('T')[0],
      updateMessage: update.updateMessage || "",
    });
  }
}, [update]);

  const handleChange = (e) => {
    setUpdateData({ ...updateData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (e) => {
    setUpdateData({ ...updateData, start: e.target.value, end: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updateId = update && update._id ? update._id : Date.now();
    const newUpdate = {
      _id: updateId,
      title: updateData.title,
      start: new Date(updateData.start).toISOString(),
      end: new Date(updateData.end).toISOString(),
      updateMessage: updateData.updateMessage,
    };
if (update && update._id) {
  // עדכון קיים
  updateUpdateApi(newUpdate._id, newUpdate)
    .then(data => {
      dispatch(updateUpdate(newUpdate));
      onClose();
    })
    .catch(e => {
      alert("שגיאת שרת, נסה שוב מאוחר יותר");
      console.error(e);
    });
} else {
  // הוספה חדשה
  addUpdateApi(newUpdate)
    .then(data => {
      dispatch(addUpdate(newUpdate));
      onClose();
    })
    .catch(e => {
      alert("שגיאת שרת, נסה שוב מאוחר יותר");
      console.error(e);
    });
}
  };

  return (
    <form onSubmit={handleSubmit} style={{ background: "#eee", padding: "10px", borderRadius: "8px", marginBottom: "10px" }}>
      <label>
        עידכון:
        <input type="text" name="title" value={updateData.title} onChange={handleChange} required />
      </label>
      <br />
      <label>
        פירוט עידכון
        <input type="text" name="updateMessage" value={updateData.updateMessage} onChange={handleChange} required />
      </label>
      <br />
      <label>
        תאריך:
        <input
          type="date"
          name="start"
          value={updateData.start}
          onChange={handleDateChange}
          required
        />
      </label>
      <br />
      <button type="submit">✅ שמור עידכון</button>
      <button type="button" onClick={onClose}>❌ ביטול</button>
    </form>
  );
};

export default UpdateForm;