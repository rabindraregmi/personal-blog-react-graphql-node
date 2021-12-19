import React, { useContext, useState } from "react";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

const SnackbarContext = React.createContext<any>(null);
const SNACKBAR_TYPE = {
  INFO: "info",
  WARNING: "warning",
  SUCCESS: "success",
  ERROR: "error",
};

export function useSnackBar() {
  return useContext(SnackbarContext);
}
export function SnackbarProvider({ children }: any) {
  const [snackBarState, setSnackBarState] = useState({
    display: false,
    type: "",
    message: "",
  });

  const resetSnackBarState = () =>
    setSnackBarState({ display: false, type: "", message: "" });

  return (
    <SnackbarContext.Provider value={{ snackBarState, setSnackBarState }}>
      <Snackbar
        open={snackBarState.display}
        autoHideDuration={3000}
        onClose={() => resetSnackBarState()}
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
      >
        <Alert
          onClose={() => resetSnackBarState()}
          severity={
            snackBarState.type === SNACKBAR_TYPE.SUCCESS
              ? "success"
              : snackBarState.type === SNACKBAR_TYPE.ERROR
              ? "error"
              : snackBarState.type === SNACKBAR_TYPE.INFO
              ? "info"
              : "warning"
          }
        >
          {snackBarState.message}
        </Alert>
      </Snackbar>

      {children}
    </SnackbarContext.Provider>
  );
}
