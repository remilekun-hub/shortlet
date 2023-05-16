import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";

interface ReservationProp {
  image: string;
  label: string;
  propertyId: string;
  startDate?: string;
  endDate?: string;
  _id: string;
  onClick: () => void;
  price: number;
  __v: number;
}
function Reservation({ label, propertyId, _id, onClick }: ReservationProp) {
  return (
    <div>
      <Link to={`/apartment/${propertyId}`}>image here</Link>
      <div className="flex flex-col gap-3">
        <span></span>
        <span></span>
        <span></span>
        <Button label={label} onSubmit={onClick} />
      </div>
    </div>
  );
}

export default Reservation;
