import useFetch from "../util/useFetch";
import { userSlice } from "../zustand/user";
import { Skeleton } from "@mantine/core";
import { Property } from "../typings";
import Heading from "../components/Heading";
import Button from "../components/Button";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

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
    axios
      .delete(`http://localhost:5000/api/v1/properties/${id}`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      })
      .then(() => navigate(0))
      .catch((error) => console.log(error));
  };
  const { data, error } = useFetch<Property[]>(
    "http://localhost:5000/api/v1/properties",
    {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    }
  );
  console.log(data);

  if (error) {
    return (
      <div className="flex justify-center items-center pt-[100px] text-center">
        <Heading title="Oops!" subtitle="Something went wrong, try again." />
      </div>
    );
  }
  if (!data) {
    return <p>loading......</p>;
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
    <section className="px-3 sm:px-10 md:px-[40px] mx-auto max-w-[1800px] pb-8 ">
      <h1 className="text-[20px] font-bold mb-4">My Listings</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        {data.map((listing) => (
          <div key={listing._id}>
            <Link to={`/apartment/${listing._id}`}>
              <div className="mb-3 h-[250px]">
                <img
                  src={listing.images[0]}
                  className=" object-center object-cover h-full w-full rounded-xl"
                />
              </div>
              <div className="mb-2">
                <h3 className="text-[16px] text-black font-semibold">{`${listing.city}, ${listing.state}, ${listing.country}`}</h3>
                <p className="text-[16px] mt-1">
                  <span className="font-semibold">{`$${listing.price}`}</span>
                  <span className="text-neutral-600 ml-1">night</span>
                </p>
              </div>
            </Link>
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
