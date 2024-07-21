import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import SliderProvider from "./SliderContext";
import NotesProvider from "./NotesContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <SliderProvider>
      <NotesProvider>
        <App />
      </NotesProvider>
    </SliderProvider>
  </React.StrictMode>
);
