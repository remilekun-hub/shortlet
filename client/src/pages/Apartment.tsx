import { useParams } from "react-router-dom";
import { ReactElement, lazy, useEffect, useState } from "react";
import { SingleProperty } from "../typings";
import axios from "axios";
import Button from "../components/Button";
import { userSlice } from "../zustand/user";
const Reserve = lazy(() => import("../components/Reserve"));
import BedroomBedandBath from "../components/BedroomBedandBath";
import ImageBlock from "../components/ImageBlock";
import useFetch from "../util/useFetch";

function Apartment() {
  const { id } = useParams();
  const [property, setProperty] = useState<SingleProperty | null>(null);
  const user = userSlice((state) => state.user);
  const handlereviewSubmit = () => console.log("review submited");

  const { data, error } = useFetch(
    `http://localhost:5000/api/v1/public/properties/${id}`
  );
  console.log({ data });

  return (
    <section>
      <div className="max-w-[1400px] px-5 py-1 md:px-[48px] lg:px-[50px] xl:px-[65px]">
        <div>
          {property ? (
            <>
              <div className="py-4 md:py-5">
                <h2 className="font-semibold text-2xl">{property?.title}</h2>
                <p className="font-normal underline">{`${property?.city}, ${property?.country}`}</p>
              </div>

              <ImageBlock images={property.images} />

              <div className="md:pt-9 lg:pt-12 md:flex md:justify-between">
                <div className="md:basis-[55%] lg:basis-[58%]">
                  <div className="py-6 border-b-[1px] border-black/20">
                    <h3 className="text-xl font-bold md:text-2xl mb-2">{`hosted by `}</h3>
                    <div className="flex space-x-2">
                      {/* <BedroomBedandBath
                        amount={property?.guests}
                        type="guests"
                      />

                      <BedroomBedandBath
                        amount={property?.bedrooms}
                        type="bedroom"
                      />
                      <BedroomBedandBath
                        amount={property?.bathrooms}
                        type="bath"
                      />
                      <BedroomBedandBath amount={property?.bed} type="bed" /> */}
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

                <Reserve
                  price={property?.price}
                  review={property?.reviews.length}
                  id={property?._id}
                  createdBy={property?.createdBy.id}
                  image={property?.images[0]}
                />
              </div>
            </>
          ) : (
            "no property"
          )}
        </div>
      </div>
    </section>
  );
}

export default Apartment;
