import "./App.css";
import Flvplayer from "./FlvPlayer";

function App() {
  return (
    <div className="App">
      <h1>Video Stream</h1>
      <Flvplayer url={"http://localhost:8000/live/emil.flv"} type="flv" />
    </div>
  );
}

export default App;
