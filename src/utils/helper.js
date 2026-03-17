import { loaderDiv } from "./constants.js";

const showError = (message) => alert(message);

const showLoader = () => (loaderDiv.style.display = "flex");

const hideLoader = () => (loaderDiv.style.display = "none");

export { showError, hideLoader, showLoader };
