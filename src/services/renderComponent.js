import { handleSelectAll } from "../controllers/checkboxController.js";
import {
  currentPageNumberInput,
  empty,
  exportBtn,
  mainHeader,
  tbody,
  currentPageSize,
  thead,
  totalPage,
} from "../utils/constants.js";
import { formateDate, getStates, setStates } from "../utils/helper.js";

function renderTableBody() {
  const states = getStates();
  if (states) {
    const { pageNumber, pageSize } = states.pagination;

    // clear previous
    tbody.innerHTML = "";

    // create body rows fragment
    const fragment = document.createDocumentFragment();
    const rows = states.filteredData; // array of object of filtered data
    const temp = (pageNumber - 1) * pageSize;

    for (let idx = temp; idx < temp + pageSize && idx < rows.length; idx++) {
      const row = rows[idx]; // current row object
      const tr = document.createElement("tr");

      // add select row check box
      const td = document.createElement("td");
      const selectRow = document.createElement("input");
      selectRow.type = "checkbox";
      selectRow.dataset._id = row._id;
      td.appendChild(selectRow);
      tr.appendChild(td);

      states.headers.forEach((e) => {
        const td = document.createElement("td");
        const cellData = row[e.header] ?? ""; // check value is present or not
        td.textContent = e.type == "date" ? formateDate(cellData) : cellData;
        tr.appendChild(td);
      });

      fragment.appendChild(tr);
    }

    // states.filteredData
    //   .slice((pageNumber - 1) * pageSize, pageSize)
    //   .forEach((row) => {
    //     const tr = document.createElement("tr");

    //     states.headers.forEach((e) => {
    //       const td = document.createElement("td");
    //       const cellData = row[e.header] ?? "";
    //       td.textContent = e.type == "date" ? formateDate(cellData) : cellData; // check value is present or not
    //       tr.appendChild(td);
    //     });

    //     fragment.appendChild(tr);
    //   });

    tbody.appendChild(fragment);
  }
}

const renderTableHeaders = () => {
  const states = getStates();
  if (states) {
    const {
      headers,
      sort: { sortBy, sortType },
    } = states;
    // clear previous
    thead.innerHTML = "";

    // create header row
    const tr = document.createElement("tr");

    // add checkbox in header
    const th = document.createElement("th");
    const selectAll = document.createElement("input");
    selectAll.type = "checkbox";
    selectAll.classList.add("select-all");
    th.appendChild(selectAll);
    tr.appendChild(th);

    // because if we put event listener in main file so it wil run first and gibe null
    selectAll.addEventListener("change", handleSelectAll);

    headers.forEach((e) => {
      const th = document.createElement("th");
      th.textContent = e.header;
      th.dataset.header = e.header;

      // create sorting arrow and append in header
      const arrow = document.createElement("i");
      arrow.classList.add("fa-solid", "fa-arrow-up-long", "arrow");

      // handle arrow toggle
      if (sortBy === e.header) {
        arrow.style.visibility = "visible";

        // id desc then rotate 180 deg
        if (sortType === "desc") {
          // arrow.style.transform = "rotate(180deg)";
          requestAnimationFrame(() => {
            arrow.classList.add("desc");
          });
        }
      }

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
    currentPageSize.value = states.pagination.pageSize;
    totalPage.textContent = states.pagination.totalPage;
    currentPageNumberInput.value = states.pagination.pageNumber;
    currentPageNumberInput.max = states.pagination.totalPage;
    states.selectedRows = [];
  }
  setStates(states);
  renderTableHeaders();
  renderTableBody();
};

export { renderTableBody, renderUi, renderTableHeaders };
