import { ReactElement } from "react";

interface category {
  label: string;
  description: string;
  icon?: ReactElement;
}

export const categories: category[] = [
  {
    label: "Beach",
    description: "This property is close to the beach",
  },
  {
    label: "Mountain",
    description: "This property is close to the Mountain",
  },
  {
    label: "Modern",
    description: "This property is modern",
  },
  {
    label: "Windmills",
    description: "This property is close to the Sky",
  },
  {
    label: "Pools",
    description: "This property has a pool",
  },
];
