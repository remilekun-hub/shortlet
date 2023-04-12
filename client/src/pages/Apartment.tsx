import { useParams } from "react-router-dom";
import { DatePickerInput, DatePicker } from "@mantine/dates";
import { useEffect, useState, useMemo } from "react";
import { calcDate } from "../util/calcDate";
import { Property } from "../typings";
import axios from "axios";
import NavBar from "../components/NavBar";
import Button from "../components/Button";

function Apartment() {
  const [property, setProperty] = useState<Property | null>(null);
  const { id } = useParams();
  const [value, setValue] = useState<[Date | null, Date | null]>([null, null]);
  const numberofNights = useMemo(() => calcDate(value), [value]);

  const handleChange = (val: [Date | null, Date | null]) => {
    if (val[0] !== null && val[1] !== null) {
      setValue(val);
    }
  };
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/v1/properties/${id}`)
      .then((res) => setProperty(res?.data?.property));
    console.log(property);
  }, []);

  return (
    <section>
      <header className="border-b border-black/20">
        <NavBar />
      </header>

      <div className="mx-auto max-w-screen-xl xl:px-[80px]">
        <div>
          {property ? (
            <>
              <div>
                <h2 className="font-semibold text-2xl">{property?.title}</h2>
                <p className="font-normal underline">{`${property?.address}, ${property?.city}, ${property?.country}`}</p>
              </div>
              <div>
                <h3>{property?.description}</h3>
              </div>
              <div>
                <img
                  src={property?.photos[0]}
                  className="w-full object-cover h-full"
                />
              </div>
              <div className="flex">
                <div className="">
                  <p>{property?.name}</p>
                  <div className="flex space-x-2">
                    <div className="flex items-center">
                      <span className="w-[2px] h-[2px] rounded-full bg-black mr-1" />
                      <span>{`${property?.bedroom} bedroom`}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-[2px] h-[2px] rounded-full bg-black mr-1" />
                      <span>{`${property?.bed} bed`}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-[2px] h-[2px] rounded-full bg-black mr-1" />
                      <span>{`${property?.bath} bath`}</span>
                    </div>
                  </div>
                </div>

                <div className="shadow-lg rounded-lg">
                  <div className="flex justify-between">
                    <div>
                      {" "}
                      <span className="font-bold text-xl">{`$${property?.price}`}</span>
                      <span>night</span>
                    </div>
                    <div>{`${property?.reviews.length} reviews`}</div>
                  </div>
                  <DatePickerInput
                    clearable
                    type="range"
                    label="Pick check-in and checkout dates"
                    placeholder="Pick dates range"
                    value={value}
                    onChange={setValue}
                    // numberOfColumns={2}
                    // mx="auto"
                    minDate={new Date()}
                  />
                  <Button label="Check availability" />
                </div>
              </div>
            </>
          ) : (
            "no prop"
          )}
        </div>
      </div>

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
