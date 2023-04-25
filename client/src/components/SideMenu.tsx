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

  return (
    <aside className="absolute top-[70px] z-[500] right-5 md:right-[48px] lg:right-[50px] xl:right-[65px] w-full max-w-[190px] drop-shadow-xl">
      <div className="bg-white rounded-[9px] overflow-hidden">
        {user.user ? (
          <>
            <UserLink url="/users/me/listing" title="My Listing" />
            <UserLink url="/users/me/listing" title="My Favourites" />
            <UserLink url="/users/me/listing" title="My Reservations" />
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
