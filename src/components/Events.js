import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import EventForm from "../features/events/EventForm";
import { deleteEvent } from "../features/events/EventsSlice";

const localizer = momentLocalizer(moment);

function Events() {
  const dispatch = useDispatch();
  
  const events = useSelector((state) => state.events.filter((event) => event.visible === true));
  const [showForm, setShowForm] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date()); 
  const [currentEvent, setCurrentEvent] = useState(null); 

  const deleteE = (id) => {
    dispatch(deleteEvent({ id }));
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
    };

    const defaultStyle = { background: "#E0E0E0" }; 
    const style = eventStyles[event.type] || defaultStyle;

    return (
      <div style={{ padding: "10px", borderRadius: "3px", ...style }}>
        <span style={{ fontSize: "1em", color: "#333" }}>{event.title}</span> <br />
        <span style={{ fontSize: "0.8em", color: "#333" }}>📄{event.eventMessage}</span> <br />
        <button onClick={() => deleteE(event.id)}>מחיקת אירוע</button>
        <button onClick={() => {
          setCurrentEvent(event);
          setShowForm(true);
        }}>עדכון אירוע</button>
      </div>
    );
  };

  return (
    <div>
      <button onClick={() => setShowForm(true)}>➕ הוספת אירוע</button>
      {showForm && (
        <EventForm 
          onClose={() => setShowForm(false)} 
          event={currentEvent} 
        />
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
          date={currentDate} 
          onNavigate={(newDate) => setCurrentDate(newDate)} 
        />
      </div>
    </div>
  );
}

export default Events;