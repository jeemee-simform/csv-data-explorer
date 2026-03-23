import { currentPageNumberInput, currentPageSize } from "../utils/constants.js";
import {
  getStates,
  showError,
  findPageNumber,
  updateUi,
} from "../utils/helper.js";

const handleChangePageNumber = (e) => {
  try {
    const states = getStates();
    let newPageNumber = Number(e.target.value);
    let { pageNumber: prePageNumber, pageSize } = states.pagination;
    const max = Number(e.target.max);
    const min = Number(e.target.min);

    // if invalid input then make first page
    if (isNaN(newPageNumber)) newPageNumber = min;

    // handle decimal value and make it floor value
    newPageNumber = Math.floor(newPageNumber);

    // make page with in range
    newPageNumber = Math.max(min, Math.min(max, newPageNumber));

    if (newPageNumber === prePageNumber) return;

    states.pagination.pageNumber = newPageNumber;
    states.pagination.persistIndex = (newPageNumber - 1) * pageSize;

    // update states and render UI
    updateUi(states);
  } catch (err) {
    console.error(err);
    return showError(err.message);
  }
};

const handleNextBtn = (e) => {
  try {
    const states = getStates();
    let {
      pageNumber: prePageNumber,
      persistIndex,
      pageSize,
    } = states.pagination;

    const max = currentPageNumberInput.max;

    // check max limit
    if (prePageNumber >= max) return;

    states.pagination.pageNumber = prePageNumber + 1;
    states.pagination.persistIndex = persistIndex + pageSize;

    // update states and render UI
    updateUi(states);
  } catch (err) {
    console.error(err);
    return showError(err.message);
  }
};

const handlePrevBtn = (e) => {
  try {
    const states = getStates();
    let {
      pageNumber: prePageNumber,
      persistIndex,
      pageSize,
    } = states.pagination;

    const min = currentPageNumberInput.min;

    // check min limit
    if (prePageNumber <= min) return;

    states.pagination.pageNumber = prePageNumber - 1;
    states.pagination.persistIndex = persistIndex - pageSize;

    // update states and render UI
    updateUi(states);
  } catch (err) {
    console.error(err);
    return showError(err.message);
  }
};

const handleChangePageSize = () => {
  try {
    const states = getStates();
    const {
      pagination: { persistIndex },
      filteredData: data,
    } = states;

    // new values
    const newPageSize = Number(currentPageSize.value);
    const newPageNumber =
      persistIndex >= data.length
        ? 1
        : findPageNumber(newPageSize, persistIndex);

    // update new state
    states.pagination.pageSize = newPageSize;
    states.pagination.totalPage = Math.ceil(data.length / newPageSize);
    states.pagination.pageNumber = newPageNumber;
    states.pagination.persistIndex = (newPageNumber - 1) * newPageSize;

    // update states and render UI
    updateUi(states);
  } catch (err) {
    console.error(err);
    return showError(err.message);
  }
};

export {
  handleChangePageNumber,
  handleNextBtn,
  handlePrevBtn,
  handleChangePageSize,
};
