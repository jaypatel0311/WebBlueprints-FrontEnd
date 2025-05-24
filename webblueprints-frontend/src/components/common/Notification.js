import { Alert, Snackbar } from "@mui/material";

export const Notification = ({ open, message, severity, onClose }) => (
  <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
    <Alert severity={severity} onClose={onClose}>
      {message}
    </Alert>
  </Snackbar>
);
