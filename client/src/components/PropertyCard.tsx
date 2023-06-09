import { Link } from "react-router-dom";
import { PropertyCardProps } from "../typings";
import ToggleHearts from "./ToggleHearts";
import { userSlice } from "../zustand/user";
import HeartIcon from "./HeartIcon";
import useLoginModalState from "../zustand/UseLoginModal";
import Button from "./Button";
import { useMemo } from "react";
import { format } from "date-fns";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useNavigate } from "react-router-dom";

function PropertyCard({
  label,
  onSubmit,
  data,
  reservation,
}: PropertyCardProps) {
  const user = userSlice((state) => state.user);
  const loginModal = useLoginModalState();
  const navigate = useNavigate();

  const reservationDate = useMemo(() => {
    if (!reservation) return null;

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [reservation]);

  return (
    <div className="relative ">
      <div
        className="flex flex-col gap-3"
        onClick={() => navigate(`/apartment/${data._id}`)}
      >
        <div className="h-[300px]">
          <LazyLoadImage
            src={data.images[0]}
            className="object-cover h-full w-full rounded-xl absolute z-[-200]"
            effect="blur"
            height={300}
            width={"100%"}
            alt={`apartment ${data._id} image`}
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
        <div onClick={(e) => e.stopPropagation()}>
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
        </div>
      </div>
      {label && onSubmit && (
        <div className="mt-2">
          <Button label={label} onSubmit={onSubmit} />
        </div>
      )}
    </div>
  );
}

export default PropertyCard;
