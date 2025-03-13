import React, { createContext, useEffect, useState } from "react";

const FilterContext = createContext();

export const FilterDataProvider = ({ children }) => {
  const [filterData, setFilterData] = useState({ key: null, value: null });
  const [filterOutputData, setFilterOutputData] = useState({});
  return (
    <FilterContext.Provider
      value={{ filterData, setFilterData, setFilterOutputData }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export default FilterContext;
