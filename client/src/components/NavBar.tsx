import { Dispatch, SetStateAction, useState } from "react";
import SideMenu from "./SideMenu";
import { Avatar } from "@mantine/core";
import { userSlice } from "../zustand/user";
import {
  useNavigate,
  useSearchParams,
  createSearchParams,
  Link,
  useLocation,
} from "react-router-dom";
import useLoginModalState from "../zustand/UseLoginModal";
import useListingModalState from "../zustand/listingModal";

interface NavBarProp {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
}

function NavBar({ search, setSearch }: NavBarProp) {
  const [isMenu, setIsMenu] = useState(false);
  const user = userSlice((state) => state.user);
  const loginModal = useLoginModalState();
  const listingModal = useListingModalState();
  const navigate = useNavigate();
  const params = useSearchParams();
  const category = params?.[0].get("category");

  const location = useLocation();
  const apartmentPath = location.pathname.startsWith("/apartment");

  const userFilter = {
    beds: 1,
    baths: 1,
    bedrooms: 1,
    guests: 1,
    minPrice: 0,
    maxPrice: 1000,
  };

  const handleSearch = () => {
    let query: any = { ...userFilter };
    if (search) {
      query = { country: search, ...query };
    }
    if (category) {
      query = { category, ...query };
    }
    if (search && category) {
      query = { country: search, category, ...query };
    }

    navigate({
      pathname: "/",
      search: `${createSearchParams(query)}`,
    });
  };

  const handleCreate = () => {
    if (!user) {
      return loginModal.onOpen();
    }
    listingModal.onOpen();
  };

  return (
    <nav
      className={`flex items-center justify-between mx-auto  px-3 h-[80px] sm:px-10 md:px-[48px] lg:px-[50px] xl:px-[65px] relative ${
        apartmentPath ? "max-w-[1250px]" : "max-w-[1800px]"
      }`}
    >
      <div
        className="absolute right-[160px] hidden lg:block cursor-pointer"
        onClick={handleCreate}
      >
        Shortlet your home
      </div>
      <Link to={"/"} className="hidden md:block">
        logo here
      </Link>

      <div className="flex border-[1px] rounded-full items-center h-[46px] px-[5px] md:px-[6px] py-1 shadow-md">
        <input
          type="text"
          value={search}
          placeholder="search by country"
          onChange={(e) => setSearch(e.target.value)}
          className="outline-none px-1 md:w-[250px]"
        />

        <div
          onClick={handleSearch}
          className="cursor-pointer w-8 h-8 rounded-full flex justify-center items-center bg-[#412db3]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3.5}
            stroke="white"
            className="w-[14px] h-[14px]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </div>
      </div>

      <div className="">
        <button
          onClick={() => {
            setIsMenu(!isMenu);
          }}
          className="border-[1px] flex items-center justify-center transition p-2 sm:py-[4px] sm:px-[5px] rounded-[25px] gap-2 hover:shadow-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className=" w-6 h-6 sm:w-5 sm:h-5 sm:ml-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>

          <Avatar
            radius="xl"
            src={user?.image}
            size={"35px"}
            className="hidden sm:block"
          />
        </button>
      </div>

      {isMenu && <SideMenu setIsMenu={setIsMenu} />}
    </nav>
  );
}

export default NavBar;
