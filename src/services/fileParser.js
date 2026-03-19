const convertTextToRows = (text) => {
  const rows = [];
  let row = [];
  let field = "";
  let insideQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const next = text[i + 1];

    if (char === '"') {
      if (insideQuotes && next === '"') {
        field += '"';
        i++;
      } else {
        insideQuotes = !insideQuotes;
      }
    } else if (char === "," && !insideQuotes) {
      row.push(field);
      field = "";
    } else if ((char === "\n" || char === "\r") && !insideQuotes) {
      if (char === "\r" && next === "\n") i++;

      row.push(field);
      rows.push(row);

      row = [];
      field = "";
    } else {
      field += char;
    }
  }

  if (field || row.length) {
    row.push(field);
    rows.push(row);
  }

  if (insideQuotes) {
    throw new Error("Malformed CSV: Unclosed quotes");
  }

  return rows;
};

const convertIntoJSON = (rows) => {
  const errors = [];

  if (!rows.length) {
    throw new Error("CSV is empty");
  }

  // Clean headers
  let headers = rows[0].map((h) => h.trim());

  // Handle duplicate headers
  const seen = new Map();
  headers = headers.map((h) => {
    if (seen.has(h)) {
      const count = seen.get(h) + 1;
      seen.set(h, count);
      return `${h}_${count}`;
    }
    seen.set(h, 0);
    return h;
  });

  const data = [];

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];

    // skip empty row
    if (row.every((cell) => cell.trim() === "")) continue;

    if (row.length !== headers.length) {
      errors.push({
        row: i + 1,
        type: "COLUMN_MISMATCH",
        message: `Expected ${headers.length}, got ${row.length}`,
      });
      continue;
    }

    const obj = {
      _id: i,
    };

    headers.forEach((key, index) => {
      let value = row[index].trim();

      if (value === "") {
        obj[key] = null;
      } else if (!isNaN(value)) {
        obj[key] = Number(value);
      } else if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
        obj[key] = new Date(value);
      } else {
        obj[key] = value;
      }
    });

    data.push(obj);
  }

  return { headers, data, errors };
};

export { convertTextToRows, convertIntoJSON };
