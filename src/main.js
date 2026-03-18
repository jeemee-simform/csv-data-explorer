import { handleFileUpload } from "./controllers/fileUploadController.js";
import { renderUi } from "./services/renderComponent.js";
import {
  addDataBtn,
  currentPageNumberInput,
  deleteBtn,
  exportBtn,
  nextBtn,
  prevBtn,
  resetBtn,
  searchInput,
  uploadBtn,
} from "./utils/constants.js";

uploadBtn.addEventListener("click", handleFileUpload);
exportBtn.addEventListener("click", () => {});
addDataBtn.addEventListener("click", () => {});
resetBtn.addEventListener("click", () => {});
prevBtn.addEventListener("click", () => {});
nextBtn.addEventListener("click", () => {});
deleteBtn.addEventListener("click", () => {});
currentPageNumberInput.addEventListener("input", () => {});
searchInput.addEventListener("input", () => {});

renderUi();
