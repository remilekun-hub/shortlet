import React from "react";
import { userSlice } from "../zustand/user";

function UserFavourites() {
  const user = userSlice((state) => state);
  if (!user.user) {
    return (
      <p className="text-center">You must be logged in to access this page</p>
    );
  }

  return <div>UserFavourites</div>;
}

export default UserFavourites;
