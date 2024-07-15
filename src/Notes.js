import { useContext } from "react";
import { SliderContext } from "./SliderContext";

export default function Notes() {
  const notes = useContext(SliderContext).notes;

  return (
    <div className="notes" ref={notes}>
      <div>Note1</div>
      <div>Note2</div>
      <div>Note3</div>
      <div>Note4</div>
    </div>
  );
}
