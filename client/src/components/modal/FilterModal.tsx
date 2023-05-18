import React, { useState } from "react";
import Modal from "./Modal";
import useFilterModalState from "../../zustand/filterModal";
import Counter from "../Counter";
import { RangeSlider } from "@mantine/core";
import { useNavigate } from "react-router-dom";

function FilterModal() {
  const navigate = useNavigate();
  const filterModalState = useFilterModalState();
  const [userFilter, setUserFilter] = useState({
    beds: 1,
    guests: 1,
    baths: 1,
    bedrooms: 1,
    minPrice: 0,
    maxPrice: 1000,
  });
  const [rangeValue, setRangeValue] = useState<[number, number]>([
    userFilter.minPrice,
    userFilter.maxPrice,
  ]);
  const reset = () => {
    setUserFilter({
      beds: 1,
      guests: 1,
      baths: 1,
      bedrooms: 1,
      minPrice: 0,
      maxPrice: 1000,
    });
    setRangeValue([userFilter.minPrice, userFilter.maxPrice]);
    navigate("/");
  };
  const bodycontent = (
    <div className="flex flex-col gap-5">
      <Counter
        value={userFilter.beds}
        title="beds"
        onChange={(value: number) => {
          setUserFilter({ ...userFilter, beds: value });
        }}
      />
      <Counter
        value={userFilter.baths}
        title="beds"
        onChange={(value: number) => {
          setUserFilter({ ...userFilter, baths: value });
        }}
      />
      <Counter
        value={userFilter.bedrooms}
        title="bedrooms"
        onChange={(value: number) => {
          setUserFilter({ ...userFilter, bedrooms: value });
        }}
      />
      <Counter
        value={userFilter.guests}
        title="guests"
        onChange={(value: number) => {
          setUserFilter({ ...userFilter, guests: value });
        }}
      />

      <div className="flex items-center justify-between">
        <span className="mr-3 font-bold">Price</span>
        <div className="w-[50%]">
          <RangeSlider
            value={rangeValue}
            onChange={setRangeValue}
            min={0}
            max={1000}
          />
        </div>
      </div>
    </div>
  );
  return (
    <Modal
      actionLabel="filter"
      title="Filter Apartment"
      isOpen={filterModalState.isOpen}
      onClose={filterModalState.onClose}
      body={bodycontent}
      secondaryLabel="Reset Filter"
      secondaryAction={reset}
      onSubmit={() => {}}
    />
  );
}

export default FilterModal;
