import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {AppProvider} from "./context/appContext";
import {BrowserRouter, Route, Routes, useNavigate} from "react-router-dom";
import {AppContext} from "./context/appContext";
import Login from "./route/login";



ReactDOM.render(
  <React.StrictMode>
    <AppProvider />
      <BrowserRouter>
          <Routes>
                <Route path="/login" element={<Login />} />


          </Routes>
      </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
