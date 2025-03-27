import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//     inComingCalls: 9,
//     outGoingCalls: 5,
//     postponedCalls: 7
// }
// const callsDetailsSlice = createSlice({

//     name: "callsDetails",
//     initialState,
//     reducers: {
//         addInCalls: (state) => {
//             state.inComingCalls++;
//         },
//         addOutCalls: (state) => {
//             state.outGoingCalls++;
//         },
//         addPostponedCalls: (state) => {
//             state.postponedCalls++;
//         },
//     }
// })
export const { addInCalls, addOutCalls, addPostponedCalls } = callsDetailsSlice.actions;
export default callsDetailsSlice.reducer;