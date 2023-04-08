import { useState } from "react";
import SideMenu from "./SideMenu";

function NavBar() {
  const [isMenu, setIsMenu] = useState(false);
  return (
    <header className="border-b border-black/20 stciky top-0">
      <nav className="flex items-center justify-between max-w-[1300px] mx-auto px-4 py-6 md:px-[48px] lg:px-[50px] relative">
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
    </header>
  );
}

export default NavBar;
