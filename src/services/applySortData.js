import { findHeaderObj, getStates, setStates } from "../utils/helper.js";

const sortFilteredData = () => {
  const states = getStates();

  const {
    filteredData,
    sort: { sortBy, sortType },
  } = states;

  //null check
  if (!sortBy || !sortType) return;

  console.log("sort");

  // find header obj from states.
  const dataType = findHeaderObj(sortBy).type;

  // sort and then store again in states
  filteredData.sort((a, b) => {
    let valA = a[sortBy];
    let valB = b[sortBy];

    // handle types
    if (dataType === "number") {
      valA = Number(valA);
      valB = Number(valB);
    }

    if (dataType === "date") {
      valA = new Date(valA);
      valB = new Date(valB);
    }

    if (dataType === "string") {
      valA = valA.toLowerCase();
      valB = valB.toLowerCase();
    }

    //  compare value  based on asc or desc
    if (valA < valB) return sortType === "asc" ? -1 : 1;
    if (valA > valB) return sortType === "asc" ? 1 : -1;

    return 0;
  });

  setStates(states);
};

export { sortFilteredData };
