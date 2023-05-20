import { useParams } from "react-router-dom";
import { ReactElement, lazy, useEffect, useState } from "react";
import { SingleProperty } from "../typings";
import axios from "axios";
import Button from "../components/Button";
import { userSlice } from "../zustand/user";
const Reserve = lazy(() => import("../components/Reserve"));
import BedroomBedandBath from "../components/BedroomBedandBath";
import ImageBlock from "../components/ImageBlock";
import Heading from "../components/Heading";
import { Avatar } from "@mantine/core";

interface Reservation {
  startDate: Date;
  endDate: Date;
}
function Apartment() {
  const { id } = useParams();
  const [property, setProperty] = useState<SingleProperty | null>(null);
  const [reservations, setReservations] = useState<Reservation[] | []>([]);
  const user = userSlice((state) => state.user);
  const handlereviewSubmit = () => {
    console.log("review submited");
  };

  useEffect(() => {
    const getProperty = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/v1/public/properties/${id}`
        );
        return data;
      } catch (error: any) {
        console.log(error);
      }
    };
    getProperty().then((data) => setProperty(data));
  }, []);

  useEffect(() => {
    const getReservations = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/v1/reservations/${id}`
        );
        return data;
      } catch (error) {
        console.log(error);
      }
    };
    getReservations().then((data) => setReservations(data));
  }, []);

  if (!property) {
    return <Heading title="wait..." subtitle="property Loading...." />;
  }

  if (property) {
    return (
      <section>
        <div className="max-w-[1250px] mx-auto px-3 sm:px-10 md:px-[48px] lg:px-[50px] xl:px-[65px]">
          <div>
            <div className="py-2 mb-4">
              <h2 className="font-semibold text-[17px] sm:text-2xl">
                {property.title}
              </h2>
              <p className="font-normal underline">{`${property.city}, ${property.country}`}</p>
            </div>

            <ImageBlock images={property.images} />

            <div className="md:pt-9 lg:pt-12 md:flex md:justify-between">
              <div className="md:basis-[52%] lg:basis-[58%] mb-6">
                <div className="mt-3 py-4 md:py-6 border-b-[1px] border-black/20 w-full flex justify-between gap-4 items-center">
                  <h3 className="text-[18px] font-bold sm:text-xl md:text-2xl mb-2">{`hosted by ${property.createdBy.name}`}</h3>

                  <Avatar
                    radius="xl"
                    src={property.createdBy.img}
                    size={"60px"}
                  />
                </div>

                <div className="py-5 sm:py-8 border-b-[1px] border-black/20">
                  <h2 className="text-3xl font-bold mb-4">
                    <span className="text-[#412db3]">Shortlet</span> Cover
                  </h2>
                  <p>
                    Every booking includes free protection from Host
                    cancellations, listing inaccuracies, and other issues like
                    trouble checking in.
                  </p>
                </div>

                <p className="py-5 sm:py-7 border-b-[1px] border-black/20">
                  {property.description}
                </p>

                <div className="py-8 border-b-[1px] border-black/20">
                  <h3>{`${property.reviews.length} reviews`}</h3>
                </div>
                <form className="flex flex-col gap-3">
                  <textarea
                    className="p-2 outline-0 border-[1px] rounded-md border-[#412db3]"
                    placeholder="Review..."
                  />
                  <Button
                    label="Submit Review"
                    disabled={!user}
                    onSubmit={handlereviewSubmit}
                  />
                </form>
              </div>

              <Reserve
                price={property.price}
                review={property.reviews.length}
                id={property._id}
                createdBy={property.createdBy.id}
                image={property.images[0]}
                reservations={reservations}
              />
            </div>
          </div>
        </div>
      </section>
    );
  }
  return <p>Looks like Something went wrong</p>;
}

export default Apartment;
