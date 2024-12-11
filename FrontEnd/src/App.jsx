import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import UserSignUp from "./pages/User/UserSignUp";
import UserLogin from "./pages/User/UserLogin";
import CaptainSignUp from "./pages/Captain/CaptainSignUp";
import CaptainLogin from "./pages/Captain/CaptainLogin";

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<UserSignUp />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/captain-signup" element={<CaptainSignUp />} />
          <Route path="/captain-login" element={<CaptainLogin />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
