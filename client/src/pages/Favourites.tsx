import { userSlice } from "../zustand/user";
import { favouritesSlice } from "../zustand/userFavourites";
import Heading from "../components/Heading";
import { Link } from "react-router-dom";
import HeartIcon from "../components/HeartIcon";
import useFetch from "../util/useFetch";

function Favourites() {
  const favourites = favouritesSlice((state) => state.favourites);
  const removeFavourite = favouritesSlice((state) => state.removeFavourite);
  const user = userSlice((state) => state.user);

  const { data, error } = useFetch("http://localhost:5000/api/v1/favourites", {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  });
  console.log(data);
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
    <section className="px-3 sm:px-10 md:px-[40px] mx-auto max-w-[1800px]">
      <div className="mb-4">
        <Heading
          title="My Favourites"
          subtitle="Apartments i would love to Book"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        {favourites.map((fav) => (
          <div key={fav._id} className="relative ">
            <div
              className="absolute top-4 right-[11px] cursor-pointer w-8 h-8 rounded-full"
              onClick={() => removeFavourite(fav._id)}
            >
              <HeartIcon red />
            </div>

            <Link to={`/apartment/${fav._id}`} className="flex flex-col gap-3">
              <div className="h-[300px]">
                <img
                  src={fav.singleImage}
                  className="object-cover h-full w-full rounded-xl"
                />
              </div>
              <div className="">
                <h3 className="text-[16px] text-black font-semibold">{`${fav.city}, ${fav.country}`}</h3>
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
