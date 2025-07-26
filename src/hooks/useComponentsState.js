import { useState } from "react";
import { nanoid } from "nanoid";

// Create a blank component with a unique id
const createBlankComponent = () => ({
  id: nanoid(),
  actionJson: null,
  demoJson: null,
});

export const useComponentsState = () => {
  const [components, setComponents] = useState([createBlankComponent()]);
  const [renderCycle, setRenderCycle] = useState(0); // used to force remount

  // Helper to trigger full Grid remount
  const triggerRerender = () => setRenderCycle((prev) => prev + 1);

  const addComponent = () => {
    setComponents((prev) => [...prev, createBlankComponent()]);
  };

  const updateJson = (componentId, key, jsonData) => {
    setComponents((prev) =>
        prev.map((comp) =>
            comp.id === componentId ? { ...comp, [key]: jsonData } : comp
        )
    );
  };

  const resetComponents = () => {
    setComponents([]); // clears all components
    triggerRerender(); // force Grid remount after reset
  };

  const handleDownload = () => {
    const jsonStr = JSON.stringify(components, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "components.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleUpload = (uploadedJson) => {
    if (!Array.isArray(uploadedJson)) {
      alert("Invalid JSON format. Expected an array of components.");
      return;
    }

    // Always assign fresh IDs to avoid React reuse issues
    const withFreshIds = uploadedJson.map((comp) => ({
      id: nanoid(),
      actionJson:
          comp.actionJson && Object.keys(comp.actionJson).length > 0
              ? comp.actionJson
              : null,
      demoJson:
          comp.demoJson && Object.keys(comp.demoJson).length > 0
              ? comp.demoJson
              : null,
    }));

    setComponents([...withFreshIds]);
    triggerRerender(); // force Grid remount after upload
  };

  return {
    components,
    renderCycle, // expose renderCycle for App.jsx
    addComponent,
    updateJson,
    resetComponents,
    handleDownload,
    handleUpload,
  };
};
