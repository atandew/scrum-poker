import "./App.css";
import CreatePokerBoard from "./components/CreatePoker/CreatePoker";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavbarComp from "./components/NavbarComp/NavbarComp";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
        <NavbarComp/>
        <Routes>
            <Route exact path="/" element={<CreatePokerBoard />} />
        </Routes>
    </Router>
  );
}

export default App;
