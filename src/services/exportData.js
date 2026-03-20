function convertToCSV(data, headers) {
  if (!data.length) return "";

  const keys = headers.map((h) => h.header);

  // header row
  const headerRow = keys.join(",");

  const rows = data.map((row) =>
    headers
      .map((h) => {
        let value = row[h.header];

        // Handle types
        if (h.type === "number") {
          return value ?? "";
        }

        if (h.type === "date") {
          // format date for Excel readability
          value = value ? new Date(value).toLocaleDateString() : "";
          return `"${value}"`;
        }

        // string
        value = String(value ?? "").replace(/"/g, '""');
        return `"${value}"`;
      })
      .join(","),
  );

  return [headerRow, ...rows].join("\n");
}

function downloadCSV(csv, filename = "export.csv") {
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });

  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;

  document.body.appendChild(a);
  a.click();

  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export { convertToCSV, downloadCSV };
