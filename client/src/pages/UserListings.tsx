import useFetch from "../util/useFetch";
import { userSlice } from "../zustand/user";
import { Loader } from "@mantine/core";
import { Property } from "../typings";

function UserListings() {
  const user = userSlice((state) => state.user);
  const { data, error } = useFetch<Property[]>(
    "http://localhost:5000/api/v1/properties",
    {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    }
  );
  if (error) {
    return <p>An error has occured</p>;
  }
  if (!data) {
    return (
      <div className="h-full w-full flex justify-center items-center">
        <Loader size={"md"} color="#F43F5E" />
      </div>
    );
  }
  return <div>you have {data?.length} listing</div>;
}

export default UserListings;
