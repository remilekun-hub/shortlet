import useFetch from "../util/useFetch";
import { userSlice } from "../zustand/user";
import Heading from "../components/Heading";
import { Loader } from "@mantine/core";
import PropertyCard from "../components/PropertyCard";
import { Property, Reservation } from "../typings";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Reservations() {
  const user = userSlice((state) => state.user);
  const navigate = useNavigate();

  type ReservationProp = {
    reservation: Reservation;
    reservationListing: Property;
  };

  const { data, error } = useFetch<ReservationProp[]>(
    "http://localhost:5000/api/v1/reservations",
    {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    }
  );

  const handleCancelGuestReservation = async (id: string) => {
    await axios
      .delete(`http://localhost:5000/api/v1/reservations/${id}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then(() => navigate(0))
      .catch((err) => console.log(err));
  };

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
          title="No Reservation Found"
          subtitle="You have no reservations on your properties"
        />
      </div>
    );
  }
  return (
    <section className="px-3 sm:px-10 md:px-[40px] mx-auto max-w-[1800px] pb-[30px]">
      <Heading title="Reservations" subtitle="Bookings on your Properties" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 mt-4">
        {data.map((reservation) => (
          <PropertyCard
            key={reservation.reservation._id}
            data={reservation.reservationListing}
            reservation={reservation.reservation}
            label="Cancel guest reservation"
            onSubmit={() =>
              handleCancelGuestReservation(reservation.reservation._id)
            }
          />
        ))}
      </div>
    </section>
  );
}

export default Reservations;
