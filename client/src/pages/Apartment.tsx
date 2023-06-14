import { useParams } from "react-router-dom";
import { lazy, useEffect, useState } from "react";
import { SingleProperty } from "../typings";
import axios from "axios";
import Button from "../components/Button";
import { userSlice } from "../zustand/user";
const Reserve = lazy(() => import("../components/Reserve"));
import ImageBlock from "../components/ImageBlock";
import Heading from "../components/Heading";
import { Skeleton } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import Review from "../components/Review";

interface Reservation {
  startDate: Date;
  endDate: Date;
}
function Apartment() {
  const { id } = useParams();
  const [property, setProperty] = useState<SingleProperty | null>(null);
  const [reservations, setReservations] = useState<Reservation[] | []>([]);
  const user = userSlice((state) => state.user);
  const [reviewMessage, setReviewMessage] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState(false);

  useEffect(() => {
    const getProperty = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/v1/public/properties/${id}`
        );
        return data;
      } catch (e) {
        setError(true);
        console.log(e);
      }
    };
    getProperty().then((data) => setProperty(data));
  }, []);
  console.log(property);
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

  const handlereviewSubmit = async (propertyId: string) => {
    if (!reviewMessage) return;
    if (user) {
      await axios
        .post(
          `http://localhost:5000/api/v1/properties/${propertyId}/review`,
          {
            message: reviewMessage,
          },
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        )
        .then(() => navigate(0))
        .finally(() => setReviewMessage(""));
    }
  };
  if (error) {
    return (
      <div className="flex justify-center items-center pt-[100px] text-center">
        <Heading title="Oops!" subtitle="Error fetching data." />
      </div>
    );
  }
  if (!property) {
    return (
      <div className="max-w-[1300px] mx-auto px-3 sm:px-10 md:px-[40px] xl:px-[65px] pb-10">
        <div className="mt-9 mb-4 max-w-[600px]">
          <Skeleton height={27} />
          <div className="mt-3 mb-7 max-w-[150px]">
            <Skeleton height={20} />
          </div>
        </div>
        <div className="h-[330px] md:h-[380px] rounded-[13px] overflow-hidden mt-3">
          <Skeleton height={"100%"} />
        </div>
      </div>
    );
  }

  if (property) {
    return (
      <section>
        <div className="max-w-[1300px] mx-auto px-3 sm:px-10 md:px-[40px] xl:px-[65px] pb-10">
          <div>
            <div className="py-2 mb-4">
              <h2 className="font-semibold text-[17px] sm:text-2xl">
                {property.title}
              </h2>
              <p className="font-normal underline">{`${property.city}, ${property.state}, ${property.country}`}</p>
            </div>

            <ImageBlock images={property.images} />

            <div className="md:pt-9 lg:pt-12 md:flex md:justify-between">
              <div className="md:basis-[52%] lg:basis-[58%] mb-6">
                <div className="mt-3 py-4 md:py-5 border-b-[1px] border-black/20 w-full flex justify-between gap-4 items-center">
                  <h3 className="text-[18px] font-semibold sm:text-xl md:text-[22px] mb-2">{`hosted by ${property.createdBy.name}`}</h3>

                  <img
                    src={property.createdBy.img}
                    className="w-14 h-14 rounded-full object-fit object-cover"
                    loading="lazy"
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
                <div className="py-5 sm:py-7 border-b-[1px] border-black/20">
                  <p className="font-semibold mb-3 sm:text-[22px] text-black">
                    About this place
                  </p>
                  <p>{property.description}</p>
                </div>

                <div className="py-5 sm:py-7 border-b-[1px] border-black/20">
                  <p className="font-semibold mb-3 sm:text-[22px] text-black">
                    What this place Offers
                  </p>

                  <div className="grid grid-cols-2 max-w-[300px]">
                    {property.amenities.map((item) => (
                      <li className="list-none">{item}</li>
                    ))}
                  </div>
                </div>

                <form
                  className="flex flex-col gap-3 mt-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handlereviewSubmit(property._id);
                  }}
                >
                  <p className="mb-2">
                    Tell us experience about this property and the host
                  </p>
                  <textarea
                    className="p-2 mb-2 outline-0 border-[1px] rounded-md border-[#412db3]"
                    placeholder="Review..."
                    value={reviewMessage}
                    onChange={(e) => setReviewMessage(e.target.value)}
                    disabled={!user}
                  />
                  <Button label="Submit Review" disabled={!user} />
                </form>
              </div>

              <Reserve
                price={property.price}
                review={property.reviews.length}
                id={property._id}
                createdBy={property.createdBy.id}
                image={property.images[0]}
                reservations={reservations}
                city={property.city}
                country={property.country}
                state={property.state}
              />
            </div>
          </div>

          <div className="py-8 border-t-[1px] border-black/20 mt-8">
            <h3 className="mb-3">{`${property.reviews.length} reviews`}</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-[12%] mt-[25px] max-w-[1000px]">
              {property.reviews.map((r) => (
                <Review key={r._id} {...r} />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }
  return (
    <div className="flex justify-center items-center pt-[100px] text-center">
      <Heading title="Oops!" subtitle="Error fetching data." />
    </div>
  );
}

export default Apartment;
