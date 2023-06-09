import { useSearchParams, useNavigate } from "react-router-dom";
import PropertyCard from "../components/PropertyCard";
import { Property } from "../typings";
import { Skeleton } from "@mantine/core";
import Heading from "../components/Heading";
import Button from "../components/Button";
import useSWR from "swr";
import { fetcher } from "../util/fetcher";
import { Dispatch, SetStateAction } from "react";
import { Baseurl } from "../baseurl";

interface HomeProp {
  setSearch: Dispatch<SetStateAction<string>>;
}
function Home({ setSearch }: HomeProp) {
  const params = useSearchParams();
  const category = params?.[0].get("category");
  const baths = params?.[0].get("baths");
  const beds = params?.[0].get("beds");
  const bedrooms = params?.[0].get("bedrooms");
  const guests = params?.[0].get("guests");
  const country = params?.[0].get("country");
  const minPrice = params?.[0].get("minPrice");
  const maxPrice = params?.[0].get("maxPrice");
  const navigate = useNavigate();

  const { data, error } = useSWR<Property[], Error>(
    `${Baseurl}/api/v1/public/properties?beds=${beds || 1}&baths=${
      baths || 1
    }&guests=${guests || 1}&bedrooms=${bedrooms || 1}&minPrice=${
      minPrice || 0
    }&maxPrice=${maxPrice || 10000}&country=${country}&category=${category}`,
    fetcher
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
      <section className="px-4 sm:px-10 md:px-[40px] mx-auto max-w-[1800px] pb-[50px]">
        <div className="  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-6 gap-y-7">
          {Array.from({ length: 12 }).map((_, i) => (
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
          ))}
        </div>
      </section>
    );
  }

  if (data.length == 0) {
    return (
      <div className="flex justify-center items-center pt-[100px] text-center">
        <div className="flex flex-col gap-3">
          <Heading
            title="No Exact Matches"
            subtitle="Try changing your filters"
          />
          <Button
            label="Remove All Filters"
            onSubmit={() => {
              setSearch("");
              navigate("/");
            }}
          />
        </div>
      </div>
    );
  }
  return (
    <section className="px-4 sm:px-10 md:px-[40px] mx-auto max-w-[1800px] pb-[30px]">
      <div className="  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        {data.map((item: Property) => (
          <PropertyCard key={item._id} data={item} />
        ))}
      </div>
    </section>
  );
}

export default Home;
