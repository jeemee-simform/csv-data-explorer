import {
  empty,
  exportBtn,
  mainHeader,
  pageSize,
  tbody,
  thead,
} from "../utils/constants.js";
import { getStates } from "../utils/helper.js";

function renderTable() {
  const states = getStates();
  if (states) {
    // clear previous
    tbody.innerHTML = "";

    // create body rows fragment
    const fragment = document.createDocumentFragment();

    states.filteredData.forEach((row) => {
      const tr = document.createElement("tr");

      states.headers.forEach((e) => {
        const td = document.createElement("td");
        td.textContent = row[e.header] ?? ""; // check value is present or not
        tr.appendChild(td);
      });

      fragment.appendChild(tr);
    });

    tbody.appendChild(fragment);
  }
}

const renderHeaders = () => {
  const states = getStates();
  if (states) {
    const { pageSize, pageNumber, totalPage } = states.pagination;

    // clear previous
    thead.innerHTML = "";

    // create header row
    const tr = document.createElement("tr");

    states.headers.forEach((e) => {
      const th = document.createElement("th");
      th.textContent = e.header;

      // create sorting arrow and append in header
      const arrow = document.createElement("i");
      arrow.classList.add("fa-solid", "fa-arrow-up-long", "arrow");

      th.appendChild(arrow); // arrow append in header
      tr.appendChild(th); // header append in tr
    });
    thead.appendChild(tr); // hall tr append in thead
  }
};

const renderUi = () => {
  const states = getStates();
  if (states) {
    empty.style.display = "none";
    exportBtn.style.display = "block";
    mainHeader.style.display = "flex";
    pageSize.value = states.pagination.pageSize;
  }
  renderHeaders();
  renderTable();
};

export { renderTable, renderUi, renderHeaders };
