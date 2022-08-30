import "./App.css";

function App() {
  return (
    <div className="App">
      <video
        id="videoPlayer"
        src="https://localhost:8443/live/emil.flv"
        width="50%"
        controls
        muted="muted"
        autoPlay
      ></video>
    </div>
  );
}

export default App;
