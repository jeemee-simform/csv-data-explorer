import { renderUi } from "../services/renderComponent.js";
import { currentPageSize, thead } from "../utils/constants.js";
import { getStates, setStates } from "../utils/helper.js";

const handleDelete = () => {
  try {
    const states = getStates();
    const {
      selectedRows,
      originalData,
      sort: { cellIndex },
    } = states;

    states.originalData = originalData.filter(
      (e) => !selectedRows.includes(e._id),
    );
    states.filteredData = states.originalData;
    setStates(states);

    // manually fire event pagesize
    const pageEvent = new Event("change");
    currentPageSize.dispatchEvent(pageEvent);

    if (cellIndex !== null) {
      const sortEvent = new Event("click");
      document
        .querySelectorAll("th")
        .forEach((e) =>
          e.cellIndex == cellIndex ? e.dispatchEvent(sortEvent) : null,
        );
    }

    renderUi();
  } catch (err) {
    console.error(err);
    return showError(err.message);
  }
};

export { handleDelete };

// const states = getStates();

// const {
//   selectedRows,
//   originalData,
//   sort: { cellIndex },
// } = states;

// const newOriginalData = originalData.filter(
//   (e) => !selectedRows.includes(e._id)
// );

// const newStates = {
//   ...states,
//   originalData: newOriginalData,
//   filteredData: newOriginalData,
// };

// setStates(newStates);

// // ✅ render first
// renderUi();

// // ✅ trigger after DOM ready
// currentPageSize.dispatchEvent(
//   new Event("change", { bubbles: true })
// );

// if (cellIndex !== null && cellIndex !== undefined) {
//   const th = document.querySelectorAll("th")[cellIndex];

//   if (th) {
//     th.dispatchEvent(
//       new MouseEvent("click", { bubbles: true, cancelable: true })
//     );
//   }
// }
