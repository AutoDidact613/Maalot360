
import { configureStore } from "@reduxjs/toolkit";

import eventReducer from "../features/events/EventsSlice";

export const store = configureStore({
    reducer: {
      // taskSlice:taskReducer,

        events: eventReducer
      },
    });
