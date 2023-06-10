import { userSlice } from "../zustand/user";
import useFetch from "../util/useFetch";
import Heading from "../components/Heading";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PropertyCard from "../components/PropertyCard";
import { Property, Reservation } from "../typings";
import { Loader } from "@mantine/core";

function Trips() {
  const user = userSlice((state) => state.user);
  const navigate = useNavigate();

  const handleCancelTrip = async (id: string) => {
    await axios
      .delete(`http://localhost:5000/api/v1/reservations/trips/${id}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then(() => navigate(0));
  };

  type TripsProp = {
    reservation: Reservation;
    reservationListing: Property;
  };
  const { data, error } = useFetch<TripsProp[]>(
    "http://localhost:5000/api/v1/reservations/trips",
    {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    }
  );
  if (error) {
    return (
      <div className="flex justify-center items-center pt-[100px] text-center">
        <Heading title="Oops!" subtitle="Something went wrong, try again." />
      </div>
    );
  }
  if (!data) {
    return (
      <div className="h-[60vh] flex justify-center items-center">
        <Loader size={"md"} color="#412db3" />
      </div>
    );
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
    <section className="px-4 sm:px-10 md:px-[50px] mx-auto max-w-[1800px] pb-[30px] ">
      <Heading
        title="Trips"
        subtitle="where you're going and where you've been"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 mt-4">
        {data.map((trip) => (
          <PropertyCard
            key={trip.reservation._id}
            data={trip.reservationListing}
            reservation={trip.reservation}
            label="Cancel Trip"
            onSubmit={() => handleCancelTrip(trip.reservation._id)}
          />
        ))}
      </div>
    </section>
  );
}

export default Trips;
