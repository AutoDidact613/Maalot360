// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { addEvent } from "../events/EventsSlice";

// const AddEventForm = ({ date, onClose }) => {
//   const dispatch = useDispatch();
//   const defaultDate = date ? new Date(date) : new Date(); // תאריך ברירת מחדל אם date לא מוגדר

//   const [eventData, setEventData] = useState({
//     title: "",
//     start: defaultDate,
//     end: defaultDate,
//     importance: "1",
//     eventMessage: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setEventData((prev) => ({
//       ...prev,
//       [name]: name === "start" || name === "end" ? new Date(value) : value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(addEvent({ ...eventData, id: Date.now(), visible: true }));
//     onClose();
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         תאריך:
//         <input
//           type="date"
//           name="start"
//           value={eventData.start ? eventData.start.toISOString().split("T")[0] : ""}
//           onChange={handleChange}
//           required
//         />
//       </label>
//       <br />
//       <label>
//         כותרת:
//         <input type="text" name="title" value={eventData.title} onChange={handleChange} required />
//       </label>
//       <br />
//       <label>
//         הודעה:
//         <input type="text" name="eventMessage" value={eventData.eventMessage} onChange={handleChange} required />
//       </label>
//       <br />
//       <label>
//         חשיבות:
//         <select name="importance" value={eventData.importance} onChange={handleChange}>
//           <option value="1">נמוכה</option>
//           <option value="2">בינונית</option>
//           <option value="3">גבוהה</option>
//         </select>
//       </label>
//       <br />
//       <button type="submit">שמור אירוע</button>
//       <button type="button" onClick={onClose}>ביטול</button>
//     </form>
//   );
// };

// export default AddEventForm;
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addEvent } from "./EventsSlice";

const EventForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const [eventData, setEventData] = useState({
    title: "",
    start: new Date(),
    end: new Date(),
    importance: "1",
    eventMessage: "",
  });

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    setEventData({ ...eventData, start: selectedDate, end: selectedDate });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addEvent({ ...eventData, id: Date.now(), visible: true }));
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} style={{ background: "#eee", padding: "10px", borderRadius: "8px", marginBottom: "10px" }}>
      <label>
        כותרת:
        <input type="text" name="title" value={eventData.title} onChange={handleChange} required />
      </label>
      <br />
      <label>
        פירוט אירוע:
        <input type="text" name="eventMessage" value={eventData.eventMessage} onChange={handleChange} required />
      </label>
      <br />
      <label>
        תאריך:
        <input type="date" name="start" onChange={handleDateChange} required />
      </label>
      <br />
      <label>
        חשיבות:
        <select name="importance" value={eventData.importance} onChange={handleChange}>
          <option value="1">נמוכה</option>
          <option value="2">בינונית</option>
          <option value="3">גבוהה</option>
        </select>
      </label>
      <br />
      <button type="submit">✅ שמור אירוע</button>
      <button type="button" onClick={onClose}>❌ ביטול</button>
    </form>
  );
};

export default EventForm;