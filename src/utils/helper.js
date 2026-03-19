import { loaderDiv } from "./constants.js";

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

export {
  showError,
  hideLoader,
  showLoader,
  getStates,
  setStates,
  formateDate,
  findPageNumber,
};
