import { configureStore } from '@reduxjs/toolkit';
import rdcTicket from './reducers/rdcTicket';

export const store = configureStore({
  reducer: {
    rdcTicket,
  },
})
