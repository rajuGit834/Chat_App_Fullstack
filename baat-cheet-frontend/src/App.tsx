import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./components/signup/SignUp";
import LogIn from "./components/login/LogIn";
import Home from "./components/home/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<LogIn />} />
      </Routes>
    </Router>
  );
}

export default App;
