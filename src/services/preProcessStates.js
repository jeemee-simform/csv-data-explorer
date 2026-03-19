import { CONSTANTS } from "../utils/constants.js";

const preProcessStates = ({ data, headers }) => {
  const states = {
    originalData: [...data],
    filteredData: [...data],
    headers: buildHeaders(headers, data),
    pagination: {
      pageNumber: 1,
      pageSize: CONSTANTS.DEFAULT_PAGE_SIZE,
      persistIndex: 0,
      totalPage: Math.ceil(data.length / CONSTANTS.DEFAULT_PAGE_SIZE),
    },
    sort: {
      sortBy: null,
      sortType: null,
      cellIndex: null,
    },
    search: {
      searchBy: "all",
      searchText: "",
    },
    selectedRows: [],
  };
  return states;
};

const buildHeaders = (headers, data) => {
  return headers.map((h) => ({
    header: h,
    type: detectType(data, h),
    visible: true,
  }));
};

const detectType = (data, key) => {
  let isNumber = true;
  let isDate = true;

  for (let i = 0; i < Math.min(20, data.length); i++) {
    const val = data[i][key]; // data is array of object

    if (val === null) continue;

    if (typeof val !== "number") {
      isNumber = false;
    }

    if (typeof val !== "object") {
      isDate = false;
    }
  }

  if (isNumber) return "number";
  if (isDate) return "date";
  return "string";
};

export { preProcessStates };
