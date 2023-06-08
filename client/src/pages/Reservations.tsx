import useFetch from "../util/useFetch";
import { userSlice } from "../zustand/user";
import Heading from "../components/Heading";
import { Skeleton } from "@mantine/core";
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
      <section className="px-4 sm:px-10 md:px-[40px] mx-auto max-w-[1800px]">
        <div className="w-[180px]">
          <Skeleton height={30} />
        </div>
        <div className="w-[250px] mt-4">
          <Skeleton height={30} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 mt-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i}>
              <div className="rounded-xl overflow-hidden">
                <Skeleton height={300} />
              </div>
              <div className="mt-3">
                <Skeleton height={20} />
              </div>
              <div className="mt-3 w-[100px]">
                <Skeleton height={20} />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (data.length == 0) {
    return (
      <div className="flex justify-center items-center pt-[100px] text-center">
        <div className="flex flex-col gap-3">
          <Heading
            title="No Reservation Found"
            subtitle="You have no reservations on your properties"
          />
        </div>
      </div>
    );
  }
  return (
    <section className="px-3 sm:px-10 md:px-[40px] mx-auto max-w-[1800px] pb-8">
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
