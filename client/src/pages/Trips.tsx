import React from "react";
import { userSlice } from "../zustand/user";
import useFetch from "../util/useFetch";
import Heading from "../components/Heading";

function Trips() {
  const user = userSlice((state) => state.user);

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

  const { data, error } = useFetch(
    `http://localhost:5000/api/v1/reservations/trips/${user?.id}`,
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
  return <div>Trips</div>;
}

export default Trips;
