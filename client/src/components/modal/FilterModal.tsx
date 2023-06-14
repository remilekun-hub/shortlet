import React, { useState, Dispatch, SetStateAction } from "react";
import Modal from "./Modal";
import useFilterModalState from "../../zustand/filterModal";
import Counter from "../Counter";
import { RangeSlider } from "@mantine/core";
import {
  useNavigate,
  useSearchParams,
  createSearchParams,
} from "react-router-dom";

interface FilterModalProp {
  setSearch: Dispatch<SetStateAction<string>>;
}

function FilterModal({ setSearch }: FilterModalProp) {
  const navigate = useNavigate();
  const params = useSearchParams();
  const country = params?.[0].get("country");
  const category = params?.[0].get("category");
  const filterModalState = useFilterModalState();
  const [userFilter, setUserFilter] = useState({
    beds: 1,
    baths: 1,
    bedrooms: 1,
    guests: 1,
    minPrice: 0,
    maxPrice: 10000,
  });
  const [rangeValue, setRangeValue] = useState<[number, number]>([
    userFilter.minPrice,
    userFilter.maxPrice,
  ]);
  const reset = () => {
    setUserFilter({
      beds: 1,
      baths: 1,
      bedrooms: 1,
      guests: 1,
      minPrice: 0,
      maxPrice: 10000,
    });
    setRangeValue([userFilter.minPrice, userFilter.maxPrice]);
    setSearch("");
    navigate("/");
  };
  const handleFilter = () => {
    let query: any = {
      ...userFilter,
      minPrice: rangeValue[0],
      maxPrice: rangeValue[1],
    };
    if (country) {
      query = { country: country, ...query };
    }
    if (category) {
      query = { category, ...query };
    }
    if (country && category) {
      query = { country, category, ...query };
    }
    filterModalState.onClose();
    navigate({
      pathname: "/",
      search: `${createSearchParams(query)}`,
    });
  };
  const bodycontent = (
    <div className="flex flex-col gap-5 mb-3">
      <Counter
        value={userFilter.beds}
        title="Beds"
        onChange={(value: number) => {
          setUserFilter({ ...userFilter, beds: value });
        }}
      />
      <Counter
        value={userFilter.baths}
        title="Baths"
        onChange={(value: number) => {
          setUserFilter({ ...userFilter, baths: value });
        }}
      />
      <Counter
        value={userFilter.bedrooms}
        title="Bedrooms"
        onChange={(value: number) => {
          setUserFilter({ ...userFilter, bedrooms: value });
        }}
      />
      <Counter
        value={userFilter.guests}
        title="Guests"
        onChange={(value: number) => {
          setUserFilter({ ...userFilter, guests: value });
        }}
      />

      <div className="flex items-center justify-between">
        <span className="mr-3 font-bold">Price</span>
        <div className="w-[70%]">
          <RangeSlider
            value={rangeValue}
            onChange={setRangeValue}
            min={0}
            max={10000}
          />
        </div>
      </div>
    </div>
  );
  return (
    <Modal
      actionLabel="Filter"
      title="Filter Apartment"
      isOpen={filterModalState.isOpen}
      onClose={filterModalState.onClose}
      body={bodycontent}
      secondaryLabel="Reset Filter"
      secondaryAction={reset}
      onSubmit={handleFilter}
    />
  );
}

export default FilterModal;
