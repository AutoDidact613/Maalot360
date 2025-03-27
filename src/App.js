// import logo from './logo.svg';
// import './App.css';
// import CurrentCall from './features/callLog/CurrentCall';
// import CallsButtons from './features/callsDetails/CallsButtons';
// import DisplaySettingsBtns from './features/displaySettings/DisplaySettingsBtns';
// import CallsDetails from './features/callsDetails/CallsDetailss';
// import { useSelector } from 'react-redux';

// function App() {

//   const fSize = useSelector((state) => state.displaySettings.fontSize);
//   const bgColor = useSelector((state) => state.displaySettings.bgColor)
//   const textColor = useSelector((state) => state.displaySettings.textColor)

//   return (
//     <div className="App">
//       <div id="phone_screem" style={{ width: "30vw", margin: "auto", fontSize: fSize + "px", color: textColor, backgroundColor: bgColor }}>
//         <h1>הפלאפון שלי</h1>
//         <CallsDetails />
//         <CurrentCall />

//         <CallsButtons />
//         <DisplaySettingsBtns />
//       </div>
//     </div>
//   );
// }

// export default App;
// import React, { useState } from "react";
// import { Calendar, momentLocalizer } from "react-big-calendar";
// import moment from "moment";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import  EventList from  "../src/features/events/EventList";

// // הגדרת אזור זמן מבוסס Moment.js
// const localizer = momentLocalizer(moment);
// function App(){
//   return (
//     <div style={{ height: "500px" }}>
//       <Calendar
//         localizer={localizer}
//         events={EventList}
//         startAccessor="start"
//         endAccessor="end"
//         style={{ height: "100%" }}
//       />
//     </div>
//   );
// }
// const MyCalendar = () => {
//   // רשימת אירועים לדוגמה
//   const [events, setEvents] = useState([
//     {
//       title: "פגישה חשובה",
//       start: new Date(2025, 2, 11, 10, 0), // 11 במרץ 2025, 10:00
//       end: new Date(2025, 2, 11, 12, 0),
//     },
//     {
//       title: "ארוחת צהריים",
//       start: new Date(2025, 2, 12, 13, 0),
//       end: new Date(2025, 2, 12, 14, 0),
//     },
//   ]);

 // App.js
 import React from "react";
 import "./App.css"; 

 import "react-big-calendar/lib/css/react-big-calendar.css";
 import Event from "../src/Components/Event"
 
 function App() {

 
   return (
    <div>
       
         <Event></Event>
  
     </div>
    );
 }
 
 export default App;
 