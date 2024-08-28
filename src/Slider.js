import { useRef, useState } from "react";

export default function Slider({ app }) {
  const [holdingSlider, setHoldingSlider] = useState(false);

  const slider = useRef();

  let sliderPos;
  let sliderWidth;
  let notesWidth;
  let editorWidth;

  document.onmousemove = (e) => {
    if (holdingSlider) {
      sliderPos = e.clientX;
      sliderWidth = slider.current.offsetWidth;

      let threshold = 148;
      let editorThreshold = window.innerWidth - threshold - sliderWidth;

      notesWidth = sliderPos > threshold ? sliderPos : threshold;
      editorWidth = window.innerWidth - notesWidth - sliderWidth;

      app.current.style.userSelect = "none";

      if (sliderPos < editorThreshold) {
        app.current.style.gridTemplateColumns = `${notesWidth}px 12px auto`;
      }

      if (sliderPos < editorThreshold) {
        app.current.style.gridTemplateColumns = `auto 12px ${editorWidth}px`;
      }
    }
  };
  document.onmouseup = () => {
    if (holdingSlider) setHoldingSlider(false);
    app.current.style.userSelect = "initial";
  };

  return (
    <div
      className="slider"
      ref={slider}
      onMouseDown={() => setHoldingSlider((prev) => !prev)}
    >
      <span className="bars"></span>
    </div>
  );
}
