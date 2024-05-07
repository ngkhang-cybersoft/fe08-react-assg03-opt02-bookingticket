import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  tickets: [],
}

const rdcTicket = createSlice({
  name: 'rdcTicket',
  initialState,
  reducers: {
    addTicket: (state, {payload}) => {
      const { seat } = payload;
      
      let isExist = state.tickets.find((ticket) => ticket.soGhe === seat.soGhe);
      if(isExist) 
        state.tickets = state.tickets.filter((ticket) => ticket.soGhe !== seat.soGhe);
      else {
        state.tickets = [
          ...state.tickets,
          seat,
        ]
      }
    },
    delAllTicket: (state) =>{
      state.tickets = [];
    }
  }
});

export const {addTicket, delAllTicket } = rdcTicket.actions

export default rdcTicket.reducer;