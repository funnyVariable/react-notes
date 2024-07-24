import { useContext } from "react";
import { NotesContext } from "./NotesContext";
import { EditorContext } from "./EditorContext";

export default function Notes() {
  const notes = useContext(NotesContext).notes;
  const setCurrentNote = useContext(NotesContext).setCurrentNote;
  const doesTabExist = useContext(EditorContext).doesTabExist;
  const setCurrentTab = useContext(EditorContext).setCurrentTab;
  const setTabs = useContext(EditorContext).setTabs;

  function selectNote(note) {
    setCurrentNote(note);
    doesTabExist(note)
      ? setCurrentTab(note.id)
      : setTabs((prev) => [
          ...prev,
          { title: note.title, note: note, id: note.id },
        ]);

    setCurrentTab(note.id);
  }

  return (
    <div className="notes">
      {notes.map((note, key) => (
        <div key={key} date={note.date} onClick={() => selectNote(note)}>
          {note.title}
        </div>
      ))}
    </div>
  );
}
