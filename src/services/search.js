import { getStates, setStates } from "../utils/helper.js";

const searchData = () => {
  const states = getStates();
  const {
    search: { searchText, searchBy },
    originalData,
  } = states;

  // If empty reset it
  if (!searchText) {
    states.filteredData = [...originalData];
    setStates(states);
    return;
  }

  // filtered data
  const filtered = originalData.filter((row) => {
    // Search ALL columns
    if (searchBy === "all") {
      return Object.values(row).some((val) =>
        String(val).toLowerCase().includes(searchText),
      );
    }

    // Search specific column
    const value = row[searchBy];
    return String(value).toLowerCase().includes(searchText);
  });

  states.filteredData = filtered;
  setStates(states);
};

export { searchData };
