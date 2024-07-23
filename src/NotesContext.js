import { createContext, useState } from "react";

export const NotesContext = createContext(null);

export default function NotesProvider({ children }) {
  let noteArray = [];

  for (let i = 0; i < localStorage.length; i++) {
    if (localStorage.key(i).match(/note\d+/))
      noteArray.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
  }

  const [notes, setNotes] = useState(noteArray);
  const [currentNote, setCurrentNote] = useState(null);
  console.log(currentNote);
  return (
    <NotesContext.Provider
      value={{ notes, setNotes, currentNote, setCurrentNote }}
    >
      {children}
    </NotesContext.Provider>
  );
}
