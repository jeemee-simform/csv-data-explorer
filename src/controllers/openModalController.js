import { buildDynamicForm } from "../services/openModal.js";
import {
  dynamicForm,
  modalOverlay,
  closeModalBtn,
  cancelModalBtn,
} from "../utils/constants.js";
import { getStates, closeModal } from "../utils/helper.js";

const handleOpenAddModal = () => {
  try {
    const states = getStates();

    // clean old form
    dynamicForm.innerHTML = "";

    // create form and append in modal
    const fragment = buildDynamicForm(states.headers);
    dynamicForm.appendChild(fragment);

    // focus first input , set time out because input need to render first
    setTimeout(() => dynamicForm.querySelector("input")?.focus(), 0);

    // open modal
    modalOverlay.style.display = "flex";

    // add close functionality on modal btn
    closeModalBtn.onclick = closeModal;
    cancelModalBtn.onclick = closeModal;
  } catch (err) {
    console.error(err);
    return showError(err.message);
  }
};

export { handleOpenAddModal };
