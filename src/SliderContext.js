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
      let editorThreshold = window.innerWidth - 100 - sliderWidth;
      notesWidth = sliderPos > 100 ? sliderPos : 100;
      editorWidth = window.innerWidth - notesWidth - sliderWidth;

      if (sliderPos < editorThreshold) {
        document.getElementsByClassName(
          "app"
        )[0].style.gridTemplateColumns = `${notesWidth}px 5px auto`;
      }

      if (sliderPos < editorThreshold) {
        document.getElementsByClassName(
          "app"
        )[0].style.gridTemplateColumns = `auto 5px ${editorWidth}px`;
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
