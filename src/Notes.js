import { useContext, useEffect, useRef } from "react";
import { NotesContext } from "./NotesContext";
import { EditorContext } from "./EditorContext";
import plus from "./plus.svg";
import xmark from "./xmark.svg";

export default function Notes({ toggle }) {
  const notes = useContext(NotesContext).notes;
  const setNotes = useContext(NotesContext).setNotes;
  const setCurrentNote = useContext(NotesContext).setCurrentNote;
  const notesRef = useRef(null);

  const tabs = useContext(EditorContext).tabs;
  const currentTabId = useContext(EditorContext).currentTabId;
  const setTabs = useContext(EditorContext).setTabs;
  const setCurrentTabId = useContext(EditorContext).setCurrentTabId;
  const doesTabExist = useContext(EditorContext).doesTabExist;
  const getTabIndexById = useContext(EditorContext).getTabIndexById;

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
    const nextTab = tabs[getTabIndexById(currentTabId) + 1]
      ? tabs[getTabIndexById(currentTabId) + 1]
      : tabs[getTabIndexById(currentTabId) - 1]
      ? tabs[getTabIndexById(currentTabId) - 1]
      : null;

    setNotes((prev) => prev.filter((note) => note.id !== id));
    setTabs((prev) => prev.filter((tab) => tab.id !== id));

    if (currentTabId === id && nextTab) {
      setCurrentTabId(nextTab.id);
      setCurrentNote(nextTab.note);
    }
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
    <div className={`notes${!toggle ? " collapsed" : ""}`} ref={notesRef}>
      {notes.map((note, key) => (
        <div
          key={key}
          className="note"
          date={note.date}
          onClick={() => selectNote(note)}
        >
          {note.title}
          <img
            src={xmark}
            alt=""
            onClick={(e) => {
              deleteNote(note.id);
              e.stopPropagation();
            }}
          />
        </div>
      ))}
      <div
        className="add-note"
        onClick={newNote}
        style={{ left: `${notesRef.current?.offsetWidth / 2}px` }}
      >
        <img src={plus} alt="" />
      </div>
    </div>
  );
}
