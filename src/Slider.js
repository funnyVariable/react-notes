import { useContext } from "react";
import { SliderContext } from "./SliderContext";

export default function Slider({ app }) {
  const setHoldingSlider = useContext(SliderContext).setHoldingSlider;
  const slider = useContext(SliderContext).slider;

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
