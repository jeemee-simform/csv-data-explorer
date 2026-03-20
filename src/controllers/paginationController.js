import { renderUi } from "../services/renderComponent.js";
import { currentPageNumberInput, currentPageSize } from "../utils/constants.js";
import {
  getStates,
  setStates,
  showError,
  findPageNumber,
} from "../utils/helper.js";

const handleChangePageNumber = (e) => {
  try {
    const states = getStates();
    let newPageNumber = Number(e.target.value);
    let { pageNumber: prePageNumber, pageSize } = states.pagination;
    const max = Number(e.target.max);
    const min = Number(e.target.min);

    if (newPageNumber === prePageNumber) return;

    if (newPageNumber > max) newPageNumber = max;
    if (newPageNumber < min) newPageNumber = min;

    states.pagination.pageNumber = newPageNumber;
    states.pagination.persistIndex = (newPageNumber - 1) * pageSize;
    setStates(states);
    renderUi();
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

    if (prePageNumber < max) {
      states.pagination.pageNumber = prePageNumber + 1;
      states.pagination.persistIndex = persistIndex + pageSize;
      setStates(states);
      renderUi();
    }
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
    if (prePageNumber > min) {
      states.pagination.pageNumber = prePageNumber - 1;
      states.pagination.persistIndex = persistIndex - pageSize;
      setStates(states);
      renderUi();
    }
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
    setStates(states);
    renderUi();
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
