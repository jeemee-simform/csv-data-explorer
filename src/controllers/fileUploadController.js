import { CONSTANTS, fileInput } from "../utils/constants.js";
import { hideLoader, showError, showLoader } from "../utils/helper.js";

const handleFileUpload = (e) => {
  const file = fileInput.files[0];

  if (!file) return showError("Please select file");

  // check type
  if (!file.name.endsWith(".csv"))
    return showError("Please upload a valid CSV file");

  // 50MB allowed
  if (file.size > CONSTANTS.MAX_FILE_SIZE) return showError("File too large");

  // start loader
  showLoader();

  // start file read
  const reader = new FileReader();

  reader.onload = function (event) {
    const text = event.target.result;

    // start csv parsing
    console.time("parseCSV");
    const data = parseCSV(text);
    console.timeEnd("parseCSV");

    //hide loader
    hideLoader();
    console.log(data);
  };

  reader.readAsText(file);
};

export { handleFileUpload };
