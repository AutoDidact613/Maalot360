import { configureStore } from "@reduxjs/toolkit";

import eventReducer from "../features/events/EventsSlice";

export const store = configureStore({
    reducer: {
        events: eventReducer
      },
    });
export default store;