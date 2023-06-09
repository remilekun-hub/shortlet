import arctic from "../assets/arctic.jpg";
import beach from "../assets/beach.jpg";
import containers from "../assets/containers.jpg";
import windmills from "../assets/windmills.jpg";
import pools from "../assets/pools.jpg";
import islands from "../assets/islands.jpg";
import tropical from "../assets/tropical.jpg";
import Houseboats from "../assets/Houseboats.jpg";
import mansion from "../assets/mansion.jpg";

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
  {
    label: "Mansion",
    image: mansion,
  },
  {
    label: "Pools",
    image: pools,
  },
  {
    label: "Tropical",
    image: tropical,
  },
  {
    label: "Windmills",
    image: windmills,
  },
];
