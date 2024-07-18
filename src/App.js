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

function App() {
  const setHoldingSlider = useContext(SliderContext).setHoldingSlider;
  const slider = useContext(SliderContext).slider;
  const app = useContext(SliderContext).app;

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
      <Editor />
    </div>
  );
}

export default App;
