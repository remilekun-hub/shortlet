import { useSearchParams } from "react-router-dom";
import PropertyCard from "../components/PropertyCard";
import { Property } from "../typings";
import useFetch from "../util/useFetch";
import { Loader } from "@mantine/core";

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
    <section>
      <div className="px-3 sm:px-10 md:px-[48px] lg:px-[50px] mx-auto max-w-[1400px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {data.map((item) => (
          <PropertyCard key={item._id} {...item} />
        ))}
        <p>{data.length}</p>
      </div>
    </section>
  );
}

export default Home;
