import { renderUi } from "../services/renderComponent.js";
import { getStates, setStates, updateFilteredData } from "../utils/helper.js";

const handleDelete = () => {
  try {
    const states = getStates();
    const { selectedRows, originalData } = states;

    states.originalData = originalData.filter(
      (e) => !selectedRows.includes(e._id),
    );
    states.filteredData = states.originalData;
    setStates(states);

    // update filtered data so maintain sorted state
    updateFilteredData();

    renderUi();
  } catch (err) {
    console.error(err);
    return showError(err.message);
  }
};

export { handleDelete };
