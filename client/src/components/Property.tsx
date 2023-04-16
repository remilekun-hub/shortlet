import React from "react";
import { Link } from "react-router-dom";

function Property() {
  return (
    <div className="bg-red-900 rounded-xl relative -z-50">
      <div className="w-10 h-10 rounded-full top-5 right-5 bg-green-500 absolute cursor-pointer"></div>
      <Link to={"/apartment/id"} className="flex flex-col gap-3">
        <div>
          roperty Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
          consequatur nobis assumenda expedita, temporibus consequuntur repellat
          aspernatur sequi quas ipsum!
        </div>
        <div>jaefjgfa</div>
      </Link>
    </div>
  );
}

export default Property;
