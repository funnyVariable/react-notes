import { useContext, useEffect, useRef, useState } from "react";
import xmark from "./xmark.svg";
import { NotesContext } from "./NotesContext";
import { EditorContext } from "./EditorContext";

export default function Editor() {
  const editor = useRef(null);
  const tabBar = useRef(null);

  const notes = useContext(NotesContext).notes;
  const setNotes = useContext(NotesContext).setNotes;
  const currentNote = useContext(NotesContext).currentNote;

  const tabs = useContext(EditorContext).tabs;
  const setTabs = useContext(EditorContext).setTabs;
  const currentTab = useContext(EditorContext).currentTab;
  const setCurrentTab = useContext(EditorContext).setCurrentTab;

  const scrollAreaLeft = useRef(null);
  const scrollAreaRight = useRef(null);
  const fastScrollAreaLeft = useRef(null);
  const fastScrollAreaRight = useRef(null);
  const scrollLight = useRef(null);

  const [noteTitle, setNoteTitle] = useState("");
  const [input, setInput] = useState("");

  function save() {
    const number = notes.length + 1;
    const date = new Date();
    const timeStamp = `${date.getFullYear()}/${
      date.getMonth() + 1
    }/${date.getDate()}`;
    const newNote = {
      title: noteTitle === "" ? "Untitled" : noteTitle,
      text: input,
      date: timeStamp,
      id: number,
    };
    localStorage.setItem(`note${number}`, JSON.stringify(newNote));
    setNotes((prev) => [...prev, newNote]);
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
      setInput(currentNote.text);
      setNoteTitle(currentNote.title);
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
            onClick={() => setCurrentTab(key)}
            className={tab.note.id === currentTab ? "current-tab" : ""}
          >
            {tab.title}
            <img
              src={xmark}
              alt=""
              onClick={(e) => {
                setTabs((prev) => prev.filter((tab2, key2) => key2 !== key));
                e.stopPropagation();
              }}
            />
          </div>
        ))}
      </div>
      <input
        onChange={(e) => setNoteTitle(e.target.value)}
        value={noteTitle}
        type="text"
        placeholder="Title"
      />
      <textarea
        onChange={(e) => setInput(e.target.value)}
        value={input}
      ></textarea>
      <button className="save-button" onClick={save}>
        Save
      </button>
    </div>
  );
}
