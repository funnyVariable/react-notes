import { useContext } from "react";
import { NotesContext } from "./NotesContext";
import { EditorContext } from "./EditorContext";

export default function Notes() {
  const notes = useContext(NotesContext).notes;
  const setNotes = useContext(NotesContext).setNotes;
  const setCurrentNote = useContext(NotesContext).setCurrentNote;

  const setTabs = useContext(EditorContext).setTabs;
  const setCurrentTab = useContext(EditorContext).setCurrentTab;
  const doesTabExist = useContext(EditorContext).doesTabExist;

  function selectNote(note) {
    setCurrentNote(note);
    setCurrentTab(note.id);
    doesTabExist(note)
      ? setCurrentTab(note.id)
      : setTabs((prev) => [
          ...prev,
          { title: note.title, note: note, id: note.id },
        ]);
  }
  function deleteNote(id) {
    setNotes((prev) => prev.filter((note) => note.id !== id));
    setTabs((prev) => prev.filter((tab) => tab.id !== id));
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
