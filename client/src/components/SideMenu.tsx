import { userSlice } from "../zustand/user";
import MenuItem from "./MenuItem";
import useRegisterModalState from "../zustand/useRegisterModal";
import useLoginModalState from "../zustand/UseLoginModal";
import useListingModalState from "../zustand/listingModal";
import { useNavigate } from "react-router-dom";
import UserLink from "./UserLink";

interface SideMenuProps {
  setIsMenu: (value: boolean) => void;
}

function SideMenu({ setIsMenu }: SideMenuProps) {
  const registerModal = useRegisterModalState();
  const LoginModal = useLoginModalState();
  const listingModal = useListingModalState();
  const navigate = useNavigate();

  const user = userSlice((state) => state);

  const handleSignUpItemClick = () => {
    setIsMenu(false);
    registerModal.onOpen();
  };

  const handleLoginItemClick = () => {
    setIsMenu(false);
    LoginModal.onOpen();
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

  const handleMenuItemNavigate = (url: string) => {
    setIsMenu(false);
    navigate(url);
  };
  return (
    <aside className="absolute top-[75px] z-[500] right-4 sm:right-10 md:right-[48px] lg:right-[50px] w-full max-w-[190px] drop-shadow-xl">
      <div className="bg-white rounded-[9px] overflow-hidden border-[1px]">
        {user.user ? (
          <>
            <MenuItem
              title="My Listing"
              onClick={() => handleMenuItemNavigate("/listing")}
            />
            <MenuItem
              title="My Favourites"
              onClick={() => handleMenuItemNavigate("/favourites")}
            />
            <MenuItem
              title="My Reservations"
              onClick={() => handleMenuItemNavigate("/reservation")}
            />

            <MenuItem title="Shortlet my home" onClick={handleShortletClick} />
            <MenuItem title="Log out" onClick={handleLogOut} />
          </>
        ) : (
          <>
            <MenuItem title="Sign Up" onClick={handleSignUpItemClick} />
            <MenuItem title="Log in" onClick={handleLoginItemClick} />
          </>
        )}
      </div>
    </aside>
  );
}

export default SideMenu;
