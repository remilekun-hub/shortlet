import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { userSlice } from "./zustand/user";
import RegisterModal from "./components/modal/RegisterModal";
import LoginModal from "./components/modal/LoginModal";
import CreateListingModal from "./components/modal/CreateListingModal";
import { lazy, Suspense } from "react";
import CategoryList from "./components/CategoryList";
import NavBar from "./components/NavBar";
import FilterModal from "./components/modal/FilterModal";
import ProtectedRoute from "./util/ProtectedRoute";
const LazyHome = lazy(() => import("./pages/Home"));
const LazyListings = lazy(() => import("./pages/Listings"));
const LazyTrip = lazy(() => import("./pages/Trips"));
const LazyApartment = lazy(() => import("./pages/Apartment"));
const LazyFavourites = lazy(() => import("./pages/Favourites"));
const LazyReservation = lazy(() => import("./pages/Reservations"));

function App() {
  const user = userSlice((state) => state);
  const [scrollNumber, setScrollNumber] = useState(0);
  const [search, setSearch] = useState("");
  const location = useLocation();
  const homepage = "/";

  useEffect(() => {
    const handleScrollHeight = () => {
      setScrollNumber(window.scrollY);
    };
    window.addEventListener("scroll", handleScrollHeight);

    return () => {
      window.removeEventListener("scroll", handleScrollHeight);
    };
  }, []);

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

    if (storageUser != null) {
      const parsedUser: UserType = JSON.parse(storageUser);
      user.setUser({ ...parsedUser });
      return;
    }
  }, []);

  return (
    <>
      <header
        className={`w-full bg-white sticky transition ease-in-out top-0 mb-5 z-[50] ${
          location.pathname === homepage && scrollNumber > 21 && "shadow-md"
        } `}
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
        <Route
          path="/apartment/:id"
          element={
            <Suspense fallback="Loading...">
              <LazyApartment />
            </Suspense>
          }
        />
        <Route
          path="/trips"
          element={
            <ProtectedRoute>
              <Suspense fallback="Loading...">
                <LazyTrip />
              </Suspense>
            </ProtectedRoute>
          }
        />

        <Route
          path="/listing"
          element={
            <ProtectedRoute>
              <Suspense fallback="Loading...">
                <LazyListings />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/favourites"
          element={
            <ProtectedRoute>
              <Suspense fallback="Loading...">
                <LazyFavourites />
              </Suspense>
            </ProtectedRoute>
          }
        />
        <Route
          path="/reservations"
          element={
            <ProtectedRoute>
              <Suspense fallback="Loading...">
                <LazyReservation />
              </Suspense>
            </ProtectedRoute>
          }
        />

        <Route path="*" element={"route does not exist"} />
      </Routes>
    </>
  );
}

export default App;
