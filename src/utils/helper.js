import { sortFilteredData } from "../services/applySortData.js";
import { searchData } from "../services/search.js";
import { currentPageSize, loaderDiv } from "./constants.js";

const showError = (message) => alert(message); // Error show helper

const showLoader = () => (loaderDiv.style.display = "flex"); // Show loader helper

const hideLoader = () => (loaderDiv.style.display = "none"); // Hide loader helper

const getStates = () => JSON.parse(localStorage.getItem("states")); // Get states from local storage

const formateDate = (date) => date.split("T")[0]; // convert date obj into string yyyy-mm-dd

// find out new page number from persistIndex
const findPageNumber = (newPageSize, persistIndex) =>
  Math.ceil(persistIndex / newPageSize) + 1;

// Set states in to local storage
const setStates = (states) =>
  localStorage.setItem("states", JSON.stringify(states));

// find header obj from states
const findHeaderObj = (header) =>
  getStates().headers.find((h) => h.header === header);

// create next unique id for add data
const getUId = () => {
  const states = getStates();
  const { uId } = states;
  states.uId = uId + 1;
  setStates(states);
  return uId;
};

// remove element from array
Array.prototype.remove = function (_id) {
  return this.filter((e) => e != _id);
};

// make any function into debounced function
function debounce(fn, delay = 300) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

// update pagination
const updatePagination = () => {
  const pageEvent = new Event("change");
  currentPageSize.dispatchEvent(pageEvent);
};

// update filtered data with search and sort
const updateFilteredData = () => {
  searchData();
  sortFilteredData();
  updatePagination();
};

const searchWithDebounce = debounce(updateFilteredData, 300); // make search with debounce

export {
  showError,
  hideLoader,
  showLoader,
  getStates,
  setStates,
  formateDate,
  findPageNumber,
  findHeaderObj,
  getUId,
  debounce,
  updateFilteredData,
  updatePagination,
  searchWithDebounce,
};
