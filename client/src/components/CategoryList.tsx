import { categories } from "../data/categories";
import SingleCategory from "./category/SingleCategory";
import { useSearchParams, useLocation } from "react-router-dom";
import useFilterModalState from "../zustand/filterModal";

function CategoryList() {
  const location = useLocation();
  const homepage = "/";
  const params = useSearchParams();
  const category = params?.[0].get("category");
  const filterModal = useFilterModalState();

  if (location.pathname !== homepage) {
    return null;
  }
  return (
    <div className="bg-white pt-4 px-3 md:px-[50px] xl:px-[65px] flex items-center mx-auto max-w-[1800px]">
      <div className=" justify-center flex space-x-2 overflow-x-auto flex-1">
        {categories.map((item) => (
          <SingleCategory
            key={item.label}
            label={item.label}
            selected={category == item.label}
          />
        ))}
      </div>
      <div
        onClick={filterModal.onOpen}
        className="cursor-pointer flex flex-col items-center"
      >
        <div className="text-[14px] md:text-[14px]">Filter</div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
          />
        </svg>
      </div>
    </div>
  );
}

export default CategoryList;
