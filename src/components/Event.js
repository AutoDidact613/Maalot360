import React from "react";
 import { useSelector } from "react-redux";
 import { Calendar, momentLocalizer } from "react-big-calendar";
 import moment from "moment";
 import "react-big-calendar/lib/css/react-big-calendar.css";
 const localizer = momentLocalizer(moment);
 
//  נותן אפשרות להציג לא רק את הtitly
 const CustomEvent = ({ event }) => (
  <div style={{
     padding: "2px", borderRadius: "3px",
     background: "#6890b1 ",
     
    // border: "1px solid #90caf9"
  }}>
    <span style={{ fontSize: "1em", color: "#333" }}>{event.title}</span> <br />
    <span style={{ fontSize: "0.8em", color: "#333" }}>📄{event.eventMessage}</span> <br />
    <span style={{ fontSize: "0.2em", fontWeight: "bold", color: "#1565c0" }}> {event.location}</span>
  </div>
);
 
 function Event() {
   const events = useSelector((state) => state.events.filter(event => event.visible === true)
  );
 
   return (
     <div>
       <div style={{ height: "500px" }}>
         <Calendar
           localizer={localizer}
           events={events}
          //  startAccessor="start"
          //  endAccessor="end"
           style={{ height: "120%" }}
           rtl={true}
           components={{ event: CustomEvent }}
         />
       </div>
     </div>
   );
 }
 
 export default Event;