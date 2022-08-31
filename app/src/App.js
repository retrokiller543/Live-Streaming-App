import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>Video Stream</h1>
      <video id="videoPlayer" width="50%" controls muted="muted" autoPlay>
        <source
          src="http://localhost:8000/live/emil/index.mpd?"
          typy="video/mp4"
        />
      </video>
    </div>
  );
}

export default App;
