import { Routes, Route, useLocation } from "react-router-dom";
import { Home, Apartment, Dashboard } from "./pages";
import ProtectedRoute from "./util/ProtectedRoute";
import Apartments from "./pages/Apartments";
import { useEffect, useState } from "react";
import { userSlice } from "./zustand/user";
import useRegisterModalState from "./zustand/useRegisterModal";
import RegisterModal from "./components/modal/RegisterModal";
import NavBar from "./components/NavBar";
import LoginModal from "./components/modal/LoginModal";
import { useNavigate } from "react-router-dom";

function App() {
  const location = useLocation();
  const setUser = userSlice((state) => state.setUser);
  const User = userSlice((state) => state);
  const registerModal = useRegisterModalState();
  const navigate = useNavigate();

  const logout = async () => {
    await localStorage.removeItem("user");
    User.removeUser();
  };
  useEffect(() => {
    let storageUser = localStorage.getItem("user");
    if (storageUser != null) {
      const parsedUser: { name: string; isAdmin: boolean } =
        JSON.parse(storageUser);
      setUser({ ...parsedUser });
      return;
    }
  }, []);

  return (
    <>
      {!location.pathname.startsWith("/dashboard") && <NavBar />}
      <RegisterModal />
      <LoginModal />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/apartments" element={<Apartments />} />
        <Route path="/apartment/:id" element={<Apartment />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute user={"remi"}>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={"home"} />
          <Route path="users" element={"list of user"} />
          <Route path="bookings" element={"bookings"} />
          <Route path="user/create" element={"create new user"} />
          <Route path="user/:userID" element={"single user"} />
          <Route path="user/:userID/edit" element={"edit user"} />
        </Route>

        <Route path="*" element={"route does not exist"} />
      </Routes>
      <button onClick={logout}>logout</button>
    </>
  );
}

export default App;
