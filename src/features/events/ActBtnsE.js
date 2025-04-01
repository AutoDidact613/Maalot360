// import React, { useState } from "react";
// import AddEventForm from "../events/AddEventForm";

// const ActBtns = ({ date }) => {
//   const [showForm, setShowForm] = useState(false);
//   const defaultDate = date ? new Date(date) : new Date(); // ודא שהתאריך תמיד מוגדר

//   return (
//     <div>
//       {!showForm ? (
//         <button onClick={() => setShowForm(true)}>הוספת אירוע</button>
//       ) : (
//         <AddEventForm date={defaultDate} onClose={() => setShowForm(false)} />
//       )}
//     </div>
//   );
// };

// export default ActBtns;