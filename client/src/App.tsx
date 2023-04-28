import { Routes, Route, useLocation } from "react-router-dom";
import { Dashboard, UserListings } from "./pages";
import ProtectedRoute from "./util/ProtectedRoute";
import { useEffect } from "react";
import { userSlice } from "./zustand/user";
import RegisterModal from "./components/modal/RegisterModal";
import LoginModal from "./components/modal/LoginModal";
import CreateListingModal from "./components/modal/CreateListingModal";
import { lazy, Suspense } from "react";
import CategoryList from "./components/CategoryList";
import NavBar from "./components/NavBar";
const LazyHome = lazy(() => import("./pages/Home"));
const LazyApartment = lazy(() => import("./pages/Apartment"));

function App() {
  const user = userSlice((state) => state);
  const location = useLocation();
  const homepage = "/";

  useEffect(() => {
    let storageUser = localStorage.getItem("user");

    if (storageUser != null) {
      const parsedUser: {
        name: string;
        isAdmin: boolean;
        id: string;
        token: string;
        image: string;
      } = JSON.parse(storageUser);
      user.setUser({ ...parsedUser });
      return;
    }
  }, []);

  return (
    <>
      <header
        className={`w-full bg-white sticky top-0 mb-6 z-[50] ${
          location.pathname === homepage && "shadow"
        }`}
      >
        <div className="border-b-[1px] border-black/10">
          <NavBar />
        </div>
        <CategoryList />
      </header>
      <RegisterModal />
      <LoginModal />
      <CreateListingModal />
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback="Loading...">
              <LazyHome />
            </Suspense>
          }
        />
        <Route
          path="/apartment/:id"
          element={
            <Suspense fallback="Loading...">
              <LazyApartment />
            </Suspense>
          }
        />
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
