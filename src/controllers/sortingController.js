import { renderUi } from "../services/renderComponent.js";
import { sortFilteredData } from "../services/applySortData.js";
import {
  getStates,
  hideLoader,
  setStates,
  showLoader,
} from "../utils/helper.js";

const handleSorting = (e) => {
  try {
    console.log("sort controller");

    const th = e.target.closest("th");
    const header = th.dataset?.header;
    const states = getStates();

    // check click and skip first checkbox column
    if (!th || !header || th.cellIndex === 0) return;

    // loading start
    showLoader();

    // toggle sort asc or desc on which header
    if (states.sort.sortBy === header) {
      states.sort.sortType = states.sort.sortType === "asc" ? "desc" : "asc";
    } else {
      states.sort.sortBy = header;
      states.sort.sortType = "asc";
    }
    states.sort.cellIndex = th.cellIndex;

    // update sort states
    setStates(states);

    // apply sort and render data
    console.time("Sort and render");
    sortFilteredData();
    renderUi();
    console.timeEnd("Sort and render");

    hideLoader();
  } catch (err) {
    console.error(err);
    return showError(err.message);
  }
};
export { handleSorting };
