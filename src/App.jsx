import React from "react";
import {
    Grid,
    Container,
    Box,
    Typography,
} from "@mui/material";
import { useComponentsState } from "./hooks/useComponentsState";
import PrimaryComponent from "./components/PrimaryComponent";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function App() {
    const {
        components,
        renderCycle,
        addComponent,
        updateJson,
        resetComponents,
        handleDownload,
        handleUpload,
    } = useComponentsState();

    const hasComponents = components.length > 0;

    return (
        <>
            {/* Header now also shows component counter */}
            <Header onAddComponent={addComponent} componentCount={components.length} />

            <Container sx={{ mt: 3, mb: 10 }}>
                {!hasComponents ? (
                    // Empty state
                    <Box
                        sx={{
                            height: "65vh",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            textAlign: "center",
                        }}
                    >
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/4072/4072375.png"
                            alt="Empty"
                            width={120}
                            style={{ marginBottom: 16 }}
                        />

                        <Typography variant="h5" gutterBottom>
                            No Components Yet
                        </Typography>
                        <Typography color="text.secondary">
                            Use the <strong>Add Component</strong> button in the header to create one
                        </Typography>
                    </Box>
                ) : (
                    // Force full remount of Grid when renderCycle changes
                    <Grid key={renderCycle} container spacing={2}>
                        {components.map((comp, idx) => (
                            <Grid item xs={12} sm={6} md={4} key={comp.id}>
                                <PrimaryComponent
                                    index={idx}
                                    componentData={comp}
                                    onSaveJson={(key, jsonData) =>
                                        updateJson(
                                            comp.id,
                                            key,
                                            jsonData && Object.keys(jsonData).length === 0 ? null : jsonData
                                        )
                                    }
                                />
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Container>

            <Footer
                onReset={resetComponents}
                onDownload={handleDownload}
                onUpload={handleUpload}
            />
        </>
    );
}
