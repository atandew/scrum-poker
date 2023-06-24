import "./App.css";
import CreatePokerBoard from "./components/CreatePoker/CreatePoker";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavbarComp from "./components/NavbarComp/NavbarComp";
import "bootstrap/dist/css/bootstrap.min.css";
import RegisterUser from "./components/RegisterUser/RegisterUser";
import PokerBoard from "./components/PokerBoard/PokerBoard";

function App() {
  return (
    <Router>
      <NavbarComp />
      <Routes>
        <Route exact path="/" element={<CreatePokerBoard />} />
        <Route
          exact
          path="/board/:boardId/register-user"
          element={<RegisterUser />}
        />
        <Route
          exact
          path="/board/:boardId/user/:userId"
          element={<PokerBoard />}
        />
      </Routes>
    </Router>
  );
}

export default App;
