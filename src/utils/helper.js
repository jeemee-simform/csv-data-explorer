import { loaderDiv } from "./constants.js";

const showError = (message) => alert(message); // Error show helper

const showLoader = () => (loaderDiv.style.display = "flex"); // Show loader helper

const hideLoader = () => (loaderDiv.style.display = "none"); // Hide loader helper

const getStates = () => JSON.parse(localStorage.getItem("states")); // Get states from local storage

const setStates = (states) =>
  localStorage.setItem("states", JSON.stringify(states)); // Set states in to local storage

export { showError, hideLoader, showLoader, getStates, setStates };
