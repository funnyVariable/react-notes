import Notes from "./Notes";
import Editor from "./Editor";
import { useContext, useEffect, useState } from "react";
import { SliderContext } from "./SliderContext";
import github from "./github.svg";
import { EditorContext } from "./EditorContext";
import { NotesContext } from "./NotesContext";
import logo from "./logo.png";

// CSS
import "./Normalize.css";
import "./App.css";
import "./Notes.css";
import "./Editor.css";

function App() {
  const setHoldingSlider = useContext(SliderContext).setHoldingSlider;
  const slider = useContext(SliderContext).slider;
  const app = useContext(SliderContext).app;

  const tabs = useContext(EditorContext).tabs;
  const [toggle, setToggle] = useState(false);

  const notes = useContext(NotesContext).notes;
  const setNotes = useContext(NotesContext).setNotes;
  const generateNoteId = useContext(NotesContext).generateNoteId;
  const setCurrentNote = useContext(NotesContext).setCurrentNote;

  const setCurrentTabId = useContext(EditorContext).setCurrentTabId;
  const setTabs = useContext(EditorContext).setTabs;

  function newNote() {
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

  useEffect(() => {
    window.addEventListener("resize", () =>
      setToggle(window.innerWidth < 600 ? false : null)
    );
    return () =>
      window.removeEventListener(
        "resize",
        setToggle(window.innerWidth < 600 ? false : null)
      );
  }, []);

  return (
    <div className="app" ref={app}>
      {toggle && (
        <div className="overlay" onClick={() => setToggle(false)}></div>
      )}
      <Notes toggle={toggle} />
      <div
        className="slider"
        ref={slider}
        onMouseDown={() => setHoldingSlider((prev) => !prev)}
      >
        <span className="bars"></span>
      </div>
      {tabs.length === 0 ? (
        <>
          <div className="empty">
            <img src={logo} alt="logo" className="logo" />
            <h2>No notes selected</h2>
            <p>Select a note from notes menu to read or edit.</p>
            {toggle !== null && (
              <div className="add-note-mobile" onClick={newNote}>
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
      ) : (
        <Editor toggle={toggle} setToggle={setToggle} />
      )}
    </div>
  );
}

export default App;
