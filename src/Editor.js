import { useContext } from "react";
import { SliderContext } from "./SliderContext";

export default function Editor() {
  const editor = useContext(SliderContext).editor;

  return (
    <div className="editor" ref={editor}>
      <textarea></textarea>
    </div>
  );
}
