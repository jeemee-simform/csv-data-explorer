import { convertIntoJSON, convertTextToRows } from "../services/fileParser.js";
import { CONSTANTS, fileInput } from "../utils/constants.js";
import {
  hideLoader,
  showError,
  showLoader,
  setStates,
} from "../utils/helper.js";
import { preProcessStates } from "../services/preProcessStates.js";
import { renderTable } from "../services/renderTable.js";

const handleFileUpload = async (e) => {
  try {
    const file = fileInput.files[0];

    // check file selected or not
    if (!file) return showError("Please select file");

    // check type
    if (!file.name.endsWith(".csv"))
      return showError("Please upload a valid CSV file");

    // 130MB allowed
    if (file.size > CONSTANTS.MAX_FILE_SIZE) return showError("File too large");

    showLoader(); // start loader

    // read file as text
    const text = await file.text();

    // check file empty or not
    if (!text.trim()) return showError("CSV file is empty");

    console.time("parseCSV"); // start CSV parsing
    // convert csv text into rows
    const rows = convertTextToRows(text);
    // Convert into JSON with validation
    const result = convertIntoJSON(rows);
    console.timeEnd("parseCSV"); // end CSV parsing

    // Give warnings if any inconsistency in data
    if (result.errors.length) {
      console.warn(result.errors);
    }

    // Generate initial states and set it in local storage
    const states = preProcessStates(result);
    setStates(states);

    // render table and it wil automatically get state from local storage
    // renderTable();

    setTimeout(() => hideLoader(), 0); // hide loader
  } catch (err) {
    console.error(err);
    return showError(err.message);
  }
};

export { handleFileUpload };
