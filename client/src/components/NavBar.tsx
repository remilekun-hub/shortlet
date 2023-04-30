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

  const [userFilter, setUserFilter] = useState({
    beds: 1,
    guests: 1,
    baths: 1,
    bedrooms: 1,
    minPrice: 0,
    maxPrice: 5000,
  });
  let query: any = {};
  const handleSearch = () => {
    if (!search) return;
    if (country) {
      navigate(`/?country=${search}`);
      setSearch("");
      return;
    }
    if (currentSearch) {
      navigate(`/${currentSearch}&country=${search}`);
      setSearch("");
    } else {
      navigate(`/?country=${search}`);
      setSearch("");
    }
  };

  const handleFilter = () => {
    setUserFilter({
      beds: 1,
      guests: 1,
      baths: 1,
      bedrooms: 1,
      minPrice: 0,
      maxPrice: 5000,
    });
    setShowFilter(!showFilter);
  };

  return (
    <nav className="flex items-center justify-between mx-auto max-w-[1400px] px-3 py-4 md:px-[48px] lg:px-[50px] xl:px-[65px] relative">
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
          <div className="absolute min-h-full bg-white shadow-xl p-2 border-[1px] w-full top-[55px] left-0 z-[300] rounded-lg">
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
              value={userFilter.guests}
              title="guests"
              onChange={(value: number) => {
                setUserFilter({ ...userFilter, guests: value });
              }}
            />
            <div className="flex justify-between">
              <button
                onClick={() => {
                  setShowFilter(false);
                  navigate("/");
                }}
              >
                Clear
              </button>

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
