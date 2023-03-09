import logo from "./logo.svg";
import "./App.css";
import Teachable from "./utils/Teachable";
import Vanilla from "./components/Vanilla";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        {/* <Teachable /> */}
        <Vanilla />
      </header>
    </div>
  );
}

export default App;
