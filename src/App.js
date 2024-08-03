import Notes from "./Notes";
import Editor from "./Editor";
import { useContext, useEffect, useState } from "react";
import { SliderContext } from "./SliderContext";
import bars from "./bars.svg";
import bars2 from "./bars2.svg";
import plus from "./plus.svg";

// CSS
import "./Normalize.css";
import "./App.css";
import "./Notes.css";
import "./Editor.css";
import { EditorContext } from "./EditorContext";
import { NotesContext } from "./NotesContext";

function App() {
  const setHoldingSlider = useContext(SliderContext).setHoldingSlider;
  const slider = useContext(SliderContext).slider;
  const app = useContext(SliderContext).app;

  const tabs = useContext(EditorContext).tabs;
  const [toggle, setToggle] = useState(null);

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
        <img src={bars} alt="" />
      </div>
      {tabs.length === 0 ? (
        <>
          <div className="empty">
            <h2>No notes selected</h2>
            <p>Select a note from notes menu to read or edit.</p>
            {toggle !== null && (
              <div className="add-note-mobile" onClick={newNote}>
                <img src={plus} alt="" />
                <p>Create a new note</p>
              </div>
            )}
          </div>
          {!toggle && toggle !== null && (
            <div className="menu-toggle-widget" onClick={() => setToggle(true)}>
              <img src={bars2} alt="" />
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
