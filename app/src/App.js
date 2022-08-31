import "./App.css";
import Flvplayer from "./components/FlvPlayer";

function App() {
  return (
    <div className="App">
      <h1>Video Stream</h1>
      <Flvplayer url={"http://localhost:8000/live/kasper.flv"} type="flv" />
    </div>
  );
}

export default App;
