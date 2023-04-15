import CategoryList from "../components/CategoryList";
import NavBar from "../components/NavBar";

function Home() {
  return (
    <section>
      <header className="border-[1px] border-black/20">
        <NavBar />
      </header>
      <CategoryList />
    </section>
  );
}

export default Home;
