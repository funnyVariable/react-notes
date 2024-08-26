import Notes from "./Notes";
import Editor from "./Editor";
import Empty from "./Empty";
import { useContext, useEffect, useState } from "react";
import { SliderContext } from "./SliderContext";
import { EditorContext } from "./EditorContext";

// CSS
import "./Normalize.css";
import "./App.css";
import "./Notes.css";
import "./Editor.css";
import "./icons.css";

function App() {
  const setHoldingSlider = useContext(SliderContext).setHoldingSlider;
  const slider = useContext(SliderContext).slider;
  const app = useContext(SliderContext).app;

  const tabs = useContext(EditorContext).tabs;
  const [toggle, setToggle] = useState(window.innerWidth < 600 ? false : null);

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

      {toggle === null && (
        <div
          className="slider"
          ref={slider}
          onMouseDown={() => setHoldingSlider((prev) => !prev)}
        >
          <span className="bars"></span>
        </div>
      )}

      {tabs.length === 0 ? (
        <Empty toggle={toggle} setToggle={setToggle} />
      ) : (
        <Editor toggle={toggle} setToggle={setToggle} />
      )}
    </div>
  );
}

export default App;
