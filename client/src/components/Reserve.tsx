import Button from "./Button";
import { useEffect, useMemo, useState } from "react";
import { userSlice } from "../zustand/user";
import useLoginModalState from "../zustand/UseLoginModal";
import axios from "axios";
import { eachDayOfInterval, differenceInCalendarDays } from "date-fns";
import { Range } from "react-date-range";
import ReserveBlock from "./ReserveBlock";
import { useNavigate } from "react-router-dom";

interface Reservation {
  startDate: Date;
  endDate: Date;
}
interface Prop {
  price: number;
  review: number;
  id: string;
  createdBy: string;
  image: string;
  reservations: Reservation[];
}

function Reserve({ price, review, id, createdBy, image, reservations }: Prop) {
  const navigate = useNavigate();
  const [totalPrice, setTotalPrice] = useState(price);

  const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  };
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);
  const [isLoading, setIsLoading] = useState(false);

  const disabledDates = useMemo(() => {
    // map reservations to find reserved dates
    let dates: Date[] = [];
    reservations.forEach((r) => {
      const range = eachDayOfInterval({
        start: new Date(r.startDate),
        end: new Date(r.endDate),
      });

      dates = [...dates, ...range];
    });
    return dates;
  }, [reservations]);

  const user = userSlice((state) => state.user);
  const LoginModal = useLoginModalState();

  const handleReserve = async () => {
    if (!user) {
      return LoginModal.onOpen();
    }

    setIsLoading(true);
    await axios
      .post(
        "http://localhost:5000/api/v1/reservations",
        {
          startDate: dateRange.startDate,
          endDate: dateRange.endDate,
          image: image,
          price: totalPrice,
          reservedBy: user.id,
          propertyId: id,
          propertyOwner: createdBy,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .finally(() => setIsLoading(false));
    navigate(0);
  };
  useEffect(() => {
    const dayCount = differenceInCalendarDays(
      dateRange.endDate,
      dateRange.startDate
    );

    if (dayCount && price) {
      setTotalPrice(dayCount * price);
    } else {
      setTotalPrice(price);
    }
  }, [dateRange, price]);

  return (
    <div className="border-[1px] shadow-xl rounded-[13px] md:basis-[35%] lg:basis-[32%] md:sticky md:top-[70px] lg:top-[90px] h-full">
      <div className="flex justify-between p-3">
        <div className="flex items-center justify-between gap-1">
          <div className="text-xl font-semibold">${price}</div>
          <div className="text-neutral-500 font-light">night</div>
        </div>
        <div>{review} review</div>
      </div>
      <hr />
      <div>
        <ReserveBlock
          price={price}
          totalPrice={totalPrice}
          onChangeDate={(value: Range) => {
            setDateRange(value);
          }}
          dateRange={dateRange}
          onSubmit={handleReserve}
          disabled={isLoading}
          disabledDates={disabledDates}
        />
      </div>
      <div className="px-3">
        {" "}
        <Button label="Reserve" onSubmit={handleReserve} disabled={isLoading} />
      </div>
      <div className="flex justify-between font-semibold p-3 text-[18px]">
        <div>Total</div>
        <div>${totalPrice}</div>
      </div>
    </div>
  );
}

export default Reserve;
