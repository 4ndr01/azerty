import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {AppProvider} from "./context/appContext";
import {BrowserRouter, Route, Routes, useNavigate} from "react-router-dom";
import {AppContext} from "./context/appContext";
import Login from "./route/login";
import PrivateRoute from "./route/private_route";

const isAuthenticated = true; // Remplacez par votre logique d'authentification réelle


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


reportWebVitals();
