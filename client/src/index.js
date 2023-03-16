import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {AppProvider} from "./context/appContext";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ChatRoom from "./route/ChatRoom";

ReactDOM.render(
  <React.StrictMode>
    <AppProvider />
      <BrowserRouter>
          <Routes>
              <Route exact path="/:roomId" component={ChatRoom} />
          </Routes>
      </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
