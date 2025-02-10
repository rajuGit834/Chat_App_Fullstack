import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./components/signup/SignUp";
import LogIn from "./components/login/LogIn";
import Home from "./components/home/Home";
import PrivateRoutes from "./routes/PrivateRoutes";


function App() {
  return (
    <Router>
      <Routes>
        // private route need authentication
        <Route path="/" element={<PrivateRoutes element={<Home />} />} />

        //public routes
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<LogIn />} />
      </Routes>
    </Router>
  );
}

export default App;
