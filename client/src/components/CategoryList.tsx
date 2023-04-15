import { categories } from "../categories";
import SingleCategory from "./category/SingleCategory";
import { useSearchParams } from "react-router-dom";

function CategoryList() {
  const params = useSearchParams();
  const category = params?.[0].get("category");

  return (
    <div className="flex space-x-2 overflow-x-auto">
      {categories.map((item) => (
        <SingleCategory
          key={item.label}
          label={item.label}
          selected={category == item.label}
        />
      ))}
    </div>
  );
}

export default CategoryList;
