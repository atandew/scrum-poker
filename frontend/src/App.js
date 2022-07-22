import "./App.css";
import CreatePokerBoard from "./components/CreatePoker";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        Navbar
        <Routes>
            <Route exact path="/" element={<CreatePokerBoard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
