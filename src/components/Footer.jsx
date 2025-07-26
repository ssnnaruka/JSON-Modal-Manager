import React, { useRef } from "react";
import { Box, Button, Stack } from "@mui/material";

export default function Footer({ onReset, onDownload, onUpload }) {
    const fileInputRef = useRef(null);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const parsed = JSON.parse(e.target.result);
                onUpload(parsed);

                // Reset file input so same file can be selected again
                if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                }
            } catch (err) {
                alert("Invalid JSON file");
            }
        };
        reader.readAsText(file);
    };

    return (
        <Box
            sx={{
                position: "fixed",
                bottom: 0,
                left: 0,
                width: "100%",
                background: "#fff",
                padding: 2,
                borderTop: "1px solid #ddd",
                textAlign: "center",
            }}
        >
            <Stack direction="row" spacing={2} justifyContent="center">
                <Button variant="contained" color="error" onClick={onReset}>
                    Reset
                </Button>
                <Button variant="contained" onClick={onDownload}>
                    Download
                </Button>

                {/* Upload now resets input after every use */}
                <Button variant="contained" component="label">
                    Upload
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept=".json"
                        hidden
                        onChange={handleFileUpload}
                    />
                </Button>
            </Stack>
        </Box>
    );
}
