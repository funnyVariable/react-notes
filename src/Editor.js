import { useEffect, useRef, useState } from "react";
import xmark from "./xmark.svg";

export default function Editor() {
  const editor = useRef(null);
  const tabBar = useRef(null);
  const [tabs, setTabs] = useState([
    { title: "tab1" },
    { title: "tab2" },
    { title: "tab3" },
    { title: "tab4444444444444444444" },
    { title: "tab5" },
    { title: "tab6" },
  ]);

  const scrollAreaLeft = useRef(null);
  const scrollAreaRight = useRef(null);
  const fastScrollAreaLeft = useRef(null);
  const fastScrollAreaRight = useRef(null);
  const scrollLight = useRef(null);

  const [input, setInput] = useState("");
  function inputHandler(e) {
    setInput(e.target.value);
    console.log(input);
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

    console.log(tabsOverflow);
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

      scrollAreaLeft.current.style.left = `${tabBar.current.offsetLeft + 40}px`;
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
          <div key={key}>
            {tab.title}
            <img
              src={xmark}
              alt=""
              onClick={() =>
                setTabs((prev) => prev.filter((tab2, key2) => key2 !== key))
              }
            />
          </div>
        ))}
      </div>
      <textarea onChange={inputHandler}></textarea>
    </div>
  );
}
