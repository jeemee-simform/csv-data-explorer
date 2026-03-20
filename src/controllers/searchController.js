import { renderUi } from "../services/renderComponent.js";
import { columnSearch } from "../utils/constants.js";
import {
  debounce,
  getStates,
  searchWithDebounce,
  setStates,
  updateFilteredData,
} from "../utils/helper.js";

const handleSearch = (e) => {
  try {
    const states = getStates();

    states.search.searchBy = columnSearch.value;
    states.search.searchText = e.target.value.toLowerCase().trim();

    setStates(states);

    // searching with debounced
    searchWithDebounce();
  } catch (err) {
    console.error(err);
    return showError(err.message);
  }
};

const handleColumnSearch = (e) => {
  try {
    const states = getStates();

    states.search.searchBy = e.target.value.toLowerCase().trim();

    setStates(states);

    // searching with debounced
    const searchWithDebounce = debounce(updateFilteredData, 300);
    searchWithDebounce();

    renderUi();
  } catch (err) {
    console.error(err);
    return showError(err.message);
  }
};

export { handleSearch, handleColumnSearch };
