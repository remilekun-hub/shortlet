import { userSlice } from "../zustand/user";
import Heading from "../components/Heading";
import useFetch from "../util/useFetch";
import { Property } from "../typings";
import PropertyCard from "../components/PropertyCard";
import { Loader } from "@mantine/core";
import { Baseurl } from "../baseurl";

function Favourites() {
  const user = userSlice((state) => state.user);

  const { data, error } = useFetch<Property[]>(`${Baseurl}/api/v1/favourites`, {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  });
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
          title="No Favourites Found"
          subtitle="You have no favourite listings"
        />
      </div>
    );
  }

  return (
    <section className="px-4 sm:px-10 md:px-[40px] mx-auto max-w-[1800px] pb-[30px]">
      <div className="mb-4">
        <Heading
          title="My Favourites"
          subtitle="Apartments i would love to Book"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        {data.map((property) => (
          <PropertyCard key={property._id} data={property} />
        ))}
      </div>
    </section>
  );
}

export default Favourites;
