import { useSearchParams } from "react-router-dom";
import PropertyCard from "../components/PropertyCard";
import { Property } from "../typings";
import useFetch from "../util/useFetch";
import { Loader, Skeleton } from "@mantine/core";
import Heading from "../components/Heading";

function Home() {
  const params = useSearchParams();
  const category = params?.[0].get("category");
  const baths = params?.[0].get("baths");
  const beds = params?.[0].get("beds");
  const bedrooms = params?.[0].get("bedrooms");
  const guests = params?.[0].get("guests");
  const country = params?.[0].get("country");
  const minPrice = params?.[0].get("minPrice");
  const maxPrice = params?.[0].get("maxPrice");

  const { data, error } = useFetch<Property[]>(
    `http://localhost:5000/api/v1/public/properties?beds=${beds || 1}&baths=${
      baths || 1
    }&guests=${guests || 1}&bedrooms=${bedrooms || 1}&minPrice=${
      minPrice || 0
    }&maxPrice=${maxPrice || 1000}&country=${country}&category=${category}`
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
      <div className="h-full w-full flex justify-center items-center">
        <Loader size={"md"} color="#412db3" />
      </div>
    );
  }
  if (data.length == 0) {
    return (
      <div className="flex justify-center items-center pt-[100px] text-center">
        <Heading
          title="No Exact Matches"
          subtitle="Try changing or improving your filters"
        />
        <button>Remove all filters</button>
      </div>
    );
  }
  return (
    <section>
      <div className="px-4 sm:px-10 md:px-[50px] mx-auto max-w-[1400px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {data.map((item) => (
          <PropertyCard key={item._id} {...item} />
        ))}
        {/* {Array.from({ length: 10 }).map((_, i) => (
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
        ))} */}
      </div>
    </section>
  );
}

export default Home;
