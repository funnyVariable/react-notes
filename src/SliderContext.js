import { createContext, useRef, useState } from "react";

export const SliderContext = createContext(null);

export default function SliderProvider({ children }) {
  const [holdingSlider, setHoldingSlider] = useState(false);

  const notes = useRef();
  const editor = useRef();
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

      if (sliderPos < editorThreshold) {
        document.getElementsByClassName(
          "app"
        )[0].style.gridTemplateColumns = `${notesWidth}px 12px auto`;
      }

      if (sliderPos < editorThreshold) {
        document.getElementsByClassName(
          "app"
        )[0].style.gridTemplateColumns = `auto 12px ${editorWidth}px`;
      }
    }
  };
  document.onmouseup = () => {
    if (holdingSlider) setHoldingSlider(false);
  };

  return (
    <SliderContext.Provider
      value={{ notes, editor, slider, holdingSlider, setHoldingSlider }}
    >
      {children}
    </SliderContext.Provider>
  );
}
