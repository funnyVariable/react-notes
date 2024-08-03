import { useContext, useEffect, useRef, useState } from "react";
import xmark from "./xmark.svg";
import bars2 from "./bars2.svg";
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

  const scrollAreaLeft = useRef(null);
  const scrollAreaRight = useRef(null);
  const fastScrollAreaLeft = useRef(null);
  const fastScrollAreaRight = useRef(null);
  const scrollLight = useRef(null);

  const [noteTitle, setNoteTitle] = useState("");
  const [currentInput, setCurrentInput] = useState(
    currentTab ? currentTab.input : ""
  );

  // const noteLocalStorage = JSON.parse(
  //   localStorage.getItem(`note${currentNote.id}`)
  // );

  function save() {
    const doesNoteExist = localStorage.getItem(`note${currentNote.id}`)
      ? true
      : false;
    const id = doesNoteExist ? currentNote.id : generateNoteId();
    console.log(doesNoteExist);

    const date = new Date();
    const timeStamp = `${date.getFullYear()}/${
      date.getMonth() + 1
    }/${date.getDate()}`;
    const newNote = {
      title: noteTitle === "" ? "Untitled" : noteTitle,
      text: currentInput,
      date: timeStamp,
      id: id,
    };
    localStorage.setItem(`note${id}`, JSON.stringify(newNote));
    setNotes((prev) => prev.map((ele) => (ele.id === id ? newNote : ele)));
    setCurrentNote(newNote);
    setTabs((prev) =>
      prev.map((ele) =>
        ele.note.id === id ? { ...currentTab, title: newNote.title } : ele
      )
    );
  }

  let scrollInterval;
  let tabsOverflow = false;
  let totalTabsWidth = 0;

  function scroll(direction, fast) {
    scrollInterval = setInterval(() => {
      if (direction === "left") {
        tabBar.current.scrollLeft -= fast ? 5 : 1;
      }
      if (direction === "right") {
        tabBar.current.scrollLeft += fast ? 5 : 1;
      }
    }, 25);

    if (tabsOverflow) {
      tabBar.current.classList.add(
        direction === "left" ? "scrolling-left" : "scrolling-right"
      );
      scrollLight.current.classList.add("scroll-effect");
    }
  }
  function stopScrolling(interval) {
    clearInterval(interval);
    tabBar.current.classList.remove("scrolling-left", "scrolling-right");
    scrollLight.current.classList.remove("scroll-effect");
  }

  useEffect(() => {
    for (let i = 5; i < tabBar.current.children.length; i++) {
      totalTabsWidth += tabBar.current.children[i].offsetWidth;
    }

    if (totalTabsWidth > tabBar.current.offsetWidth) {
      tabsOverflow = true;

      scrollAreaLeft.current.classList.add("active-scroll-area");
      scrollAreaRight.current.classList.add("active-scroll-area");

      fastScrollAreaLeft.current.classList.add("active-scroll-area", "fast");
      fastScrollAreaRight.current.classList.add("active-scroll-area", "fast");

      scrollAreaLeft.current.style.left = `${tabBar.current.offsetLeft + 20}px`;
      fastScrollAreaLeft.current.style.left = `${tabBar.current.offsetLeft}px`;
    } else {
      tabsOverflow = false;

      scrollAreaLeft.current.classList.remove("active-scroll-area");
      scrollAreaRight.current.classList.remove("active-scroll-area");

      fastScrollAreaLeft.current.classList.remove("active-scroll-area", "fast");
      fastScrollAreaRight.current.classList.remove(
        "active-scroll-area",
        "fast"
      );
    }
  }, [tabs]);

  useEffect(() => {
    if (currentNote) {
      currentTab && currentTab.input
        ? setCurrentInput(currentTab.input)
        : setCurrentInput(currentNote.text);
      currentTab && currentTab.titleInput
        ? setNoteTitle(currentTab.titleInput)
        : setNoteTitle(currentNote.title);
    }
  }, [currentNote]);

  return (
    <div className="editor" ref={editor}>
      <div className="tab-bar" ref={tabBar}>
        <i ref={scrollLight}></i>
        <span
          ref={scrollAreaLeft}
          onMouseEnter={() => scroll("left")}
          onMouseLeave={() => stopScrolling(scrollInterval)}
        ></span>
        <span
          ref={fastScrollAreaLeft}
          onMouseEnter={() => scroll("left", true)}
          onMouseLeave={() => stopScrolling(scrollInterval)}
        ></span>
        <span
          ref={scrollAreaRight}
          onMouseEnter={() => scroll("right")}
          onMouseLeave={() => stopScrolling(scrollInterval)}
        ></span>
        <span
          ref={fastScrollAreaRight}
          onMouseEnter={() => scroll("right", true)}
          onMouseLeave={() => stopScrolling(scrollInterval)}
        ></span>
        {tabs.map((tab, key) => (
          <div
            key={key}
            onClick={() => {
              setCurrentTabId(tab.id);
              setCurrentNote(tab.note);
              console.log(tabs);
            }}
            className={`${tab.id === currentTabId ? "current-tab" : ""} ${
              isTabUnsaved(tab) ? "unsaved" : ""
            }`}
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
      </div>
      <div className={toggle !== null ? "title-input" : null}>
        <input
          style={{ width: "100%" }}
          onChange={(e) => {
            setNoteTitle(e.target.value);
            setTabs((prev) => {
              let prevv = prev;
              if (prevv.length !== 0)
                prevv[getTabIndexById(currentTabId)].titleInput =
                  e.target.value;
              return prevv;
            });
          }}
          value={noteTitle}
          type="text"
          placeholder="Title"
        />
        {toggle !== null && (
          <div className="menu-toggle" onClick={() => setToggle(true)}>
            <img src={bars2} alt="" />
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
            console.log(tabs);
            return prevv;
          });
        }}
        value={currentInput}
      ></textarea>
      <button className="save-button" onClick={save}>
        Save
      </button>
    </div>
  );
}
