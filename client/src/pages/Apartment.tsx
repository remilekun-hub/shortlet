import { useParams } from "react-router-dom";
import { DatePickerInput, DatePicker } from "@mantine/dates";
import { useState } from "react";
import { calcDate } from "../util/calcDate";
import { Link } from "react-router-dom";

function Apartment() {
  const { id } = useParams();
  const [value, setValue] = useState<[Date | null, Date | null]>([null, null]);
  const me = calcDate(value);

  const handleChange = (val: [Date | null, Date | null]) => {
    if (val[0] !== null && val[1] !== null) {
      setValue(val);
    }
  };

  return (
    <section>
      Hotel: {id}
      <DatePickerInput
        clearable
        type="range"
        label="Pick dates range"
        placeholder="Pick dates range"
        value={value}
        onChange={setValue}
        // numberOfColumns={2}
        // mx="auto"
        maw={292}
        minDate={new Date()}
      />
      {me}
      {/* <DatePicker
        type="range"
        value={value}
        numberOfColumns={2}
        minDate={new Date()}
        onChange={handleChange}
      /> */}
    </section>
  );
}

export default Apartment;
