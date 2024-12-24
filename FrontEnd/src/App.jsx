import { Route, Routes } from "react-router-dom";
import Start from "./pages/Start";
import UserSignUp from "./pages/User/UserSignUp";
import UserLogin from "./pages/User/UserLogin";
import CaptainSignUp from "./pages/Captain/CaptainSignUp";
import CaptainLogin from "./pages/Captain/CaptainLogin";
import Home from "./pages/Home";
import UserProtectedWrapper from "./pages/User/UserProtectedWrapper";
import UserLogout from "./pages/User/UserLogout";
import CaptainHome from "./pages/Captain/CaptainHome";
import CaptainProtectedWrapper from "./pages/Captain/CaptainProtectedWrapper";
import CaptainLogout from "./pages/Captain/CaptainLogout";
import Riding from "./pages/User/Riding";

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/signup" element={<UserSignUp />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/captain-signup" element={<CaptainSignUp />} />
          <Route path="/captain-login" element={<CaptainLogin />} />
          <Route
            path="/home"
            element={
              <UserProtectedWrapper>
                <Home />
              </UserProtectedWrapper>
            }
          />
          <Route
            path="/user/riding"
            element={
              <UserProtectedWrapper>
                <Riding />
              </UserProtectedWrapper>
            }
          />
          <Route
            path="/user/logout"
            element={
              <UserProtectedWrapper>
                <UserLogout />
              </UserProtectedWrapper>
            }
          />
          <Route
            path="/captain-logout"
            element={
              <CaptainProtectedWrapper>
                <CaptainLogout />
              </CaptainProtectedWrapper>
            }
          />
          <Route
            path="/captain-home"
            element={
              <CaptainProtectedWrapper>
                <CaptainHome />
              </CaptainProtectedWrapper>
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
