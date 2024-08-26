import { useContext, useEffect, useRef, useState } from "react";
import { NotesContext } from "./NotesContext";
import { EditorContext } from "./EditorContext";
import TabBar from "./TabBar";

export default function Editor({ toggle, setToggle }) {
  const editor = useRef(null);

  const setNotes = useContext(NotesContext).setNotes;
  const currentNote = useContext(NotesContext).currentNote;
  const setCurrentNote = useContext(NotesContext).setCurrentNote;
  const generateNoteId = useContext(NotesContext).generateNoteId;

  const setTabs = useContext(EditorContext).setTabs;
  const currentTabId = useContext(EditorContext).currentTabId;
  const setCurrentTabId = useContext(EditorContext).setCurrentTabId;
  const getTabIndexById = useContext(EditorContext).getTabIndexById;
  const getTabById = useContext(EditorContext).getTabById;
  const currentTab = getTabById(currentTabId);

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

  function inputHandler(e) {
    setCurrentInput(e.target.value);
    setTabs((prev) => {
      let prevv = prev;
      if (prevv.length !== 0)
        prevv[getTabIndexById(currentTabId)].input = e.target.value;
      return prevv;
    });
  }

  useEffect(() => {
    if (currentNote) {
      currentTab && currentTab.input
        ? setCurrentInput(currentTab.input)
        : setCurrentInput(currentNote.text);
    }
  }, [currentTab, currentNote]);

  return (
    <div className="editor" ref={editor}>
      <TabBar />
      <div>
        {toggle !== null && (
          <div className="menu-toggle" onClick={() => setToggle(true)}>
            <span className="bars"></span>
          </div>
        )}
      </div>
      <textarea onChange={inputHandler} value={currentInput}></textarea>
      <button
        className={`save-button ${toggle !== null && "mobile"}`}
        onClick={save}
      >
        Save
      </button>
    </div>
  );
}
