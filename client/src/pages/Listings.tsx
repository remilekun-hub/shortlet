import useFetch from "../util/useFetch";
import { userSlice } from "../zustand/user";
import { Loader } from "@mantine/core";
import { Property } from "../typings";
import Heading from "../components/Heading";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PropertyCard from "../components/PropertyCard";

function Listings() {
  const user = userSlice((state) => state.user);
  const navigate = useNavigate();

  const handlePropertyDelete = async (id: string) => {
    await axios
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
          title="No Properties Found"
          subtitle="you have no listed property"
        />
      </div>
    );
  }
  return (
    <section className="px-3 sm:px-10 md:px-[40px] mx-auto max-w-[1800px] pb-[50px] ">
      <div className="mb-4">
        <Heading title="My Listings" subtitle="Listings created by me." />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-6 gap-y-7">
        {data.map((listing) => (
          <PropertyCard
            key={listing._id}
            data={listing}
            label="Delete Listing"
            onSubmit={() => handlePropertyDelete(listing._id)}
          />
        ))}
      </div>
    </section>
  );
}

export default Listings;
