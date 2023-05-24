import React from "react";
import { Range } from "react-date-range";
import Calendar from "./Calendar";
import Button from "./Button";

interface ReserveBlockProps {
  price: number;
  dateRange: Range;
  totalPrice: number;
  review: number;
  onChangeDate: (value: Range) => void;
  onSubmit: () => void;
  disabled: boolean;
  disabledDates: Date[];
}

function ReserveBlock({
  price,
  dateRange,
  totalPrice,
  onChangeDate,
  onSubmit,
  review,
  disabled,
  disabledDates,
}: ReserveBlockProps) {
  return (
    <div>
      <div className="flex justify-between px-3 py-4">
        <div className="flex items-center justify-between gap-1">
          <div className="text-xl font-semibold">${price}</div>
          <div className="text-neutral-500 font-light">night</div>
        </div>
        <div>{review} review</div>
      </div>
      <hr />
      <Calendar
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => onChangeDate(value.selection)}
      />
      <div className="px-3">
        {" "}
        <Button label="Reserve" onSubmit={onSubmit} disabled={disabled} />
      </div>
      <div className="flex justify-between font-semibold px-3 py-4 text-[18px]">
        <div>Total</div>
        <div>${totalPrice}</div>
      </div>
    </div>
  );
}

export default ReserveBlock;
