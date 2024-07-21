import { createContext, useState } from "react";

export const NotesContext = createContext(null);

export default function NotesProvider({ children }) {
  let noteArray = [];

  for (let i = 0; i < localStorage.length; i++) {
    if (localStorage.key(i).match(/note\d+/))
      noteArray.push(localStorage.getItem(localStorage.key(i)));
  }

  const [notes, setNotes] = useState(noteArray);
  console.log(notes);
  return (
    <NotesContext.Provider value={{ notes, setNotes }}>
      {children}
    </NotesContext.Provider>
  );
}
