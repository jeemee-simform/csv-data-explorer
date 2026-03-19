import { getStates, setStates } from "../utils/helper.js";

const handleSelectCheckbox = (e) => {
  try {
    const states = getStates();

    const { selectedRows } = states;
    const _id = Number(e.target.dataset._id);

    if (e.target.checked) {
      if (!selectedRows.includes(_id)) selectedRows.push(_id);
    } else states.selectedRows = selectedRows.remove(_id);

    setStates(states);
  } catch (err) {
    console.error(err);
    return showError(err.message);
  }
};
const handleSelectAll = (e) => {
  try {
    const states = getStates();
    const { selectedRows } = states;

    document.querySelectorAll('input[type="checkbox"]').forEach((el) => {
      el.checked = e.target.checked;
      const _id = Number(el.dataset._id);
      if (el.checked) {
        if (_id) if (!selectedRows.includes(_id)) selectedRows.push(_id);
      } else {
        states.selectedRows = [];
      }
    });

    setStates(states);
  } catch (err) {
    console.error(err);
    return showError(err.message);
  }
};

export { handleSelectCheckbox, handleSelectAll };
