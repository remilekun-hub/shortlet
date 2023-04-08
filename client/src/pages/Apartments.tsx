import { useState } from "react";
import { useSearchParams } from "react-router-dom";

function Apartments() {
  return (
    <section>
      <div className="mx-auto max-w-[1300px] px-4 md:px-[48px] lg:px-[50px] flex gap-x-5">
        <aside className="w-[300px] bg-green-700 h-full">
          filter here
          <input type="range" name="kwrbgj" id="" min={0} max={1000} />
        </aside>
        <main className="flex-1">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita
          harum deserunt quidem, minus accusantium illum pariatur modi, neque
          veritatis fugit, in optio? Blanditiis quod distinctio numquam d
          lorem1000
        </main>
      </div>
    </section>
  );
}

export default Apartments;
