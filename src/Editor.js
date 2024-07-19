import { useEffect, useRef, useState } from "react";
import xmark from "./xmark.svg";

export default function Editor() {
  const editor = useRef(null);
  const tabs = useRef(null);

  const scrollAreaLeft = useRef(null);
  const scrollAreaRight = useRef(null);
  const fastScrollAreaLeft = useRef(null);
  const fastScrollAreaRight = useRef(null);

  let scrollInterval;

  function scroll(direction, fast) {
    scrollInterval = setInterval(() => {
      if (direction === "left") {
        tabs.current.scrollLeft -= fast ? 5 : 1;
      }
      if (direction === "right") {
        tabs.current.scrollLeft += fast ? 5 : 1;
      }
    }, 25);
  }
  function stopScrolling(interval) {
    clearInterval(interval);
  }

  useEffect(() => {
    let totalTabsWidth = 0;
    for (let i = 4; i < tabs.current.children.length; i++) {
      totalTabsWidth += tabs.current.children[i].offsetWidth;
    }

    if (totalTabsWidth > tabs.current.offsetWidth) {
      scrollAreaLeft.current.classList.add("active-scroll-area");
      scrollAreaRight.current.classList.add("active-scroll-area");

      fastScrollAreaLeft.current.classList.add("active-scroll-area", "fast");
      fastScrollAreaRight.current.classList.add("active-scroll-area", "fast");

      scrollAreaLeft.current.style.left = `${tabs.current.offsetLeft + 40}px`;
      fastScrollAreaLeft.current.style.left = `${tabs.current.offsetLeft}px`;
    } else {
      scrollAreaLeft.current.classList.remove("active-scroll-area");
      scrollAreaRight.current.classList.remove("active-scroll-area");

      fastScrollAreaLeft.current.classList.remove("active-scroll-area", "fast");
      fastScrollAreaRight.current.classList.remove(
        "active-scroll-area",
        "fast"
      );
    }
  });

  return (
    <div className="editor" ref={editor}>
      <div className="tabs" ref={tabs}>
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
        <div>
          tab1
          <img src={xmark} alt="" />
        </div>
        <div>
          tab2
          <img src={xmark} alt="" />
        </div>
        <div>
          tab333333333333333333333333
          <img src={xmark} alt="" />
        </div>
        <div>
          tab4
          <img src={xmark} alt="" />
        </div>
        <div>
          tab5
          <img src={xmark} alt="" />
        </div>
        <div>
          tab6
          <img src={xmark} alt="" />
        </div>
        <div>
          tab7
          <img src={xmark} alt="" />
        </div>
      </div>
      <textarea></textarea>
    </div>
  );
}
