import { handleFileUpload } from "./controllers/fileUploadController.js";
import {
  handleChangePageNumber,
  handleChangePageSize,
  handleNextBtn,
  handlePrevBtn,
} from "./controllers/paginationController.js";
import { renderUi } from "./services/renderComponent.js";
import {
  addDataBtn,
  currentPageNumberInput,
  currentPageSize,
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
prevBtn.addEventListener("click", handlePrevBtn);
nextBtn.addEventListener("click", handleNextBtn);
currentPageSize.addEventListener("change", handleChangePageSize);
deleteBtn.addEventListener("click", () => {});
currentPageNumberInput.addEventListener("change", handleChangePageNumber);
searchInput.addEventListener("input", () => {});

renderUi();
