import { createContext, useState } from "react";

export const EditorContext = createContext(null);

export default function EditorProvider({ children }) {
  const [tabs, setTabs] = useState([]);
  const [currentTab, setCurrentTab] = useState(null);

  function doesTabExist(note) {
    let tabExist = false;
    for (let i = 0; i < tabs.length; i++) {
      if (tabs[i].note.id === note.id) tabExist = true;
    }
    return tabExist ? true : false;
  }

  return (
    <EditorContext.Provider
      value={{ tabs, setTabs, currentTab, setCurrentTab, doesTabExist }}
    >
      {children}
    </EditorContext.Provider>
  );
}
