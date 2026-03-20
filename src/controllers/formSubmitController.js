import { addRowToState, createNewRow } from "../services/formSubmit.js";
import { submitBtn } from "../utils/constants.js";
import { closeModal, showError, updateFilteredData } from "../utils/helper.js";

const handleFormSubmit = (e) => {
  try {
    e.preventDefault();

    const form = e.target;

    submitBtn.disabled = true;

    const newRow = createNewRow(form);

    if (!newRow) return;

    addRowToState(newRow);

    updateFilteredData();

    closeModal();
  } catch (err) {
    console.error(err);
    return showError(err.message);
  }
};

export { handleFormSubmit };
