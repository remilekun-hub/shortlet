import { useState } from "react";
import SideMenu from "./SideMenu";
import { Avatar } from "@mantine/core";
import { userSlice } from "../zustand/user";
import {
  useNavigate,
  useSearchParams,
  createSearchParams,
  Link,
} from "react-router-dom";
import ApartmentFilter from "./ApartmentFilter";
import { RangeSlider } from "@mantine/core";
import useLoginModalState from "../zustand/UseLoginModal";
import useListingModalState from "../zustand/listingModal";

function NavBar() {
  const [isMenu, setIsMenu] = useState(false);
  const user = userSlice((state) => state.user);
  const loginModal = useLoginModalState();
  const listingModal = useListingModalState();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const params = useSearchParams();
  const category = params?.[0].get("category");

  const [userFilter, setUserFilter] = useState({
    beds: 1,
    guests: 1,
    baths: 1,
    bedrooms: 1,
    minPrice: 0,
    maxPrice: 1000,
  });
  const [rangeValue, setRangeValue] = useState<[number, number]>([
    userFilter.minPrice,
    userFilter.maxPrice,
  ]);

  const handleSearch = () => {
    let query: any = { ...userFilter };
    if (search) {
      query = { country: search, ...query };
    }
    if (category) {
      query = { category, ...query };
    }
    navigate({
      pathname: "/",
      search: `${createSearchParams(query)}`,
    });
    setShowFilter(false);
  };
  const reset = () => {
    setUserFilter({
      beds: 1,
      guests: 1,
      baths: 1,
      bedrooms: 1,
      minPrice: 0,
      maxPrice: 1000,
    });
    setSearch("");
    setRangeValue([userFilter.minPrice, userFilter.maxPrice]);
    setShowFilter(false);
    navigate("/");
  };
  const handleFilter = () => {
    if (search) {
      navigate(
        `/?country=${search}&beds=${userFilter.beds}&bedrooms=${userFilter.bedrooms}&baths=${userFilter.baths}&guests=${userFilter.guests}&minPrice=${rangeValue[0]}&maxPrice=${rangeValue[1]}`
      );
      setSearch("");
    } else {
      navigate(
        `/?beds=${userFilter.beds}&bedrooms=${userFilter.bedrooms}&baths=${userFilter.baths}&guests=${userFilter.guests}&minPrice=${rangeValue[0]}&maxPrice=${rangeValue[1]}`
      );
    }
    setShowFilter(!showFilter);
  };

  const handleCreate = () => {
    if (!user) {
      return loginModal.onOpen();
    }
    listingModal.onOpen();
  };

  return (
    <nav className="flex items-center justify-center sm:justify-between mx-auto max-w-[1800px] px-4 py-4 sm:px-10 md:px-[50px] relative ">
      <div
        className="absolute right-[160px] hidden lg:block cursor-pointer"
        onClick={handleCreate}
      >
        Shortlet your home
      </div>
      <Link to={"/"} className="hidden md:block">
        logo here
      </Link>

      <div className="relative">
        <div className="flex border-[1px] rounded-full items-center h-[48px] pl-[8px] pr-[2px] py-4 shadow-md">
          <input
            type="search"
            name=""
            id=""
            value={search}
            placeholder="search by country"
            onChange={(e) => setSearch(e.target.value)}
            className="outline-none pl-1"
          />

          <span
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
          </span>
          <span
            onClick={() => {
              setShowFilter(!showFilter);
              setIsMenu(false);
            }}
            className="cursor-pointer mx-1 w-8 h-8 rounded-full flex justify-center items-center bg-[#412db3] text-white"
          >
            f
          </span>
        </div>

        {showFilter && (
          <div className="absolute min-h-full bg-white shadow-xl p-2 border-[1px] w-full top-[59px] left-0 z-[300] rounded-lg">
            <ApartmentFilter
              value={userFilter.beds}
              title="beds"
              onChange={(value: number) => {
                setUserFilter({ ...userFilter, beds: value });
              }}
            />
            <ApartmentFilter
              value={userFilter.baths}
              title="baths"
              onChange={(value: number) => {
                setUserFilter({ ...userFilter, baths: value });
              }}
            />
            <ApartmentFilter
              value={userFilter.bedrooms}
              title="bedrooms"
              onChange={(value: number) => {
                setUserFilter({ ...userFilter, bedrooms: value });
              }}
            />
            <ApartmentFilter
              value={userFilter.guests}
              title="guests"
              onChange={(value: number) => {
                setUserFilter({ ...userFilter, guests: value });
              }}
            />

            <div className="flex items-center justify-between">
              <span className="mr-3">Price</span>
              <div className="w-full">
                <RangeSlider
                  value={rangeValue}
                  onChange={setRangeValue}
                  min={0}
                  max={1000}
                />
              </div>
            </div>

            <div className="flex justify-between">
              <button onClick={reset}>Clear</button>

              <button
                onClick={handleFilter}
                className="text-white bg-black py-1 rounded-sm"
              >
                Filter
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="hidden sm:block">
        <button
          onClick={() => {
            setIsMenu(!isMenu);
            setShowFilter(false);
          }}
          className="border-[1px] flex items-center justify-center transition py-[4px] px-[5px] rounded-[25px] gap-2 hover:shadow-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 ml-[5px]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>

          <Avatar radius="xl" src={user?.image} size={"35px"} />
        </button>
      </div>

      {isMenu && <SideMenu setIsMenu={setIsMenu} />}
    </nav>
  );
}

export default NavBar;
