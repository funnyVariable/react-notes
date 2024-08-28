import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import NotesProvider from "./NotesContext";
import EditorProvider from "./EditorContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <NotesProvider>
      <EditorProvider>
        <App />
      </EditorProvider>
    </NotesProvider>
  </React.StrictMode>
);
