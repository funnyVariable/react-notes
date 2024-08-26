import { useContext, useRef } from "react";
import { NotesContext } from "./NotesContext";
import { EditorContext } from "./EditorContext";

export default function TabBar() {
  const tabBar = useRef(null);
  const newNote = useContext(NotesContext).newNote;
  const tabs = useContext(EditorContext).tabs;
  const isTabUnsaved = useContext(EditorContext).isTabUnsaved;
  const setTabs = useContext(EditorContext).setTabs;
  
  const currentNote = useContext(NotesContext).currentNote;
  const setCurrentNote = useContext(NotesContext).setCurrentNote;

  const setCurrentTabId = useContext(EditorContext).setCurrentTabId;

  function selectTab(tab) {
    setCurrentTabId(tab.id);
    setCurrentNote(tab.note);
  }

  function closeTab(e, key) {
    setTabs((prev) => prev.filter((tab2, key2) => key2 !== key));
    if (tabs[key + 1]) {
      setCurrentTabId(tabs[key + 1].id);
      setCurrentNote(tabs[key + 1].note);
    } else if (tabs[key - 1]) {
      setCurrentTabId(tabs[key - 1].id);
      setCurrentNote(tabs[key - 1].note);
    } else setCurrentTabId(null);
    e.stopPropagation();
  }

  return (
    <div
      className="tab-bar"
      ref={tabBar}
      onWheel={(e) => (tabBar.current.scrollLeft -= 1 * (e.deltaY / 2))}
    >
      {tabs.map((tab, key) => (
        <div
          key={key}
          onClick={() => selectTab(tab)}
          className={`${tab.note.id === currentNote.id ? "current-tab" : ""} ${
            isTabUnsaved(tab) ? "unsaved" : ""
          }`}
        >
          {`${tab.title}${isTabUnsaved(tab) ? "*" : ""}`}
          <span className="xmark" onClick={(e) => closeTab(e, key)}></span>
        </div>
      ))}
      <div
        className="add-tab"
        onClick={() => newNote(setTabs, setCurrentTabId)}
      >
        <span className="plus"></span>
      </div>
    </div>
  );
}
