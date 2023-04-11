import { userSlice } from "../zustand/user";
import MenuItem from "./MenuItem";
import useRegisterModalState from "../zustand/useRegisterModal";
import useLoginModalState from "../zustand/UseLoginModal";

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
    <aside className="absolute top-[76px] z-[500] right-4 lg:right-[50px] w-full max-w-[220px] drop-shadow-xl">
      <div className="bg-white rounded-[9px] overflow-hidden">
        {user ? (
          <div>hvshkf</div>
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
