import { DatePickerInput } from "@mantine/dates";
import Button from "./Button";
import { useMemo, useState } from "react";
import { calcDate } from "../util/calcDate";
import { userSlice } from "../zustand/user";
import useLoginModalState from "../zustand/UseLoginModal";
import axios from "axios";

interface Prop {
  price: number;
  review: number;
  id: string;
  createdBy: string;
  image: string;
}

function Reserve({ price, review, id, createdBy, image }: Prop) {
  const [value, setValue] = useState<[Date | null, Date | null]>([null, null]);
  const numberofNights = useMemo(() => calcDate(value), [value]);

  const user = userSlice((state) => state.user);
  const LoginModal = useLoginModalState();

  const handleReserve = async () => {
    if (!user) {
      return LoginModal.onOpen();
    }
    if (!value[0] || !value[1]) {
      return;
    }
    if (!numberofNights) return;

    await axios.post("j", {
      startDate: value[0],
      endDate: value[1],
      image: image,
      price: numberofNights * price,
      reservedBy: user.id,
      propertyId: id,
      propertyOwner: createdBy,
    });
  };

  const serviceFee = (): number | undefined => {
    if (numberofNights != null) {
      return numberofNights * price * 0.13;
    }
    return undefined;
  };

  return (
    <div className="p-6 md:border-[1px] border-black/10 shadow-xl rounded-[13px] md:basis-[35%] lg:basis-[32%] md:sticky md:top-[70px] lg:top-[90px] h-full">
      <div className="flex justify-between">
        <div>
          <span className="font-bold text-xl">{`$${price}`} </span>
          <span>night</span>
        </div>
        <div>{`${review} reviews`}</div>
      </div>

      <DatePickerInput
        clearable
        type="range"
        label="Pick dates range "
        placeholder="Pick check-in and checkout dates"
        value={value}
        onChange={setValue}
        mb={16}
        mx="auto"
        minDate={new Date()}
      />
      <Button label="Reserve" onSubmit={handleReserve} />
      <p className="text-center mt-4 text-[15px]">You won't be charged yet</p>

      {numberofNights != null && (
        <div className="mt-4 pb-6 border-b-[1px] border-black/20">
          <div className="flex justify-between">
            <p className="underline">{`$${price} x ${numberofNights} nights`}</p>
            <p>{`$${numberofNights * price}`}</p>
          </div>

          <div className="flex justify-between mt-3">
            <p className="underline">Shortlet service fee</p>
            <p>{`$${serviceFee()}`}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Reserve;
