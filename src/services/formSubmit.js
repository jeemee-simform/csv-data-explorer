import { getStates, getUId, setStates } from "../utils/helper.js";

const getFormData = (form, headers) => {
  // create abd get default js form data object
  const formData = new FormData(form);
  const obj = {};

  //  make row object
  headers.forEach((h) => {
    if (h.header === "_id") return;

    let value = formData.get(h.header);

    // type casting
    if (h.type === "number") {
      value = value ? Number(value) : null;
    }

    if (h.type === "date") {
      value = value ? new Date(value).toISOString() : null;
    }

    obj[h.header] = value;
  });

  // generate id
  obj._id = getUId();

  return obj;
};

const createNewRow = (form) => {
  const states = getStates();

  if (!form.checkValidity()) {
    alert("Please fill all fields correctly");
    return null;
  }

  return getFormData(form, states.headers);
};

const addRowToState = (newRow) => {
  const states = getStates();

  states.originalData.push(newRow);

  setStates(states);
};

export { createNewRow, addRowToState };
