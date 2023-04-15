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
    let updatedQuery: any = {};
    if (label) {
      updatedQuery = { ...updatedQuery, category: label };
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
      className={`flex flex-col items-center
      ${
        selected
          ? "border-b-[2px] border-black text-black"
          : "border-transparent text-neutral-500"
      }`}
      onClick={handleClick}
    >
      <p>{label}</p>
      <p>icon here</p>
    </div>
  );
}

export default SingleCategory;
