import { useContext, useEffect, useRef, useState } from "react";
import xmark from "./xmark.svg";
import { NotesContext } from "./NotesContext";
import { EditorContext } from "./EditorContext";

export default function Editor({ toggle, setToggle }) {
  const editor = useRef(null);
  const tabBar = useRef(null);

  const notes = useContext(NotesContext).notes;
  const setNotes = useContext(NotesContext).setNotes;
  const currentNote = useContext(NotesContext).currentNote;
  const setCurrentNote = useContext(NotesContext).setCurrentNote;
  const generateNoteId = useContext(NotesContext).generateNoteId;

  const tabs = useContext(EditorContext).tabs;
  const setTabs = useContext(EditorContext).setTabs;
  const currentTabId = useContext(EditorContext).currentTabId;
  const setCurrentTabId = useContext(EditorContext).setCurrentTabId;
  const getTabIndexById = useContext(EditorContext).getTabIndexById;
  const getTabById = useContext(EditorContext).getTabById;
  const currentTab = getTabById(currentTabId);
  const isTabUnsaved = useContext(EditorContext).isTabUnsaved;

  const [currentInput, setCurrentInput] = useState(
    currentTab ? currentTab.input : ""
  );

  function save() {
    const id = currentNote ? currentNote.id : generateNoteId();

    const date = new Date();
    const timeStamp = `${date.getFullYear()}/${
      date.getMonth() + 1
    }/${date.getDate()}`;
    const newNote = {
      title: currentInput === "" ? "Untitled" : currentInput.split("\n")[0],
      text: currentInput,
      date: timeStamp,
      id: id,
    };

    localStorage.setItem(`note${id}`, JSON.stringify(newNote));
    setNotes((prev) => prev.map((ele) => (ele.id === id ? newNote : ele)));
    setCurrentNote(newNote);
    setTabs((prev) =>
      prev.map((ele) =>
        ele.id === id ? { ...currentTab, title: newNote.title } : ele
      )
    );
    setCurrentTabId(id);
  }

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
    if (currentNote) {
      currentTab && currentTab.input
        ? setCurrentInput(currentTab.input)
        : setCurrentInput(currentNote.text);
    }
  }, [currentNote]);

  return (
    <div className="editor" ref={editor}>
      <div
        className="tab-bar"
        ref={tabBar}
        onWheel={(e) => (tabBar.current.scrollLeft -= 1 * (e.deltaY / 2))}
      >
        {tabs.map((tab, key) => (
          <div
            key={key}
            onClick={() => {
              setCurrentTabId(tab.id);
              setCurrentNote(tab.note);
            }}
            className={`${
              tab.note.id === currentNote.id ? "current-tab" : ""
            } ${isTabUnsaved(tab) ? "unsaved" : ""}`}
          >
            {`${tab.title}${isTabUnsaved(tab) ? "*" : ""}`}
            <img
              src={xmark}
              alt=""
              onClick={(e) => {
                setTabs((prev) => prev.filter((tab2, key2) => key2 !== key));
                if (tabs[key + 1]) {
                  setCurrentTabId(tabs[key + 1].id);
                  setCurrentNote(tabs[key + 1].note);
                } else if (tabs[key - 1]) {
                  setCurrentTabId(tabs[key - 1].id);
                  setCurrentNote(tabs[key - 1].note);
                } else setCurrentTabId(null);
                e.stopPropagation();
              }}
            />
          </div>
        ))}
        <div className="add-tab" onClick={newNote}>
          <span className="plus"></span>
        </div>
      </div>
      <div>
        {toggle !== null && (
          <div className="menu-toggle" onClick={() => setToggle(true)}>
            <span className="bars"></span>
          </div>
        )}
      </div>
      <textarea
        onChange={(e) => {
          setCurrentInput(e.target.value);
          setTabs((prev) => {
            let prevv = prev;
            if (prevv.length !== 0)
              prevv[getTabIndexById(currentTabId)].input = e.target.value;
            return prevv;
          });
        }}
        value={currentInput}
      ></textarea>
      <button
        className={`save-button ${toggle !== null && "mobile"}`}
        onClick={save}
      >
        Save
      </button>
    </div>
  );
}
