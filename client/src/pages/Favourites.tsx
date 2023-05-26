import { userSlice } from "../zustand/user";
import Heading from "../components/Heading";
import useFetch from "../util/useFetch";
import { Property } from "../typings";
import PropertyCard from "../components/PropertyCard";
import { useNavigate } from "react-router-dom";

function Favourites() {
  const user = userSlice((state) => state.user);

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
  const { data, error } = useFetch<Property[]>(
    "http://localhost:5000/api/v1/favourites",
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
    return <div>Fetching...</div>;
  }
  if (data.length == 0) {
    return (
      <div className="flex justify-center items-center pt-[100px] text-center">
        <Heading
          title="No Favourites Found"
          subtitle="You have no favourite listings"
        />
      </div>
    );
  }

  return (
    <section className="px-3 sm:px-10 md:px-[40px] mx-auto max-w-[1800px]">
      <div className="mb-4">
        <Heading
          title="My Favourites"
          subtitle="Apartments i would love to Book"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        {data.map((property) => (
          <PropertyCard key={property._id} {...property} />
        ))}
      </div>
    </section>
  );
}

export default Favourites;
