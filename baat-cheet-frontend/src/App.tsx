import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./components/signup/SignUp";
import LogIn from "./components/login/LogIn";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
