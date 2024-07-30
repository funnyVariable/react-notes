import { createContext, useRef, useState } from "react";

export const NotesContext = createContext(null);

export default function NotesProvider({ children }) {
  let noteArray = [];

  for (let i = 0; i < localStorage.length; i++) {
    if (localStorage.key(i).match(/note\d+/))
      noteArray.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
  }

  const [notes, setNotes] = useState(noteArray);
  const [currentNote, setCurrentNote] = useState(null);
  const noteIdArray = useRef(noteArray.map((ele) => ele.id));

  function generateNoteId() {
    let id = 1;
    while (noteIdArray.current.includes(id)) {
      id++;
    }
    noteIdArray.current.push(id);
    console.log(noteIdArray.current);
    return id;
  }

  return (
    <NotesContext.Provider
      value={{ notes, setNotes, currentNote, setCurrentNote, generateNoteId }}
    >
      {children}
    </NotesContext.Provider>
  );
}
