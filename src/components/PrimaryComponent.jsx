import React, { useState, memo, lazy, Suspense } from "react";
import {
  Card,
  CardContent,
  Button,
  Typography,
  Stack,
} from "@mui/material";

const JsonModal = lazy(() => import("./JsonModal"));

function PrimaryComponent({ index, componentData, onSaveJson }) {
  const [modalType, setModalType] = useState(null);

  const handleSave = (jsonData) => {
    onSaveJson(
        modalType === "action" ? "actionJson" : "demoJson",
        jsonData
    );
    setModalType(null);
  };

  const hasAction =
      componentData?.actionJson &&
      Object.keys(componentData.actionJson).length > 0;
  const hasDemo =
      componentData?.demoJson &&
      Object.keys(componentData.demoJson).length > 0;

  return (
      <Card sx={{ width: 320 }}>
        <CardContent>
          {/* Show component index in title */}
          <Typography variant="h6" sx={{ mb: 2 }}>
            Component #{index + 1}
          </Typography>

          {/* Vertical buttons showing saved/unsaved state */}
          <Stack direction="column" spacing={1}>
            <Button
                variant={hasAction ? "contained" : "outlined"}
                color="primary"
                onClick={() => setModalType("action")}
            >
              Action
            </Button>
            <Button
                variant={hasDemo ? "contained" : "outlined"}
                color="secondary"
                onClick={() => setModalType("demo")}
            >
              Demo
            </Button>
          </Stack>
        </CardContent>

        {modalType && (
            <Suspense fallback={<div>Loading...</div>}>
              <JsonModal
                  title={modalType === "action" ? "Action JSON" : "Demo JSON"}
                  initialJson={
                    modalType === "action"
                        ? componentData?.actionJson
                        : componentData?.demoJson
                  }
                  onSave={handleSave}
                  onClose={() => setModalType(null)}
              />
            </Suspense>
        )}
      </Card>
  );
}

export default memo(PrimaryComponent);
