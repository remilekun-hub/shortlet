import useFetch from "../util/useFetch";
import { userSlice } from "../zustand/user";
import { Loader } from "@mantine/core";
import { Property } from "../typings";

function UserListings() {
  const user = userSlice((state) => state);
  const { data, error } = useFetch<Property[]>(
    "http://localhost:5000/api/v1/properties",
    {
      headers: {
        Authorization: `Bearer ${user.user?.token}`,
      },
    }
  );
  if (!user.user) {
    return (
      <p className="text-center">You must be logged in to access this page</p>
    );
  }

  if (error) {
    return <p className="text-center">An error has occured</p>;
  }
  if (!data) {
    return (
      <div className="h-full w-full flex justify-center items-center">
        <Loader size={"md"} color="#F43F5E" />
      </div>
    );
  }
  return (
    <section className="px-4 sm:px-10 md:px-[50px] mx-auto max-w-[1400px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      <div className="bg-red-700 h-[300px]">rem</div>
      <div className="bg-red-700 h-[300px]">rem</div>
      <div className="bg-red-700 h-[300px]">rem</div>
      <div className="bg-red-700 h-[300px]">rem</div>
    </section>
  );
}

export default UserListings;
