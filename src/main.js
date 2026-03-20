import { handleSelectCheckbox } from "./controllers/checkboxController.js";
import { handleFileUpload } from "./controllers/fileUploadController.js";
import { handleDelete } from "./controllers/deleteDataController.js";
import {
  handleChangePageNumber,
  handleChangePageSize,
  handleNextBtn,
  handlePrevBtn,
} from "./controllers/paginationController.js";
import {
  handleColumnSearch,
  handleSearch,
} from "./controllers/searchController.js";
import { handleSorting } from "./controllers/sortingController.js";
import { renderUi } from "./services/renderComponent.js";
import {
  addDataBtn,
  columnSearch,
  currentPageNumberInput,
  currentPageSize,
  deleteBtn,
  exportBtn,
  nextBtn,
  prevBtn,
  resetBtn,
  searchInput,
  tbody,
  thead,
  uploadBtn,
} from "./utils/constants.js";
import { handleResetBtn } from "./controllers/reset.js";

uploadBtn.addEventListener("click", handleFileUpload);
exportBtn.addEventListener("click", () => {});
addDataBtn.addEventListener("click", () => {});
resetBtn.addEventListener("click", handleResetBtn);
prevBtn.addEventListener("click", handlePrevBtn);
nextBtn.addEventListener("click", handleNextBtn);
currentPageSize.addEventListener("change", handleChangePageSize);
deleteBtn.addEventListener("click", handleDelete);
currentPageNumberInput.addEventListener("change", handleChangePageNumber);
searchInput.addEventListener("input", handleSearch);
columnSearch.addEventListener("change", handleColumnSearch);
thead.addEventListener("click", handleSorting);
tbody.addEventListener("change", handleSelectCheckbox);

renderUi();
