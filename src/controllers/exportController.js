import { convertToCSV, downloadCSV } from "../services/exportData.js";
import { getStates } from "../utils/helper.js";

function handleExport() {
  try {
    const states = getStates();

    const { filteredData, headers, selectedRows } = states;

    const dataToExport = selectedRows.length
      ? filteredData.filter((row) => selectedRows.includes(row._id))
      : filteredData;

    const visibleHeaders = headers.filter((h) => h.visible);

    const csv = convertToCSV(dataToExport, visibleHeaders);

    downloadCSV(csv, "export.csv");
  } catch (err) {
    console.error(err);
    return showError(err.message);
  }
}

export { handleExport };
