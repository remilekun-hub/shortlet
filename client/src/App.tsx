import { Routes, Route } from "react-router-dom";
import { Home, Apartment, Dashboard, UserListings } from "./pages";
import ProtectedRoute from "./util/ProtectedRoute";
import Apartments from "./pages/Apartments";
import { useEffect, useState } from "react";
import { userSlice } from "./zustand/user";
import RegisterModal from "./components/modal/RegisterModal";
import LoginModal from "./components/modal/LoginModal";
import { useNavigate } from "react-router-dom";
import CreateListingModal from "./components/modal/CreateListingModal";
import axios from "axios";

function App() {
  const images: string[] = [];
  const user = userSlice((state) => state);
  const navigate = useNavigate();

  const logout = async () => {
    localStorage.removeItem("user");
    user.removeUser();
    navigate(0);
  };
  useEffect(() => {
    let storageUser = localStorage.getItem("user");
    if (storageUser != null) {
      const parsedUser: {
        name: string;
        isAdmin: boolean;
        id: string;
        token: string;
      } = JSON.parse(storageUser);
      user.setUser({ ...parsedUser });
      return;
    }
  }, []);

  return (
    <>
      <RegisterModal />
      <LoginModal />
      <CreateListingModal />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/apartments" element={<Apartments />} />
        <Route path="/apartment/:id" element={<Apartment />} />
        {user.user && (
          <Route path="/user/me/listings" element={<UserListings />} />
        )}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute user={"wale"}>
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
    </>
  );
}

export default App;
