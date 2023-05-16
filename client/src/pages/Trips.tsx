import React from "react";
import { userSlice } from "../zustand/user";
import useFetch from "../util/useFetch";
import Heading from "../components/Heading";
import Reservation from "../components/Reservation";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Trips {
  endDate: string;
  startDate: string;
  price: number;
  _id: string;
  __v: number;
  reservedBy: string;
  propertyId: string;
  propertyOwner: string;
  image: string;
}
function Trips() {
  const user = userSlice((state) => state.user);
  const navigate = useNavigate();
  const handleCancelReservation = async (id: string) => {
    await axios.delete(
      `http://localhost:5000/api/v1/reservations/trips/${id}`,
      {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      }
    );
    navigate(0);
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center pt-[100px] text-center">
        <Heading
          title="Please Log in"
          subtitle="you must be logged in to access this page"
        />
      </div>
    );
  }

  const { data, error } = useFetch<Trips[]>(
    `http://localhost:5000/api/v1/reservations/trips/${user?.id}`,
    {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    }
  );
  console.log({ data });
  if (error) {
    return (
      <div className="flex justify-center items-center pt-[100px] text-center">
        <Heading title="Oops!" subtitle="Something went wrong, try again." />
      </div>
    );
  }
  if (!data) {
    return <p>Loading.....d,fsd</p>;
  }

  if (data.length == 0) {
    return (
      <div className="flex justify-center items-center pt-[100px] text-center">
        <Heading
          title="No trips Found"
          subtitle="you haven't reserved any trips"
        />
      </div>
    );
  }
  return (
    <section className="px-4 sm:px-10 md:px-[50px] mx-auto max-w-[1800px] pb-8 ">
      <Heading
        title="Trips"
        subtitle="where you're going and where you've been"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 mt-4">
        {data.map((trip) => (
          <Reservation
            {...trip}
            label="Cancel Reservation"
            onClick={() => handleCancelReservation(trip._id)}
          />
        ))}
      </div>
    </section>
  );
}

export default Trips;
