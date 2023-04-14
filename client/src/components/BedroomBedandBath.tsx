import React from "react";

interface Props {
  amount: number;
  type: string;
}

function BedroomBedandBath({ amount, type }: Props) {
  return (
    <div className="flex items-center">
      <span className="w-[2px] h-[2px] rounded-full bg-black mr-1" />
      <span>{`${amount} ${type}`}</span>
    </div>
  );
}

export default BedroomBedandBath;
