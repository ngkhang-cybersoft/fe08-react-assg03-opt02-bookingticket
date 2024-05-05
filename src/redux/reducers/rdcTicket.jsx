import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  tickets: [],
}

const rdcTicket = createSlice({
  name: 'rdcTicket',
  initialState,
  reducers: {
    addTicket: (state, {payload}) => {
      // 
    }
  }
});

export const {addTicket, } = rdcTicket.actions

export default rdcTicket.reducer;