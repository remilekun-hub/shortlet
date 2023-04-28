import PropertyCard from "../components/PropertyCard";
import { Property } from "../typings";
import useFetch from "../util/useFetch";
import { Loader } from "@mantine/core";

function Home() {
  const { data, error } = useFetch<Property[]>(
    "http://localhost:5000/api/v1/public/properties"
  );

  return (
    <section>
      <div className="px-4 sm:px-10 md:px-[48px] lg:px-[50px] xl:px-[55px] mx-auto max-w-[1400px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {data && data.map((item) => <PropertyCard key={item._id} {...item} />)}
      </div>
      {!data && (
        <div className="h-full w-full flex justify-center items-center">
          <Loader size={"md"} color="#F43F5E" />
        </div>
      )}
    </section>
  );
}

export default Home;
