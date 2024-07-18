import { useEffect, useRef } from "react";
import xmark from "./xmark.svg";

export default function Editor() {
  const editor = useRef(null);
  const tabs = useRef(null);

  const scrollAreaLeft = useRef(null);
  const scrollAreaRight = useRef(null);

  useEffect(() => {
    let totalTabsWidth = 0;
    for (let i = 2; i < tabs.current.children.length; i++) {
      totalTabsWidth += tabs.current.children[i].offsetWidth;
    }

    if (totalTabsWidth > tabs.current.offsetWidth) {
      scrollAreaLeft.current.classList.add("active-scroll-area");
      scrollAreaRight.current.classList.add("active-scroll-area");
    } else {
      scrollAreaLeft.current.classList.remove("active-scroll-area");
      scrollAreaRight.current.classList.remove("active-scroll-area");
    }
  });
  return (
    <div className="editor" ref={editor}>
      <div className="tabs" ref={tabs}>
        <span ref={scrollAreaLeft}></span>
        <span ref={scrollAreaRight}></span>
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
