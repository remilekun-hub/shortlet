import React from "react";

function Reservations() {
  return (
    <section className="px-4 sm:px-10 md:px-[50px] mx-auto max-w-[1400px] pb-8 ">
      <h1 className="text-[20px] font-bold mb-4">My Reservations</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5">
        <div className="bg-red-700 h-[300px]">rem</div>
        <div className="bg-red-700 h-[300px]">rem</div>
        <div className="bg-red-700 h-[300px]">rem</div>
        <div className="bg-red-700 h-[300px]">rem</div>
        <div className="bg-red-700 h-[300px]">rem</div>
      </div>
    </section>
  );
}

export default Reservations;
