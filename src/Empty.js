import logo from "./logo.png";
import github from "./github.svg";
import { useContext } from "react";
import { NotesContext } from "./NotesContext";
import { EditorContext } from "./EditorContext";

export default function Empty({ toggle, setToggle }) {
  const newNote = useContext(NotesContext).newNote;

  const setTabs = useContext(EditorContext).setTabs;
  const setCurrentTabId = useContext(EditorContext).setCurrentTabId;

  return (
    <>
      <div className="empty">
        <img src={logo} alt="logo" className="logo" />
        <h2>No notes selected</h2>
        <p>Select a note from notes menu to read or edit.</p>
        {toggle !== null && (
          <div
            className="add-note-mobile"
            onClick={() => newNote(setTabs, setCurrentTabId)}
          >
            <span className="plus"></span>
            <p>Create a new note</p>
          </div>
        )}

        <div className="credits">
          <a href="https://www.github.com/uhmdkhms/react-notes">
            <img src={github} alt="github" />
            <p>Source code</p>
          </a>
          <p>
            Logo designed by{" "}
            <a href="https://www.instagram.com/abdelwahab_desn">
              Abdulwahab Ahmed
            </a>
          </p>
        </div>
      </div>
      {!toggle && toggle !== null && (
        <div className="menu-toggle-widget" onClick={() => setToggle(true)}>
          <span className="bars"></span>
        </div>
      )}
    </>
  );
}
