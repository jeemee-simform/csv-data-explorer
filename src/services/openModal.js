const buildDynamicForm = (headers) => {
  const fragment = document.createDocumentFragment();

  headers.forEach((h) => {
    if (h.header === "_id") return;
    if (!h.visible) return;

    const wrapper = document.createElement("div");
    wrapper.classList.add("form-group");

    const label = document.createElement("label");
    label.textContent = h.header;

    const input = document.createElement("input");

    if (h.type === "number") {
      input.type = "number";
      input.placeholder = `Enter ${h.header}`;
    } else if (h.type === "date") {
      input.type = "date";
    } else {
      input.type = "text";
      input.placeholder = `Enter ${h.header}`;
    }

    input.name = h.header;
    input.required = true;

    wrapper.appendChild(label);
    wrapper.appendChild(input);

    fragment.appendChild(wrapper);
  });

  return fragment;
};

export { buildDynamicForm };
