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
    <div className="bg-white pt-4 px-3 md:px-[48px] lg:px-[50px] xl:px-[65px] flex items-center mx-auto max-w-[1800px]">
      <div className=" justify-center flex space-x-2 overflow-x-auto flex-1">
        {categories.map((item) => (
          <SingleCategory
            key={item.label}
            label={item.label}
            selected={category == item.label}
          />
        ))}
      </div>
      <div onClick={filterModal.onOpen} className="cursor-pointer">
        Filter
      </div>
    </div>
  );
}

export default CategoryList;
