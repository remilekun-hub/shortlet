import { useCallback } from "react";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
interface Prop {
  label: string;
  selected?: boolean;
}

function SingleCategory({ label, selected }: Prop) {
  const params = useSearchParams();
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    let updatedQuery: any = {
      baths: 1,
      guests: 1,
      beds: 1,
      bedrooms: 1,
      minPrice: 0,
      maxPrice: 5000,
    };
    if (label) {
      updatedQuery = { category: label, ...updatedQuery };
    }

    if (params?.[0].get("category") === label) {
      delete updatedQuery.category;
    }

    navigate({
      pathname: "/",
      search: `${createSearchParams(updatedQuery)}`,
    });
  }, [label, params]);

  return (
    <div
      className={`flex flex-col items-center cursor-pointer p-2 text-[14px] group transition
      ${
        selected
          ? "border-b-[2px] border-black text-black"
          : "text-neutral-500 border-b-[2px] border-transparent hover:border-black/10"
      }`}
      onClick={handleClick}
    >
      <p className="group-hover:text-black">{label}</p>
      <p>icon here</p>
    </div>
  );
}

export default SingleCategory;
