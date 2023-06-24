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
    <div className=" bg-white pt-4 px-4 sm:px-10 md:px-[40px] flex items-center mx-auto max-w-[1800px]">
      <div className=" scrollbar scrollbar-h-[4px] scrollbar-thumb-rounded-[10px] scrollbar-thumb-gray-500 justify-start 2xl:justify-center flex gap-x-2 sm:gap-x-4 md:gap-x-6 overflow-x-auto flex-1">
        {categories.map((item) => (
          <SingleCategory
            key={item.label}
            label={item.label}
            image={item.image}
            selected={category == item.label}
          />
        ))}
      </div>
      <div
        onClick={filterModal.onOpen}
        className="cursor-pointer flex gap-2 items-center p-[4px] md:p-3 border-0 md:border-[1px] rounded-xl"
      >
        <svg
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          role="presentation"
          focusable="false"
          className="w-4 h-4"
        >
          <path d="M5 8c1.306 0 2.418.835 2.83 2H14v2H7.829A3.001 3.001 0 1 1 5 8zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm6-8a3 3 0 1 1-2.829 4H2V4h6.17A3.001 3.001 0 0 1 11 2zm0 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"></path>
        </svg>
        <div className="hidden text-[14px] md:text-[14px] sm:block">
          Filters
        </div>
      </div>
    </div>
  );
}

export default CategoryList;
