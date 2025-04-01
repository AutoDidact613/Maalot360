// import React, { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { Calendar, momentLocalizer } from "react-big-calendar";
// import moment from "moment";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import { addEvent } from "../features/events/EventsSlice";

// const localizer = momentLocalizer(moment);

// const CustomEvent = ({ event }) => (
//   <div style={{ padding: "2px", borderRadius: "3px", background: "#6890b1" }}>
//     <span style={{ fontSize: "1em", color: "#333" }}>{event.title}</span> <br />
//     <span style={{ fontSize: "0.8em", color: "#333" }}>📄{event.eventMessage}</span> <br />
//     <span style={{ fontSize: "0.2em", fontWeight: "bold", color: "#1565c0" }}>{event.location}</span>
//   </div>
// );

// function Events() {
//   const events = useSelector((state) => state.events.filter((event) => event.visible === true));
//   const dispatch = useDispatch();
//   const [showForm, setShowForm] = useState(false);
//   const [eventData, setEventData] = useState({
//     title: "",
//     start: new Date(),
//     end: new Date(),
//     importance: "1",
//     eventMessage: "",
//   });

//   const handleChange = (e) => {
//     setEventData({ ...eventData, [e.target.name]: e.target.value });
//   };

//   const handleDateChange = (e) => {
//     const selectedDate = new Date(e.target.value);
//     setEventData({ ...eventData, start: selectedDate, end: selectedDate });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(addEvent({ ...eventData, id: Date.now(), visible: true }));
//     setShowForm(false);
//   };

//   return (
//     <div>
//   {/* {user.role === 'admin' && ( */}
//   <button onClick={() => setShowForm(true)}>➕ הוספת אירוע</button>
// {/* )} */}
//       {showForm && (
//         <form onSubmit={handleSubmit} style={{ background: "#eee", padding: "10px", borderRadius: "8px", marginBottom: "10px" }}>
//           <label>
//             כותרת:
//             <input type="text" name="title" value={eventData.title} onChange={handleChange} required />
//           </label>
//           <br />
//           <label>
//             תאריך:
//             <input type="date" name="start" onChange={handleDateChange} required />
//           </label>
//           <br />
//           <label>
//             הודעה:
//             <input type="text" name="eventMessage" value={eventData.eventMessage} onChange={handleChange} required />
//           </label>
//           <br />
//           <label>
//             חשיבות:
//             <select name="importance" value={eventData.importance} onChange={handleChange}>
//               <option value="1">נמוכה</option>
//               <option value="2">בינונית</option>
//               <option value="3">גבוהה</option>
//             </select>
//           </label>
//           <br />
//           <button type="submit">✅ שמור אירוע</button>
//           <button type="button" onClick={() => setShowForm(false)}>❌ ביטול</button>
//         </form>
//       )}

//       <div style={{ height: "500px" }}>
//         <Calendar
//           localizer={localizer}
//           events={events}
//           startAccessor="start"
//           endAccessor="end"
//           style={{ height: "120%" }}
//           rtl={true}
//           components={{ event: CustomEvent }}
//         />
//       </div>
//     </div>
//   );
// }

// export default Events;
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import EventForm from "../features/events/AddEventForm"; 

const localizer = momentLocalizer(moment);
const CustomEvent = ({ event }) => (
  <div style={{ padding: "2px", borderRadius: "3px", background: "#6890b1" }}>
    <span style={{ fontSize: "1em", color: "#333" }}>{event.title}</span> <br />
    <span style={{ fontSize: "0.8em", color: "#333" }}>📄{event.eventMessage}</span> <br />
    <span style={{ fontSize: "0.2em", fontWeight: "bold", color: "#1565c0" }}>{event.location}</span>
  </div>
);

function Events() {
  const events = useSelector((state) => state.events.filter((event) => event.visible === true));
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      <button onClick={() => setShowForm(true)}>➕ הוספת אירוע</button>
      {showForm && (
        <EventForm onClose={() => setShowForm(false)} /> 
      )}

      <div style={{ height: "500px" }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "120%" }}
          rtl={true}
          components={{ event: CustomEvent }}
        />
      </div>
    </div>
  );
}

export default Events;