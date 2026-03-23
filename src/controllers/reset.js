import { CONSTANTS } from "../utils/constants.js";
import { getStates, updateUi } from "../utils/helper.js";

const handleResetBtn = () => {
  try {
    const states = getStates();

    const { originalData: data } = states;

    states.filteredData = [...data];
    states.pagination = {
      pageNumber: 1,
      pageSize: CONSTANTS.DEFAULT_PAGE_SIZE,
      persistIndex: 0,
      totalPage: Math.ceil(data.length / CONSTANTS.DEFAULT_PAGE_SIZE),
    };
    states.sort = {
      sortBy: null,
      sortType: null,
      cellIndex: null,
    };
    states.search = {
      searchBy: "all",
      searchText: "",
    };
    states.selectedRows = [];

    // update states and render UI
    updateUi(states);
  } catch (err) {
    console.error(err);
    return showError(err.message);
  }
};

export { handleResetBtn };
