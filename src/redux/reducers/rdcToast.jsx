import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toast: {
    isShow: false,
    autoClose: 4000,
    handleDirect: undefined,
    className: "",
    content: {
      title: "Thanh toán",
      message: "",
    },
    isSuccess: false,
  },
};

const rdcTicket = createSlice({
  name: "rdcToast",
  initialState,
  reducers: {
    setConfig: (state, { payload }) => {
      state.toast = payload;
    },
  },
});

export const { setConfig } = rdcTicket.actions;

export default rdcTicket.reducer;
