import arctic from "../assets/arctic.jpg";
import beach from "../assets/beach.jpg";
import containers from "../assets/containers.jpg";
import windmills from "../assets/windmills.jpg";
import pools from "../assets/pools.jpg";
import islands from "../assets/islands.jpg";
import tropical from "../assets/tropical.jpg";
import Houseboats from "../assets/Houseboats.jpg";
import mansion from "../assets/mansion.jpg";
import castles from "../assets/castles.jpg";
import camping from "../assets/camping.jpg";
import design from "../assets/design.jpg";
import luxe from "../assets/luxe.jpg";
import towers from "../assets/towers.jpg";

interface category {
  label: string;
  image: string;
}

export const categories: category[] = [
  {
    label: "Arctic",
    image: arctic,
  },
  {
    label: "Beach",
    image: beach,
  },
  {
    label: "Castles",
    image: castles,
  },
  {
    label: "Pools",
    image: pools,
  },
  {
    label: "luxe",
    image: luxe,
  },
  {
    label: "Towers",
    image: towers,
  },
  {
    label: "Camping",
    image: camping,
  },

  {
    label: "Tropical",
    image: tropical,
  },
  {
    label: "Windmills",
    image: windmills,
  },
  {
    label: "Mansion",
    image: mansion,
  },
  {
    label: "Design",
    image: design,
  },
  {
    label: "Containers",
    image: containers,
  },

  {
    label: "Houseboats",
    image: Houseboats,
  },
  {
    label: "Islands",
    image: islands,
  },
];
