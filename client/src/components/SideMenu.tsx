import { userSlice } from "../zustand/user";
import MenuItem from "./MenuItem";
import useRegisterModalState from "../zustand/useRegisterModal";
import useLoginModalState from "../zustand/UseLoginModal";
import { Link } from "react-router-dom";

interface SideMenuProps {
  setIsMenu: (value: boolean) => void;
}

function SideMenu({ setIsMenu }: SideMenuProps) {
  const registerModal = useRegisterModalState();
  const LoginModal = useLoginModalState();
  const user = userSlice((state) => state.user);

  const handleSignUpItemClick = () => {
    setIsMenu(false);
    registerModal.onOpen();
  };

  const handleLoginItemClick = () => {
    setIsMenu(false);
    LoginModal.onOpen();
  };

  return (
    <aside className="absolute top-[67px] z-[500] right-4 md:right-[48px] lg:right-[50px] xl:right-[80px] w-full max-w-[220px] drop-shadow-xl">
      <div className="bg-white rounded-[9px] overflow-hidden">
        {user ? (
          <>
            <Link to="/users/me/listing">My Listings</Link>
          </>
        ) : (
          <>
            <MenuItem title="SignUp" onClick={handleSignUpItemClick} />
            <MenuItem title="Login" onClick={handleLoginItemClick} />
          </>
        )}
      </div>
    </aside>
  );
}

export default SideMenu;
