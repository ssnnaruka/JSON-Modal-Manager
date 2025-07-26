import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Stack,
} from "@mui/material";

export default function JsonModal({ title, initialJson, onSave, onClose }) {
  const [jsonInput, setJsonInput] = useState("{}");
  const [error, setError] = useState(null);

  useEffect(() => {
    setJsonInput(initialJson ? JSON.stringify(initialJson, null, 2) : "{}");
  }, [initialJson]);

  const validateJson = (value) => {
    try {
      JSON.parse(value);
      setError(null);
    } catch {
      setError("Invalid JSON format");
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setJsonInput(value);
    validateJson(value);
  };

  const handleSaveClick = () => {
    if (!error) {
      const parsed = JSON.parse(jsonInput);
      onSave(parsed);
    }
  };

  const handleBeautify = () => {
    try {
      const formatted = JSON.stringify(JSON.parse(jsonInput), null, 2);
      setJsonInput(formatted);
      setError(null);
    } catch {
      setError("Cannot format invalid JSON");
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(jsonInput);
  };

  const handleClearJson = () => {
    // Send null back to parent → clears saved JSON
    onSave(null);
  };

  return (
      <Dialog open onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <Stack spacing={1}>
            <TextField
                multiline
                fullWidth
                minRows={10}
                value={jsonInput}
                onChange={handleInputChange}
                error={Boolean(error)}
                helperText={error ? "Invalid JSON" : "Valid JSON"}
                sx={{
                  "& .MuiInputBase-root": {
                    fontFamily: "monospace",
                  },
                }}
            />
            {error && <Typography color="error">{error}</Typography>}

            {/* Beautify & Copy buttons */}
            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Button onClick={handleBeautify}>Beautify</Button>
              <Button onClick={handleCopy}>Copy JSON</Button>
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions>
          {/* New Clear JSON button */}
          {initialJson && (
              <Button color="error" onClick={handleClearJson}>
                Clear JSON
              </Button>
          )}
          <Button disabled={!!error} onClick={handleSaveClick} variant="contained">
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
  );
}
