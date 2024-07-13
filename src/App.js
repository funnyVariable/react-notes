import Notes from "./Notes";
import "./Normalize.css";
import "./App.css";
import "./Notes.css";
import Editor from "./Editor";

function App() {
  return (
    <div className="app">
      <Notes />
      <div className="slider"></div>
      <Editor />
    </div>
  );
}

export default App;
