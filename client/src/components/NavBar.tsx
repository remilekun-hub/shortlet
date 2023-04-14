import { useState } from "react";
import SideMenu from "./SideMenu";

function NavBar() {
  const [isMenu, setIsMenu] = useState(false);
  return (
    <nav className="flex items-center justify-between max-w-screen-xl mx-auto px-5 py-4 md:px-[48px] lg:px-[50px] xl:px-[80px] relative">
      <div>logohere</div>
      <button
        onClick={() => setIsMenu(!isMenu)}
        className="flex items-center justify-center p-2 rounded-xl gap-2 shadow-xl"
      >
        <div>hello</div>
        <div>hello</div>
      </button>

      {isMenu && <SideMenu setIsMenu={setIsMenu} />}
    </nav>
  );
}

export default NavBar;
