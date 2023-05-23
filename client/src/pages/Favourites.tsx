import { userSlice } from "../zustand/user";
import { favouritesSlice } from "../zustand/userFavourites";
import Heading from "../components/Heading";
import { Link } from "react-router-dom";

function Favourites() {
  const removeAllFav = favouritesSlice((state) => state.removeAll);
  const favourites = favouritesSlice((state) => state.favourites);
  const removeFavourite = favouritesSlice((state) => state.removeFavourite);
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
          subtitle="You have no favourite listings"
        />
      </div>
    );
  }

  return (
    <section className="px-3 sm:px-10 md:px-[50px] xl:px-[40px] mx-auto max-w-[1800px]">
      <h1 className="text-[20px] font-bold mb-4">My Favourites</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        {favourites.map((fav) => (
          <div className="relative ">
            <div
              className="w-10 h-10 rounded-full top-2 right-2 bg-red-500 absolute cursor-pointer"
              onClick={() => removeFavourite(fav._id)}
            />

            <Link to={`/apartment/${fav._id}`} className="flex flex-col gap-3">
              <div className="h-[300px]">
                <img
                  src={fav.singleImage}
                  className="object-cover h-full w-full rounded-xl"
                />
              </div>
              <div className="">
                <h3 className="text-[15px] text-black font-semibold">{`${fav.city}, ${fav.country}`}</h3>
                <p className="text-[16px] mt-1">
                  <span className="font-semibold">{`$${fav.price}`}</span>
                  <span className="text-neutral-600 ml-1">night</span>
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Favourites;
