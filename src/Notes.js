import { useContext } from "react";
import { NotesContext } from "./NotesContext";
import { EditorContext } from "./EditorContext";
import plus from "./plus.svg";

export default function Notes() {
  const notes = useContext(NotesContext).notes;
  const setNotes = useContext(NotesContext).setNotes;
  const setCurrentNote = useContext(NotesContext).setCurrentNote;

  const tabs = useContext(EditorContext).tabs;

  const setTabs = useContext(EditorContext).setTabs;
  const setCurrentTabId = useContext(EditorContext).setCurrentTabId;
  const doesTabExist = useContext(EditorContext).doesTabExist;

  function selectNote(note) {
    setCurrentNote(note);
    setCurrentTabId(note.id);
    doesTabExist(note)
      ? setCurrentTabId(note.id)
      : setTabs((prev) => [
          ...prev,
          { title: note.title, note: note, id: note.id },
        ]);
  }
  function deleteNote(id) {
    setNotes((prev) => prev.filter((note) => note.id !== id));
    setTabs((prev) => prev.filter((tab) => tab.id !== id));
  }
  function newNote() {
    const newNote = {
      title: "Untitled",
      text: "",
      id: notes.length + 1,
    };
    setNotes((prev) => [...prev, newNote]);
    setCurrentNote(newNote);
    setCurrentTabId(notes.length + 1);
    setTabs((prev) => [
      ...prev,
      { title: "Untitled", note: newNote, id: notes.length + 1 },
    ]);
  }

  return (
    <div className="notes">
      {notes.map((note, key) => (
        <div
          key={key}
          className="note"
          date={note.date}
          onClick={() => selectNote(note)}
        >
          {note.title}
        </div>
      ))}
      <div className="add-note" onClick={newNote}>
        <img src={plus} alt="" />
      </div>
    </div>
  );
}
