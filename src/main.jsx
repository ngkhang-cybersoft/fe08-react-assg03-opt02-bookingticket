import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/scss/index.scss";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Booking from "./pages/Booking/Booking";
import Page404 from "./pages/Page404/Page404";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Home from './pages/Home/Home';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/booking/:movieSlug" element={<Booking />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
