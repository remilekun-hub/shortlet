import { userSlice } from "../zustand/user";
import { favouritesSlice } from "../zustand/userFavourites";

function UserFavourites() {
  const removeAllFav = favouritesSlice((state) => state.removeAll);
  const user = userSlice((state) => state);

  if (!user.user) {
    return (
      <p className="text-center">You must be logged in to access this page</p>
    );
  }

  return <div>UserFavourites</div>;
}

export default UserFavourites;
