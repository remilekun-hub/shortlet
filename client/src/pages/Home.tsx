import axios from "axios";
import CategoryList from "../components/CategoryList";
import NavBar from "../components/NavBar";
import Property from "../components/Property";
import { useEffect, useState } from "react";
import { nuProperty } from "../typings";

function Home() {
  const [properties, setProperties] = useState<nuProperty[] | null>(null);
  useEffect(() => {
    const getProperties = async () => {
      await axios
        .get("http://localhost:5000/api/v1/public/properties")
        .then((res) => setProperties(res?.data?.properties));
    };
    getProperties();
  }, []);

  return (
    <section>
      <header className=" w-full bg-white sticky top-0 shadow mb-6 z-[50]">
        <div className="border-b-[1px] border-black/10">
          <NavBar />
        </div>
        <CategoryList />
      </header>
      <div className="px-4 sm:px-10 md:px-[48px] lg:px-[50px] xl:px-[55px] mx-auto max-w-[1400px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {properties?.map((item) => (
          <Property key={item._id} {...item} />
        ))}
      </div>
    </section>
  );
}

export default Home;
