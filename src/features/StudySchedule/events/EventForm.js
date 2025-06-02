
// import React, { useState, useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { addEvent } from "./EventsSlice";
// import { addEventApi } from "./Schedule_Api";
// import { data } from "react-router-dom";

// const EventForm = ({ onClose, event }) => {
//   const dispatch = useDispatch();
//   const [eventData, setEventData] = useState({
//     title: "",
//     start: new Date(),
//     end: new Date(),
//     importance: "1",
//     eventMessage: "",
//   });

//   useEffect(() => {
//     if (event) {
//       setEventData({
//         title: event.title,
//         start: new Date(event.start),
//         end: new Date(event.end),
//         importance: event.importance,
//         eventMessage: event.eventMessage,
//       });
//     }
//   }, [event]);

//   const handleChange = (e) => {
//     setEventData({ ...eventData, [e.target.name]: e.target.value });
//   };

//   const handleDateChange = (e) => {
//     const selectedDate = new Date(e.target.value);
//     setEventData({ ...eventData, start: selectedDate, end: selectedDate });
//   };

//   const handleSubmit = (e) => {
//   e.preventDefault();
//   const eventId = event ? event.id : Date.now();
//   const newEvent = { ...eventData, id: eventId, visible: true };

//   addEventApi(newEvent)
//     .then(data => {
//       console.log("Event added successfully:", data);
//       dispatch(addEvent(newEvent));
//       onClose();
//     })
//     .catch(e => {
//       alert("שגיאת שרת, נסה במועד מאוחר יותר");
//       console.error(e);
//     });
// };

//   return (
//     <form onSubmit={handleSubmit} style={{ background: "#eee", padding: "10px", borderRadius: "8px", marginBottom: "10px" }}>
//       <label>
//         כותרת:
//         <input type="text" name="title" value={eventData.title} onChange={handleChange} required />
//       </label>
//       <br />
//       <label>
//         פירוט אירוע:
//         <input type="text" name="eventMessage" value={eventData.eventMessage} onChange={handleChange} required />
//       </label>
//       <br />
//       <label>
//         תאריך:
//         <input type="date" name="start" value={eventData.start.toISOString().split('T')[0]} onChange={handleDateChange} required />
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
//       <button type="submit">✅ שמור אירוע</button>
//       <button type="button" onClick={onClose}>❌ ביטול</button>
//     </form>
//   );
// };

// export default EventForm;
// import React, { useState, useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { addEvent } from "./EventsSlice";
// import { addEventApi } from "./Schedule_Api";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addEvent, updateEvent } from "./EventsSlice";
import { addEventApi, updateEventApi } from "./Schedule_Api";

const EventForm = ({ onClose, event }) => {
  const dispatch = useDispatch();
  const [eventData, setEventData] = useState({
    title: "",
    type: "",
    start: "",
    end: "",
    importance: "1",
    eventMessage: "",
  });

  useEffect(() => {
    if (event) {
      setEventData({
        title: event.title || "",
        type: event.type || "",
        start: event.start
          ? (typeof event.start === "string"
              ? event.start.split('T')[0]
              : new Date(event.start).toISOString().split('T')[0])
          : "",
        end: event.end
          ? (typeof event.end === "string"
              ? event.end.split('T')[0]
              : new Date(event.end).toISOString().split('T')[0])
          : "",
        importance: event.importance || "1",
        eventMessage: event.eventMessage || "",
      });
    }
  }, [event]);

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (e) => {
    setEventData({ ...eventData, start: e.target.value, end: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const eventId = event && event._id ? event._id : Date.now();
    const newEvent = {
      _id: eventId,
      title: eventData.title,
      type: eventData.type,
      start: new Date(eventData.start).toISOString(),
      end: new Date(eventData.end).toISOString(),
      importance: eventData.importance,
      eventMessage: eventData.eventMessage,
      visible: true,
    };

    if (event && event._id) {
      updateEventApi(newEvent, newEvent._id)
        .then(data => {
          dispatch(updateEvent(newEvent));
          onClose();
        })
        .catch(e => {
          alert("שגיאת שרת, נסה במועד מאוחר יותר");
          console.error(e);
        });
    } else {
      addEventApi(newEvent)
        .then(data => {
          dispatch(addEvent(newEvent));
          onClose();
        })
        .catch(e => {
          alert("שגיאת שרת, נסה במועד מאוחר יותר");
          console.error(e);
        });
    }
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
        סוג אירוע:
        <select name="type" value={eventData.type} onChange={handleChange} required>
          <option value="">בחר סוג</option>
          <option value="הגשות">הגשות</option>
          <option value="מפגשים">מפגשים</option>
          <option value="זום">זום</option>
        </select>
      </label>
      <br />
      <label>
        תאריך:
        <input type="date" name="start" value={eventData.start} onChange={handleDateChange} required />
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
      <button type="submit">{event ? "עדכן אירוע" : "שמור אירוע"}</button>
      <button type="button" onClick={onClose}>❌ ביטול</button>
    </form>
  );
};

export default EventForm;