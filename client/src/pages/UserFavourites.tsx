import PropertyCard from "../components/PropertyCard";
import { userSlice } from "../zustand/user";
import { favouritesSlice } from "../zustand/userFavourites";
import Heading from "../components/Heading";

function UserFavourites() {
  const removeAllFav = favouritesSlice((state) => state.removeAll);
  const favourites = favouritesSlice((state) => state.favourites);
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

  if (favourites.length == 0) {
    return (
      <div className="flex justify-center items-center pt-[100px] text-center">
        <Heading
          title="No Favourites Found"
          subtitle="Looks like you have no favourite listings"
        />
      </div>
    );
  }

  return (
    <section className="px-4 sm:px-10 md:px-[50px] mx-auto max-w-[1800px] ">
      <h1 className="text-[20px] font-bold mb-4">My Favourites</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
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
