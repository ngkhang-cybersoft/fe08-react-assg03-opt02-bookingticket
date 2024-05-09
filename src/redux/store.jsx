import { configureStore } from "@reduxjs/toolkit";
import rdcTicket from "./reducers/rdcTicket";
import rdcToast from "./reducers/rdcToast";

export const store = configureStore({
  reducer: {
    rdcTicket,
    rdcToast,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
