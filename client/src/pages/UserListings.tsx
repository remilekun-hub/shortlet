import useFetch from "../util/useFetch";
import { userSlice } from "../zustand/user";
import { Skeleton } from "@mantine/core";
import { Property } from "../typings";
import Heading from "../components/Heading";
import Button from "../components/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UserListings() {
  const user = userSlice((state) => state.user);
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="flex justify-center items-center pt-[100px] text-center">
        <Heading
          title="Please Log in"
          subtitle="you must be logged in to access this route"
        />
      </div>
    );
  }
  const handlePropertyDelete = async (id: string) => {
    await axios.delete(`http:localhost:5000/api/v1/properties/${id}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    navigate(0);
  };
  const { data, error } = useFetch<Property[]>(
    "http://localhost:5000/api/v1/properties",
    {
      headers: {
        Authorization: `Bearer ${user.token}`,
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
    return <p>loading..................</p>;
  }
  if (data.length == 0) {
    return (
      <div className="flex justify-center items-center pt-[100px] text-center">
        <Heading
          title="No Properties Found"
          subtitle="you have no listed property"
        />
      </div>
    );
  }
  return (
    <section className="px-4 sm:px-10 md:px-[50px] mx-auto max-w-[1800px] pb-8 ">
      <h1 className="text-[20px] font-bold mb-4">My Listings</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        {data.map((listing) => (
          <div key={listing._id}>
            <div>{listing.price}</div>
            <Button
              label="Delete Property"
              onSubmit={() => handlePropertyDelete(listing._id)}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default UserListings;
