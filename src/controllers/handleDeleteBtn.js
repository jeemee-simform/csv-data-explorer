import { sortFilteredData } from "../services/applySortData.js";
import { renderUi } from "../services/renderComponent.js";
import { currentPageSize, thead } from "../utils/constants.js";
import { getStates, setStates } from "../utils/helper.js";

const handleDelete = () => {
  try {
    const states = getStates();
    const { selectedRows, originalData } = states;

    states.originalData = originalData.filter(
      (e) => !selectedRows.includes(e._id),
    );
    states.filteredData = states.originalData;
    setStates(states);

    // manually fire event pagesize
    const pageEvent = new Event("change");
    currentPageSize.dispatchEvent(pageEvent);

    // sort again data and store in filtered data so maintain sorted state
    sortFilteredData();

    renderUi();
  } catch (err) {
    console.error(err);
    return showError(err.message);
  }
};

export { handleDelete };
