// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//     textColor: "black",
//     bgColor: "pink",
//     fontSize: 16
// }
// const displaySettingsSlice = createSlice({

//     name: "displaySettings",
//     initialState,
//     reducers: {
//         changeToDarkMode: (state) => {
//             state.textColor = "pink";
//             state.bgColor = "black";
//         },
//         changeToLightMode: (state) => {
//             state.textColor = "black";
//             state.bgColor = "pink";
//         },
//         addFontSize: (state) => {
//             state.fontSize++;
//         },
//         subFontSize: (state) => {
//             state.fontSize--;
//         },
//         changeBackgroundColor: (state, action) => {
//             const value = action.payload;
//             state.bgColor = value;

//         }

//     }
// })
// export const { changeToDarkMode, changeToLightMode, addFontSize, subFontSize, changeBackgroundColor } = displaySettingsSlice.actions;
// export default displaySettingsSlice.reducer;