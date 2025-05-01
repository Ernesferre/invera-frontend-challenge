import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

interface DeleteConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  userName: string;
}

export default function DeleteConfirmDialog({
  open,
  onClose,
  onConfirm,
  userName,
}: DeleteConfirmDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          backgroundColor: "#1F2937",
          color: "white",
          minWidth: "400px",
        },
      }}
    >
      <DialogTitle sx={{ borderBottom: "1px solid #374151" }}>
        Confirmar eliminación
      </DialogTitle>
      <DialogContent sx={{ mt: 2 }}>
        <Typography>
          ¿Estás seguro que deseas eliminar al usuario {userName}?
        </Typography>
      </DialogContent>
      <DialogActions sx={{ padding: 3, borderTop: "1px solid #374151" }}>
        <Button
          onClick={onClose}
          sx={{
            color: "#9CA3AF",
            "&:hover": { backgroundColor: "#374151" },
          }}
        >
          Cancelar
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          color="error"
          sx={{
            backgroundColor: "#DC2626",
            "&:hover": { backgroundColor: "#B91C1C" },
          }}
        >
          Eliminar
        </Button>
      </DialogActions>
    </Dialog>
  );
} 