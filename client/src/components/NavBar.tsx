import { useState } from "react";
import SideMenu from "./SideMenu";
import { Avatar } from "@mantine/core";
import { userSlice } from "../zustand/user";
import {
  useNavigate,
  useLocation,
  useSearchParams,
  createSearchParams,
} from "react-router-dom";
import ApartmentFilter from "./ApartmentFilter";
import { RangeSlider } from "@mantine/core";

function NavBar() {
  const [isMenu, setIsMenu] = useState(false);
  const user = userSlice((state) => state.user);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const location = useLocation();
  const currentSearch = location.search;
  const params = useSearchParams();
  const country = params?.[0].get("country");
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

  return (
    <nav className="flex items-center justify-between mx-auto max-w-[1400px] px-3 py-4 md:px-[48px] lg:px-[50px] relative">
      <span className="hidden md:block">logo here</span>

      <div className="relative">
        <div className="flex border-[1px] rounded-full items-center h-[48px] px-[8px] py-4 shadow-md">
          <input
            type="search"
            name=""
            id=""
            value={search}
            placeholder="search by country"
            onChange={(e) => setSearch(e.target.value)}
            className="outline-none"
          />
          <span
            onClick={() => setShowFilter(!showFilter)}
            className="cursor-pointer mx-1 w-8 h-8 rounded-full flex justify-center items-center bg-rose-400"
          >
            f
          </span>
          <span
            onClick={handleSearch}
            className="cursor-pointer w-8 h-8 rounded-full flex justify-center items-center bg-rose-400"
          >
            G
          </span>
        </div>

        {showFilter && (
          <div className="absolute min-h-full bg-white shadow-xl p-2 border-[1px] w-full top-[63px] left-0 z-[300] rounded-lg">
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
                className="text-white bg-black px-3 py-1 rounded-sm"
              >
                Filter
              </button>
            </div>
          </div>
        )}
      </div>

      <button
        onClick={() => setIsMenu(!isMenu)}
        className="flex items-center justify-center py-[7px] px-2 rounded-[25px] gap-1 shadow-md"
      >
        <div>heu</div>
        <Avatar radius="xl" src={user?.image} size={"md"} />
      </button>

      {isMenu && <SideMenu setIsMenu={setIsMenu} />}
    </nav>
  );
}

export default NavBar;
