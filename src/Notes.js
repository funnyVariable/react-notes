import { useContext } from "react";
import { NotesContext } from "./NotesContext";

export default function Notes() {
  const notes = useContext(NotesContext).notes;
  const setCurrentNote = useContext(NotesContext).setCurrentNote;

  return (
    <div className="notes">
      {notes.map((note, key) => (
        <div key={key} date={note.date} onClick={() => setCurrentNote(note)}>
          {note.title}
        </div>
      ))}
    </div>
  );
}
