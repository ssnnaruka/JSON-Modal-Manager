import React from "react";
import { AppBar, Toolbar, Typography, Button, Box, Chip } from "@mui/material";

export default function Header({ onAddComponent, componentCount }) {
    return (
        <AppBar position="static" color="primary">
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                {/* Left side: Title + counter */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Typography variant="h6">JSON Modal Manager</Typography>

                    {/* Component counter */}
                    <Chip
                        label={`Components: ${componentCount}`}
                        color="secondary"
                        size="small"
                    />
                </Box>

                {/* Right side: Add Component */}
                <Button variant="contained" color="secondary" onClick={onAddComponent}>
                    Add Component
                </Button>
            </Toolbar>
        </AppBar>
    );
}
