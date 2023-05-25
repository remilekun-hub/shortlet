import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { userSlice } from "./zustand/user";
import RegisterModal from "./components/modal/RegisterModal";
import LoginModal from "./components/modal/LoginModal";
import CreateListingModal from "./components/modal/CreateListingModal";
import { lazy, Suspense } from "react";
import CategoryList from "./components/CategoryList";
import NavBar from "./components/NavBar";

const LazyHome = lazy(() => import("./pages/Home"));
import { Apartment } from "./pages";
import FilterModal from "./components/modal/FilterModal";
const LazyUserListings = lazy(() => import("./pages/UserListings"));
const LazyTrip = lazy(() => import("./pages/Trips"));
const LazyUserFavourites = lazy(() => import("./pages/Favourites"));
const LazyReservation = lazy(() => import("./pages/Reservations"));

function App() {
  const user = userSlice((state) => state);
  const [search, setSearch] = useState("");
  const location = useLocation();
  const homepage = "/";

  interface favourite {
    _id: string;
    propertyId: string;
  }

  type UserType = {
    name: string;
    id: string;
    token: string;
    image: string;
    favourites: favourite[];
  };

  useEffect(() => {
    let storageUser = localStorage.getItem("user");
    console.log(storageUser);

    if (storageUser != null) {
      const parsedUser: UserType = JSON.parse(storageUser);
      user.setUser({ ...parsedUser });
      return;
    }
  }, []);

  return (
    <>
      <header
        className={`w-full bg-white sticky top-0 mb-5 z-[50] ${
          location.pathname === homepage && "shadow"
        }`}
      >
        <div className="border-b-[1px] border-black/10">
          <NavBar search={search} setSearch={setSearch} />
        </div>
        <CategoryList />
      </header>

      <RegisterModal />
      <LoginModal />
      <CreateListingModal />
      <FilterModal setSearch={setSearch} />
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback="Loading...">
              <LazyHome setSearch={setSearch} />
            </Suspense>
          }
        />
        <Route path="/apartment/:id" element={<Apartment />} />
        <Route
          path="/trips"
          element={
            <Suspense fallback="Loading...">
              <LazyTrip />
            </Suspense>
          }
        />

        <Route
          path="/listing"
          element={
            <Suspense fallback="Loading...">
              <LazyUserListings />
            </Suspense>
          }
        />
        <Route
          path="/favourites"
          element={
            <Suspense fallback="Loading...">
              <LazyUserFavourites />
            </Suspense>
          }
        />
        <Route
          path="/reservations"
          element={
            <Suspense fallback="Loading...">
              <LazyReservation />
            </Suspense>
          }
        />

        <Route path="*" element={"route does not exist"} />
      </Routes>
    </>
  );
}

export default App;
