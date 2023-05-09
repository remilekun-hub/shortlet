import React from "react";
import { Link } from "react-router-dom";

interface userPropertyProps {
  _id:string,
  image:string,
  price:number,
  city:string,
  country:string
}
function Userproperty() {
  return <div>
    <Link to={`/apartment/${_id}`} className="flex flex-col gap-3">
        <div className="h-[300px]">
          <img
            src={images[4]}
            className="object-cover h-full w-full rounded-xl"
          />
        </div>
        <div className="">
          <h3 className="text-[15px] text-black font-semibold">{`${city}, ${country}`}</h3>
          <div className="flex justify-between">
          <p className="text-[16px] mt-1">
            <span className="font-semibold">{`$${price}`}</span>
            <span className="text-neutral-800 ml-1">night</span>
          </p>

          <div>delete btn</div>
          </div>
        </div>
      </Link>
  </div>;
}

export default Userproperty;
