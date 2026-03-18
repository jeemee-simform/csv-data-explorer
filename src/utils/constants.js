const fileInput = document.querySelector(".select-file");
const uploadBtn = document.querySelector(".upload-btn");
const exportBtn = document.querySelector(".export-btn");
const addDataBtn = document.querySelector(".add-data-btn");
const resetBtn = document.querySelector(".reset-btn");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const deleteBtn = document.querySelector(".delete-btn");
const loaderDiv = document.querySelector(".loader");
const thead = document.querySelector("thead");
const tbody = document.querySelector("tbody");
const currentPageNumberInput = document.querySelector(".current-page-number");
const searchInput = document.querySelector(".search");

const CONSTANTS = {
  MAX_FILE_SIZE: 130 * 1024 * 1024,
  DEFAULT_PAGE_SIZE: 25,
};

export {
  CONSTANTS,
  addDataBtn,
  currentPageNumberInput,
  deleteBtn,
  exportBtn,
  nextBtn,
  prevBtn,
  resetBtn,
  searchInput,
  uploadBtn,
  fileInput,
  loaderDiv,
  tbody,
  thead,
};
