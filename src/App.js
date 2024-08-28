import Notes from "./Notes";
import Editor from "./Editor";
import Empty from "./Empty";
import { useContext, useEffect, useRef, useState } from "react";
import { EditorContext } from "./EditorContext";

// CSS
import "./Normalize.css";
import "./App.css";
import "./Notes.css";
import "./Editor.css";
import Slider from "./Slider";

function App() {
  const app = useRef(null);

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

      {toggle === null && <Slider app={app} />}

      {tabs.length === 0 ? (
        <Empty toggle={toggle} setToggle={setToggle} />
      ) : (
        <Editor toggle={toggle} setToggle={setToggle} />
      )}
    </div>
  );
}

export default App;
