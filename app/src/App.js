import "./App.css";
import Flvplayer from "./components/FlvPlayer";

function App() {
  return (
    <div className="App">
      <h1>Video Stream</h1>
      <Flvplayer url={"http://83.251.107.12:8000/live/emil.flv"} type="flv" />
    </div>
  );
}

export default App;
