// import React, { useState } from 'react'
// import { useDispatch } from 'react-redux'
// import { changeToDarkMode, changeToLightMode, addFontSize, subFontSize, changeBackgroundColor } from "./displaySettingsSlice"
// const DisplaySettingsBtns = () => {
//   const [bgColorr, setBgcolorr] = useState("");
//   const dispatch = useDispatch();
//   return (
//     <div>
//       <button onClick={() => { dispatch(changeToDarkMode()) }}>כהה</button>
//       <button onClick={() => { dispatch(changeToLightMode()) }}>בהיר</button>
//       <button onClick={() => { dispatch(addFontSize()) }}>A+</button>
//       <button onClick={() => { dispatch(subFontSize()) }}>A-</button>
//       <input type='text' placeholder='הכנס צבע רקע' value={bgColorr} onChange={(e) => { setBgcolorr(e.target.value) }} />
//       <div>
//         <button onClick={() => { dispatch(changeBackgroundColor(bgColorr)) }}>שנה צבע רקע</button>
//       </div>
//     </div>

//   )
// }

// export default DisplaySettingsBtns
