import Notes from "./Notes";
import Editor from "./Editor";
import { useContext } from "react";
import { SliderContext } from "./SliderContext";
import bars from "./bars.svg";

// CSS
import "./Normalize.css";
import "./App.css";
import "./Notes.css";
import "./Editor.css";
import { EditorContext } from "./EditorContext";

function App() {
  const setHoldingSlider = useContext(SliderContext).setHoldingSlider;
  const slider = useContext(SliderContext).slider;
  const app = useContext(SliderContext).app;

  const tabs = useContext(EditorContext).tabs;

  return (
    <div className="app" ref={app}>
      <Notes />
      <div
        className="slider"
        ref={slider}
        onMouseDown={() => setHoldingSlider((prev) => !prev)}
      >
        <img src={bars} alt="" />
      </div>
      {tabs.length === 0 ? (
        <div className="empty">
          <h2>No notes selected</h2>
          <p>Select a note from notes menu to read or edit.</p>
        </div>
      ) : (
        <Editor />
      )}
    </div>
  );
}

export default App;
