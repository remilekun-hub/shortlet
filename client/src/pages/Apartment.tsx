import { useParams } from "react-router-dom";
import { DatePickerInput, DatePicker } from "@mantine/dates";
import { useEffect, useState, useMemo } from "react";
import { calcDate } from "../util/calcDate";
import { Property } from "../typings";
import { Skeleton } from "@mantine/core";
import axios from "axios";
import NavBar from "../components/NavBar";
import Button from "../components/Button";
import BedroomBedandBath from "../components/BedroomBedandBath";
import { userSlice } from "../zustand/user";

function Apartment() {
  const [property, setProperty] = useState<Property | null>(null);
  const { id } = useParams();
  const [value, setValue] = useState<[Date | null, Date | null]>([null, null]);
  const numberofNights = useMemo(() => calcDate(value), [value]);
  const user = userSlice((state) => state.user);
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

  const handlereviewSubmit = () => console.log("review submited");
  return (
    <section>
      <header className="border-b border-black/20">
        <NavBar />
      </header>

      <div className="mx-auto max-w-screen-xl px-5 sm:px-11 xl:px-[80px]">
        <div>
          {property ? (
            <>
              <div className="py-4 md:py-5">
                <h2 className="font-semibold text-2xl">{property?.title}</h2>
                <p className="font-normal underline">{`${property?.address}, ${property?.city}, ${property?.country}`}</p>
              </div>

              <div className="h-[350px] rounded-[13px] overflow-hidden">
                <img
                  src={property?.photos[0]}
                  className="w-full object-cover h-full object-center"
                />
              </div>
              <div className="md:pt-9 lg:pt-12 md:flex md:justify-between">
                <div className="md:basis-[55%] lg:basis-[58%]">
                  <div className="py-6 border-b-[1px] border-black/20">
                    <h3 className="text-xl font-bold md:text-2xl">{`${property?.name} hosted by`}</h3>
                    <div className="flex space-x-2">
                      <BedroomBedandBath
                        amount={property?.bedroom}
                        type="bedroom"
                      />
                      <BedroomBedandBath amount={property?.bath} type="bath" />
                      <BedroomBedandBath amount={property?.bed} type="bed" />
                    </div>
                  </div>

                  <div className="py-8 border-b-[1px] border-black/20">
                    <h2 className="text-3xl font-bold mb-4">
                      <span className="text-rose-500">Shortlet</span> Cover
                    </h2>
                    <p>
                      Every booking includes free protection from Host
                      cancellations, listing inaccuracies, and other issues like
                      trouble checking in.
                    </p>
                  </div>

                  <p className="py-8 border-b-[1px] border-black/20">
                    {property?.description}
                  </p>

                  <div className="py-8 border-b-[1px] border-black/20">
                    <h2 className="font-bold text-xl md:text-2xl">
                      What this place offers
                    </h2>
                  </div>
                  <div className="py-8 border-b-[1px] border-black/20">
                    <h3>{`${property?.reviews.length} reviews`}</h3>
                  </div>
                  <form className="flex flex-col gap-3">
                    <input
                      type="text"
                      name=""
                      id=""
                      className="outline-0 border-[1px] border-rose-500 p-2 rounded-md"
                      placeholder="Name"
                    />
                    <textarea
                      className="p-2 outline-0 border-[1px] rounded-md border-rose-500"
                      placeholder="Review..."
                    />
                    <Button
                      label="Submit Review"
                      disabled={!user}
                      onSubmit={handlereviewSubmit}
                    />
                  </form>
                </div>

                <div className="p-6 border-[1px] border-black/10 shadow-xl rounded-[13px] md:basis-[35%] lg:basis-[32%] md:sticky md:top-[70px] lg:top-[90px] h-full">
                  <div className="flex justify-between">
                    <div>
                      {" "}
                      <span className="font-bold text-xl">
                        {`$${property?.price}`}{" "}
                      </span>
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
                  <Button label="Reserve" />
                  <p className="text-center mt-4 text-sm">
                    You won't be charged yet
                  </p>
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
