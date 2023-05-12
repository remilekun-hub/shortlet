import useFetch from "../util/useFetch";
import { userSlice } from "../zustand/user";
import { Loader, Skeleton } from "@mantine/core";
import { Property } from "../typings";
import Heading from "../components/Heading";

function UserListings() {
  const user = userSlice((state) => state);

  if (!user?.user) {
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
    "http://localhost:5000/api/v1/properties",
    {
      headers: {
        Authorization: `Bearer ${user.user?.token}`,
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
      <div className="px-4 sm:px-10 md:px-[50px] mx-auto max-w-[1400px] h-full w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
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
    );
  }
  return (
    <section className="px-4 sm:px-10 md:px-[50px] mx-auto max-w-[1400px] ">
      <h1 className="text-[20px] font-bold mb-4">My Listings</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5">
        <div className="bg-red-700 h-[300px]">rem</div>
        <div className="bg-red-700 h-[300px]">rem</div>
        <div className="bg-red-700 h-[300px]">rem</div>
        <div className="bg-red-700 h-[300px]">rem</div>
        <div className="bg-red-700 h-[300px]">rem</div>
      </div>
    </section>
  );
}

export default UserListings;
