import React from "react";

interface Props {
  title: string;
  subtitle: string;
}

function Heading({ title, subtitle }: Props) {
  return (
    <div className="flex flex-col">
      <h1 className="text-xl font-bold text-black">{title}</h1>
      <p className="text-neutral-500">{subtitle}</p>
    </div>
  );
}

export default Heading;
