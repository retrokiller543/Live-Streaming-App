import "./App.css";

function App() {
  return (
    <div className="App">
      <video id="videoPlayer" width="50%" controls muted="muted" autoplay>
        <source src="http://localhost:4000/video" type="video/mp4" />
      </video>
    </div>
  );
}

export default App;
