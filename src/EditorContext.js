import { createContext, useState } from "react";

export const EditorContext = createContext(null);

export default function EditorProvider({ children }) {
  const [tabs, setTabs] = useState([
    { title: "tab1" },
    { title: "tab2" },
    { title: "tab3" },
    { title: "tab4444444444444444444" },
    { title: "tab5" },
    { title: "tab6" },
  ]);
  const [currentTab, setCurrentTab] = useState(null);

  return (
    <EditorContext.Provider
      value={{ tabs, setTabs, currentTab, setCurrentTab }}
    >
      {children}
    </EditorContext.Provider>
  );
}
