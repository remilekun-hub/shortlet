import { useState } from "react";
import SideMenu from "./SideMenu";
import { Avatar } from "@mantine/core";
import { userSlice } from "../zustand/user";

function NavBar() {
  const [isMenu, setIsMenu] = useState(false);
  const user = userSlice((state) => state.user);
  return (
    <nav className="flex items-center justify-between mx-auto max-w-[1400px] px-3 py-4 md:px-[48px] lg:px-[50px] xl:px-[65px] relative">
      <div>logohere</div>
      <button
        onClick={() => setIsMenu(!isMenu)}
        className="flex items-center justify-center py-[7px] px-2 rounded-[25px] gap-1 shadow-lg"
      >
        <div>hello</div>
        <Avatar radius="xl" src={user?.image} size={"md"} />
      </button>

      {isMenu && <SideMenu setIsMenu={setIsMenu} />}
    </nav>
  );
}

export default NavBar;
