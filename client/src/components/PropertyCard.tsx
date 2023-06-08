import { Link } from "react-router-dom";
import { PropertyCardProps } from "../typings";
import ToggleHearts from "./ToggleHearts";
import { userSlice } from "../zustand/user";
import HeartIcon from "./HeartIcon";
import useLoginModalState from "../zustand/UseLoginModal";
import Button from "./Button";
import { useMemo } from "react";
import { format } from "date-fns";

function PropertyCard({
  label,
  onSubmit,
  data,
  reservation,
}: PropertyCardProps) {
  const user = userSlice((state) => state.user);
  const loginModal = useLoginModalState();
  const reservationDate = useMemo(() => {
    if (!reservation) return null;

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [reservation]);

  return (
    <div className="relative ">
      {user ? (
        <ToggleHearts id={data._id} />
      ) : (
        <div
          className="absolute top-4 right-[11px] cursor-pointer w-8 h-8 rounded-full"
          onClick={loginModal.onOpen}
        >
          <HeartIcon />
        </div>
      )}

      <Link to={`/apartment/${data._id}`} className="flex flex-col gap-3">
        <div className="h-[300px]">
          <img
            src={data.images[0]}
            className="object-cover h-full w-full rounded-xl"
          />
        </div>
        <div className="">
          <h3 className="text-[16px] text-black font-semibold capitalize">{`${data.city}, ${data.state}, ${data.country}`}</h3>
          <h3 className="text-neutral-500 text-[14px] my-[5px]">
            {reservationDate}
          </h3>
          <p className="text-[16px] mt-1">
            <span className="font-semibold">{`$${
              reservation?.price || data.price
            }`}</span>
            <span className="text-neutral-600 ml-[6px]">night</span>
          </p>
        </div>
      </Link>
      {label && onSubmit && (
        <div className="mt-2">
          <Button label={label} onSubmit={onSubmit} />
        </div>
      )}
    </div>
  );
}

export default PropertyCard;
