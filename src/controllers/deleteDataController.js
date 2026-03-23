import {
  getStates,
  setStates,
  showError,
  updateFilteredData,
  updateUi,
} from "../utils/helper.js";

const handleDelete = () => {
  try {
    const states = getStates();
    const { selectedRows, originalData } = states;

    if (!selectedRows.length) return showError("Please select row");

    states.originalData = originalData.filter(
      (e) => !selectedRows.includes(e._id),
    );
    states.filteredData = states.originalData;
    setStates(states);

    // update filtered data so maintain sorted state
    updateFilteredData();

    updateUi();
  } catch (err) {
    console.error(err);
    return showError(err.message);
  }
};

export { handleDelete };
