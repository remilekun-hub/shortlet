import PropertyCard from "../components/PropertyCard";
import { userSlice } from "../zustand/user";
import { favouritesSlice } from "../zustand/userFavourites";

function UserFavourites() {
  const removeAllFav = favouritesSlice((state) => state.removeAll);
  const favourites = favouritesSlice((state) => state.favourites);
  const user = userSlice((state) => state);

  // if (!user.user) {
  //   return (
  //     <p className="text-center">You must be logged in to access this page</p>
  //   );
  // }

  return (
    <section>
      <h1>My Favourites</h1>
      <div className="px-4 sm:px-10 md:px-[50px] mx-auto max-w-[1400px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5">
        {/* {favourites.map((item) => (
          <PropertyCard key={item._id} {...item} />
        ))} */}
        <div className="bg-red-700 h-[300px]">rem</div>
        <div className="bg-red-700 h-[300px]">rem</div>
        <div className="bg-red-700 h-[300px]">rem</div>
        <div className="bg-red-700 h-[300px]">rem</div>
        <div className="bg-red-700 h-[300px]">rem</div>
      </div>
    </section>
  );
}

export default UserFavourites;
