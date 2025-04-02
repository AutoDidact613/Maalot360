
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import EventForm from "../features/events/AddEventForm";
import { useDispatch } from "react-redux";
import { deleteEvent } from "../features/events/EventsSlice";

const localizer = momentLocalizer(moment);


function Events() {
  const dispatch = useDispatch();
  
  const events = useSelector((state) => state.events.filter((event) => event.visible === true));
  const [showForm, setShowForm] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date()); 

  const deleteE= (id) => {
    dispatch(deleteEvent({id}));
    
  const handleNavigate = (action) => {
    setCurrentDate((prevDate) => {
      const newDate = moment(prevDate).add(action === 'PREV' ? -1 : 1, 'weeks').toDate();
      return newDate;
    });
   
    };
    
  };
  const CustomEvent = ({ event }) => (
  
    <div style={{ padding: "2px", borderRadius: "3px", background: "#6890b1" }}>
      <span style={{ fontSize: "1em", color: "#333" }}>{event.title}</span> <br />
      <span style={{ fontSize: "0.8em", color: "#333" }}>📄{event.eventMessage}</span> <br />
      <span style={{ fontSize: "0.2em", fontWeight: "bold", color: "#1565c0" }}>{event.location}</span>
      <button onClick={()=>{deleteE(event.id)}} > מחיקת אירוע</button>
        
        
    </div>
    
  );
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
          date={currentDate} 
          onNavigate={(newDate) => setCurrentDate(newDate)} 

        />
      </div>
    </div>
  );
}

export default Events;