import { useContext } from "react";
import { SliderContext } from "./SliderContext";
import xmark from "./xmark.svg";

export default function Editor() {
  const editor = useContext(SliderContext).editor;

  return (
    <div className="editor" ref={editor}>
      <div className="tabs">
        <div>
          tab1
          <img src={xmark} alt="" />
        </div>
        <div>tab2</div>
        <div>
          tab333333333333333333333333
          <img src={xmark} alt="" />
        </div>
        <div>
          tab4
          <img src={xmark} alt="" />
        </div>
        <div>
          tab5
          <img src={xmark} alt="" />
        </div>
        <div>
          tab6
          <img src={xmark} alt="" />
        </div>
        <div>
          tab7
          <img src={xmark} alt="" />
        </div>
      </div>
      <textarea></textarea>
    </div>
  );
}
