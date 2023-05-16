import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { userSlice } from "./zustand/user";
import RegisterModal from "./components/modal/RegisterModal";
import LoginModal from "./components/modal/LoginModal";
import CreateListingModal from "./components/modal/CreateListingModal";
import { lazy, Suspense } from "react";
import CategoryList from "./components/CategoryList";
import NavBar from "./components/NavBar";
import { Avatar } from "@mantine/core";
import MenuItem from "./components/MenuItem";
import UserLink from "./components/UserLink";
import useListingModalState from "./zustand/listingModal";
import useRegisterModalState from "./zustand/useRegisterModal";
import useLoginModalState from "./zustand/UseLoginModal";
const LazyHome = lazy(() => import("./pages/Home"));
import { Apartment } from "./pages";
const LazyUserListings = lazy(() => import("./pages/UserListings"));
const LazyTrip = lazy(()=> import("./pages/Trips"))
const LazyUserFavourites = lazy(() => import("./pages/UserFavourites"));
const LazyReservation = lazy(() => import("./pages/Reservations"));

function App() {
  const [isMenu, setIsMenu] = useState(false);
  const user = userSlice((state) => state);
  const listingModal = useListingModalState();
  const registerModal = useRegisterModalState();
  const loginModal = useLoginModalState();
  const location = useLocation();
  const homepage = "/";
  const navigate = useNavigate();

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
  const handleSignUpItemClick = () => {
    setIsMenu(false);
    registerModal.onOpen();
  };

  const handleLoginItemClick = () => {
    setIsMenu(false);
    loginModal.onOpen();
  };

  const handleLogOut = () => {
    localStorage.removeItem("user");
    user.removeUser();
    navigate(0);
  };

  const handleShortletClick = () => {
    setIsMenu(false);
    listingModal.onOpen();
  };
  return (
    <>
      <header
        className={`w-full bg-white sticky top-0 mb-4 z-[50] ${
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
          path="/reservation"
          element={
            <Suspense fallback="Loading...">
              <LazyReservation />
            </Suspense>
          }
        />

        <Route path="*" element={"route does not exist"} />
      </Routes>
      {/* <footer className="fixed bottom-0 w-full sm:hidden border-t-[1px] border-black/20 bg-white">
        {isMenu && (
          <div className="bg-white rounded-[9px] overflow-hidden border-[1px] w-[180px] absolute right-4 bottom-[60px]">
            {user.user ? (
              <>
                <UserLink url="/user/me/listing" title="My Listing" />
                <UserLink url="/user/me/favourites" title="My Favourites" />
                <UserLink url="/reservation" title="My Reservations" />
                <MenuItem
                  title="Shortlet my home"
                  onClick={handleShortletClick}
                />
                <MenuItem title="Log out" onClick={handleLogOut} />
              </>
            ) : (
              <>
                <MenuItem title="Sign Up" onClick={handleSignUpItemClick} />
                <MenuItem title="Log in" onClick={handleLoginItemClick} />
              </>
            )}
          </div>
        )}
        <div className="px-4 flex justify-evenly items-center h-[55px]">
          <div>1</div>
          <div>2</div>
          <div className="">
            <button onClick={() => setIsMenu(!isMenu)}>
              <Avatar radius="xl" src={user.user?.image} size={"35px"} />
            </button>
          </div>
        </div>
      </footer> */}
    </>
  );
}

export default App;
