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
  const country = params?.[0].get("country");
  const guests = params?.[0].get("guests");
  const beds = params?.[0].get("beds");
  const baths = params?.[0].get("baths");
  const bedrooms = params?.[0].get("bedrooms");
  const minPrice = params?.[0].get("minPrice");
  const maxPrice = params?.[0].get("maxPrice");

  const handleClick = useCallback(() => {
    let updatedQuery: any = {
      beds: beds || 1,
      baths: baths || 1,
      bedrooms: bedrooms || 1,
      guests: guests || 1,
      minPrice: minPrice || 0,
      maxPrice: maxPrice || 1000,
    };
    if (label) {
      updatedQuery = { category: label, ...updatedQuery };
    }
    if (country) {
      updatedQuery = { country: country, ...updatedQuery };
    }
    if (country && label) {
      updatedQuery = { country, category: label, ...updatedQuery };
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
