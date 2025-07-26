export const downloadJSON = (data, filename) => {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();

  URL.revokeObjectURL(url);
};

export const uploadJSONFile = (event) => {
  return new Promise((resolve) => {
    const file = event.target.files[0];
    if (!file) return resolve(null);

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target.result);
        resolve(parsed);
      } catch (err) {
        alert("Invalid JSON file");
        resolve(null);
      }
    };
    reader.readAsText(file);
  });
};