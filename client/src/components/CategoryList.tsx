import { categories } from "../data/categories";
import SingleCategory from "./category/SingleCategory";
import { useSearchParams, useLocation } from "react-router-dom";

function CategoryList() {
  const location = useLocation();
  const homepage = "/";
  const params = useSearchParams();
  const category = params?.[0].get("category");

  if (location.pathname !== homepage) {
    return null;
  }
  return (
    <div className="bg-white pt-4 md:px-[48px] lg:px-[50px] xl:px-[55px] flex">
      <div className="mx-auto max-w-[1800px] justify-center flex space-x-2 overflow-x-auto flex-1">
        {categories.map((item) => (
          <SingleCategory
            key={item.label}
            label={item.label}
            selected={category == item.label}
          />
        ))}
      </div>
      <div>filter here</div>
    </div>
  );
}

export default CategoryList;
