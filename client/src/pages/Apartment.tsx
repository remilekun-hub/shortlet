import { useParams } from "react-router-dom";
import { ReactElement, useEffect, useState } from "react";
import { Property } from "../typings";
import axios from "axios";
import NavBar from "../components/NavBar";
import Button from "../components/Button";
import BedroomBedandBath from "../components/BedroomBedandBath";
import { userSlice } from "../zustand/user";
import Reserve from "../components/Reserve";

function Apartment() {
  const [property, setProperty] = useState<Property | null>(null);
  const { id } = useParams();
  const user = userSlice((state) => state.user);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/v1/public/properties/${id}`)
      .then((res) => setProperty(res?.data?.property));
    console.log(property);
  }, []);

  const handleImageLayout = (images: string[]) => {
    const imagesNo = images.length;
    let imageGrid: ReactElement;
    switch (imagesNo) {
      case 5 || 6 || 7 || 8 || 9 || 10 || 11:
        imageGrid = (
          <div className="h-full grid grid-cols-4 grid-rows-2 gap-[6px]">
            <img
              src={property?.images[0]}
              className="w-full object-cover h-full object-center row-span-full col-span-2 col-start-1 col-end-3 cursor-pointer"
            />

            <img
              src={property?.images[1]}
              className="w-full object-cover h-full object-center  col-start-3 col-end-4 row-start-1 row-end-2 cursor-pointer"
            />
            <img
              src={property?.images[2]}
              className="w-full object-cover h-full object-center  col-start-4 col-end-5 row-start-1 row-end-2 cursor-pointer"
            />

            <img
              src={property?.images[3]}
              className="w-full object-cover h-full object-center  col-start-3 col-end-4 row-start-2 row-end-3 cursor-pointer"
            />
            <img
              src={property?.images[4]}
              className="w-full object-cover h-full object-center  col-start-4 col-end-4 row-start-2 row-end-3 cursor-pointer"
            />
          </div>
        );
        break;
      case 4:
        imageGrid = (
          <div className="h-full grid grid-cols-5 grid-rows-2 gap-[6px]">
            <img
              src={property?.images[0]}
              className="w-full object-cover h-full object-center row-span-full col-span-2 col-start-1 col-end-3 cursor-pointer"
            />

            <img
              src={property?.images[1]}
              className="w-full object-cover h-full object-center row-start-1 row-end-2 col-start-3 col-end-4 cursor-pointer"
            />
            <img
              src={property?.images[2]}
              className="w-full object-cover h-full object-center row-start-2 row-end-3 col-start-3 col-end-4 cursor-pointer"
            />
            <img
              src={property?.images[3]}
              className="w-full object-cover h-full object-center row-span-full col-span-2 col-start-4 col-end-6 cursor-pointer"
            />

            {/* <img
              src={property?.images[2]}
              className="w-full object-cover h-full object-center  col-start-4 col-end-5 row-start-1 row-end-2 cursor-pointer"
            />

            <img
              src={property?.images[3]}
              className="w-full object-cover h-full object-center  col-start-3 col-end-4 row-start-2 row-end-3 cursor-pointer"
            /> */}
          </div>
        );
        break;
      case 3:
        imageGrid = (
          <div className="h-full grid grid-cols-3 gap-[6px]">
            <img
              src={property?.images[0]}
              className="w-full object-cover h-full object-center cursor-pointer"
            />

            <img
              src={property?.images[1]}
              className="w-full object-cover h-full object-center cursor-pointer"
            />
            <img
              src={property?.images[2]}
              className="w-full object-cover h-full object-center cursor-pointer"
            />
          </div>
        );
        break;

      case 2:
        imageGrid = (
          <div className="h-full grid grid-cols-2 gap-[6px]">
            <img
              src={property?.images[0]}
              className="w-full object-cover h-full object-center cursor-pointer"
            />

            <img
              src={property?.images[1]}
              className="w-full object-cover h-full object-center cursor-pointer"
            />
          </div>
        );
        break;
      case 1:
        imageGrid = (
          <div className="h-full grid grid-cols-1 gap-[6px]">
            <img
              src={property?.images[0]}
              className="w-full object-cover h-full object-center cursor-pointer"
            />
          </div>
        );
        break;

      default:
        return null;
        break;
    }
    return imageGrid;
  };
  const handlereviewSubmit = () => console.log("review submited");

  return (
    <section>
      <header className=" w-full bg-white sticky top-0 shadow mb-6 z-[50]">
        <NavBar />
      </header>
      <div className="max-w-[1400px] px-5 py-4 md:px-[48px] lg:px-[50px] xl:px-[65px]">
        <div>
          {property ? (
            <>
              <div className="py-4 md:py-5">
                <h2 className="font-semibold text-2xl">{property?.title}</h2>
                <p className="font-normal underline">{`${property?.city}, ${property?.country}`}</p>
              </div>

              {property.images.length > 1 ? (
                <div className="hidden md:block h-[380px] rounded-[13px] overflow-hidden">
                  {handleImageLayout(property.images)}
                </div>
              ) : (
                <div className="hidden md:block h-full rounded-[13px] overflow-hidden">
                  <img
                    src={property.images[0]}
                    className=" w-full object-cover object-center"
                  />
                </div>
              )}

              <div className="md:pt-9 lg:pt-12 md:flex md:justify-between">
                <div className="md:basis-[55%] lg:basis-[58%]">
                  <div className="py-6 border-b-[1px] border-black/20">
                    <h3 className="text-xl font-bold md:text-2xl mb-2">{`hosted by`}</h3>
                    <div className="flex space-x-2">
                      <BedroomBedandBath
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
