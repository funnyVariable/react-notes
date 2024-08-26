import { createContext, useRef, useState } from "react";

export const NotesContext = createContext(null);

export default function NotesProvider({ children }) {
  let noteArray = [];

  for (let i = 0; i < localStorage.length; i++) {
    if (localStorage.key(i).match(/note\d+/)) {
      try {
        noteArray.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
      } catch {
        continue;
      }
    }
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
    return id;
  }

  function newNote(setTabs, setCurrentTabId) {
    const id = generateNoteId();
    const newNote = {
      title: "Untitled",
      text: "",
      id: id,
    };

    setNotes((prev) => [...prev, newNote]);
    setCurrentNote(newNote);

    setTabs((prev) => [...prev, { title: "Untitled", note: newNote, id: id }]);
    setCurrentTabId(id);
  }

  return (
    <NotesContext.Provider
      value={{
        notes,
        setNotes,
        newNote,
        currentNote,
        setCurrentNote,
        generateNoteId,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
}
