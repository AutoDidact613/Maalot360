import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import EventForm from "../features/events/EventForm";
import { deleteEvent } from "../features/events/EventsSlice";
import { deleteUpdate } from "../features/uptade/UpdatesSlice";
import UpdateForm from "../features/uptade/UpdateForm";
import  "../App.css";
const localizer = momentLocalizer(moment);

function Events() {
  const dispatch = useDispatch();
   const updates = useSelector((state) => state.updates);

  const events = useSelector((state) => state.events.filter((event) => event.visible === true));
  const [showForm, setShowForm] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date()); 
  const [currentEvent, setCurrentEvent] = useState(null); 
  const [currentUpdate, setCurrentUpdate] = useState(null); 

  const deleteE = (id) => {
    dispatch(deleteEvent({ id }));
  };
  const deleteU = (id) => {
    dispatch(deleteUpdate({ id }));
  };
  

  const handleNavigate = (action) => {
    setCurrentDate((prevDate) => {
      const newDate = moment(prevDate).add(action === 'PREV' ? -1 : 1, 'weeks').toDate();
      return newDate;
    });
  };
  const CustomEvent = ({ event }) => {
    const eventStyles = {
      "הגשות": { background: "#87cefa" },
      "מפגשים": { background: "#1e90ff" },
      "זום": { background: "#6495ed" },
      "update": { background: "#ffcccb" }, // סגנון מותאם לעדכונים
    };
  
    const defaultStyle = { background: "#E0E0E0" };
    const style = eventStyles[event.type] || defaultStyle;
  
    return (
  
      <div style={{ padding: "6px", borderRadius: "1px", ...style }}>
  <span style={{ fontSize: event.type === "update" ? "0.8em" : "0.9em", color: "#333" }}>
    {event.title}
    <br />
    {event.eventMessage}

  </span>
  {/* <br /> */}
  <span style={{ fontSize: event.type === "update" ? "0.8em" : "0.6em", color: "#333" }}>
    {/* {event.type === "update" ? "🔄 עדכון: " : "📄 אירוע: "} */}
    {event.updateMessage}
  </span>
  <br />
  <button onClick={() => event.type === "update" ? deleteU(event.id) : deleteE(event.id)}>
    {event.type === "update" ? "מחיקת עדכון" : "מחיקת אירוע"}
  </button>
  {event.type === "update" ? (
  <button onClick={() => {
    setCurrentUpdate(event); 
    setShowUpdateForm(true);
  }}>
    עדכון
  </button>
) : (
  <button onClick={() => {
    setCurrentEvent(event); 
    setShowForm(true);
  }}>
    עדכון אירוע
  </button>
)}
    
</div>
    );
  };

  const combinedEvents = [
    ...events,
    ...updates.map(update => ({
      ...update,
      start: new Date(update.start), 
      end: new Date(update.end),     
      type: "update",                
    })),
  ];

  return (
    <div>
      <button className="add-button" onClick={() => setShowForm(true)}>➕ הוספת אירוע</button>
      {showForm && (
        <EventForm 
          onClose={() => setShowForm(false)} 
          event={currentEvent} 
        />
      )}
      {/* <br /> */}
  <button className="add-button" onClick={() => setShowUpdateForm(true)}>➕ הוספת עידכון</button>
      {showUpdateForm && (
        <UpdateForm 
          onClose={() => setShowUpdateForm(false)} 
          update={currentUpdate} 
        />
      )}
  
      <div style={{ height: "500px" }}>
        <Calendar
          localizer={localizer}
          events={combinedEvents} 
          startAccessor="start"
          endAccessor="end"
          style={{ height: "120%" }}
          rtl={true}
          components={{ event: CustomEvent }} // השתמש ב-CustomEvent להצגת שניהם
          date={currentDate} 
          onNavigate={(newDate) => setCurrentDate(newDate)} 
        />
      </div>
    </div>
  );
}

export default Events;