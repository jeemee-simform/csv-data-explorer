import { addRowToState, createNewRow } from "../services/formSubmit.js";
import { submitBtn } from "../utils/constants.js";
import { closeModal, showError, updateFilteredData } from "../utils/helper.js";

const handleFormSubmit = (e) => {
  try {
    e.preventDefault();

    const form = e.target;

    submitBtn.disabled = true;

    // create new row
    const newRow = createNewRow(form);

    if (!newRow) return;

    // add in original data
    addRowToState(newRow);

    // update filtered data from original data
    updateFilteredData();

    closeModal();
  } catch (err) {
    console.error(err);
    return showError(err.message);
  }
};

export { handleFormSubmit };
