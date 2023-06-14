import Button from "./Button";
import { useCallback, useEffect, useMemo, useState } from "react";
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
  state: string;
  reservations: Reservation[] | undefined;
  city: string;
  country: string;
}

function Reserve({ price, review, id, createdBy, reservations }: Prop) {
  const navigate = useNavigate();
  const user = userSlice((state) => state.user);
  const LoginModal = useLoginModalState();

  const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  };

  const disabledDates = useMemo(() => {
    // map reservations to find reserved dates

    if (reservations) {
      let dates: Date[] = [];
      reservations.forEach((r) => {
        const range = eachDayOfInterval({
          start: new Date(r.startDate),
          end: new Date(r.endDate),
        });

        dates = [...dates, ...range];
      });
      return dates;
    } else return [];
  }, [reservations]);

  const [dateRange, setDateRange] = useState<Range>(initialDateRange);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(price);

  const createReservation = useCallback(() => {
    if (!user) {
      return LoginModal.onOpen();
    }
    setIsLoading(true);
    axios
      .post(
        "http://localhost:5000/api/v1/reservations",
        {
          startDate: dateRange.startDate,
          endDate: dateRange.endDate,
          price: totalPrice,
          propertyId: id,
          propertyOwner: createdBy,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then(() => {
        setDateRange(initialDateRange);
        navigate("/trips");
      })
      .finally(() => setIsLoading(false));
  }, [user, totalPrice, dateRange, LoginModal]);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      );

      if (dayCount && price) {
        setTotalPrice(dayCount * price);
      } else {
        setTotalPrice(price);
      }
    }
  }, [dateRange, price]);

  return (
    <div className="border-[1px] rounded-[13px] md:basis-[35%] lg:basis-[32%] md:sticky md:top-[95px] lg:top-[105px] h-full shadow-lg">
      <div>
        <ReserveBlock
          price={price}
          totalPrice={totalPrice}
          onChangeDate={(value: Range) => {
            setDateRange(value);
          }}
          dateRange={dateRange}
          review={review}
          onSubmit={createReservation}
          disabled={isLoading || !user}
          disabledDates={disabledDates}
        />
      </div>
    </div>
  );
}

export default Reserve;
