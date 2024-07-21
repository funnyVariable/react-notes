import { useContext } from "react";
import { NotesContext } from "./NotesContext";

export default function Notes() {
  const notes = useContext(NotesContext).notes;
  return (
    <div className="notes">
      {notes.map((note, key) => (
        <div key={key} date={note.date}>
          {note.title}
        </div>
      ))}
    </div>
  );
}
