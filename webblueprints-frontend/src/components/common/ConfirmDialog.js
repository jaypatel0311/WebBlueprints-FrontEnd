import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Divider,
} from "@mui/material";

const ConfirmDialog = ({
  open,
  onClose,
  title,
  content,
  confirmText = "Yes",
  cancelText = "No",
  onConfirm,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          minWidth: 400,
          maxWidth: 500,
          p: 1,
        },
      }}
    >
      <DialogTitle sx={{ textAlign: "left", pb: 1 }}>{title}</DialogTitle>
      <Divider />
      <DialogContent sx={{ py: 3 }}>
        <Typography align="left" color="text.secondary" variant="h6">
          {content}
        </Typography>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3, justifyContent: "right", gap: 1 }}>
        <Button onClick={onClose} variant="outlined" sx={{ minWidth: 100 }}>
          {cancelText}
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          sx={{
            minWidth: 100,
            background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
          }}
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
