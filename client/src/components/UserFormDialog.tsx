import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  MenuItem,
} from "@mui/material";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";

interface UserFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (userData: Omit<User, "id">) => void;
  editingUser?: User;
  mode?: "create" | "edit";
}

interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  phone: string;
  location: string;
  company: string;
  status: "Online" | "Offline";
}

const companies = ["Facebook", "Twitter", "YouTube", "Webflow", "Google"];

export default function UserFormDialog({
  open,
  onClose,
  onSubmit,
  editingUser,
  mode = "create",
}: UserFormDialogProps) {
  const [formData, setFormData] = useState<Omit<User, "id">>({
    name: "",
    email: "",
    avatar: "",
    phone: "",
    location: "",
    company: companies[0],
    status: "Offline",
  });

  useEffect(() => {
    if (editingUser && mode === "edit") {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, ...userData } = editingUser;
      setFormData(userData);
    }
  }, [editingUser, mode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
    if (mode === "create") {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "User has been created successfully",
        showConfirmButton: false,
        timer: 3000,
      });
      setFormData({
        name: "",
        email: "",
        avatar: "",
        phone: "",
        location: "",
        company: companies[0],
        status: "Offline",
      });
    } else if (mode === "edit") {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "User has been updated successfully",
        showConfirmButton: false,
        timer: 3000,
      });
      setFormData({
        name: "",
        email: "",
        avatar: "",
        phone: "",
        location: "",
        company: companies[0],
        status: "Offline",
      });
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          backgroundColor: "#1F2937",
          color: "white",
          width: {
            xs: "90vw", 
            sm: "500px",
          },
          maxWidth: "calc(100vw - 20px)",
        },
      }}
    >
      <DialogTitle sx={{ borderBottom: "1px solid #374151" }}>
        {mode === "create" ? "Add New User" : "Edit User"}
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} mt={1}>
            <TextField
              label="Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: "white",
                  "& fieldset": { borderColor: "#374151" },
                  "&:hover fieldset": { borderColor: "#4B5563" },
                },
                "& .MuiInputLabel-root": { color: "#9CA3AF" },
              }}
            />
            <TextField
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: "white",
                  "& fieldset": { borderColor: "#374151" },
                  "&:hover fieldset": { borderColor: "#4B5563" },
                },
                "& .MuiInputLabel-root": { color: "#9CA3AF" },
              }}
            />
            <TextField
              label="Avatar URL"
              value={formData.avatar}
              onChange={(e) =>
                setFormData({ ...formData, avatar: e.target.value })
              }
              required
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: "white",
                  "& fieldset": { borderColor: "#374151" },
                  "&:hover fieldset": { borderColor: "#4B5563" },
                },
                "& .MuiInputLabel-root": { color: "#9CA3AF" },
              }}
            />
            <TextField
              label="Phone"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              required
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: "white",
                  "& fieldset": { borderColor: "#374151" },
                  "&:hover fieldset": { borderColor: "#4B5563" },
                },
                "& .MuiInputLabel-root": { color: "#9CA3AF" },
              }}
            />
            <TextField
              label="Location"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              required
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: "white",
                  "& fieldset": { borderColor: "#374151" },
                  "&:hover fieldset": { borderColor: "#4B5563" },
                },
                "& .MuiInputLabel-root": { color: "#9CA3AF" },
              }}
            />
            <TextField
              select
              label="Company"
              value={formData.company}
              onChange={(e) =>
                setFormData({ ...formData, company: e.target.value })
              }
              required
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: "white",
                  "& fieldset": { borderColor: "#374151" },
                  "&:hover fieldset": { borderColor: "#4B5563" },
                },
                "& .MuiInputLabel-root": { color: "#9CA3AF" },
                "& .MuiMenuItem-root": { color: "black" },
              }}
            >
              {companies.map((company) => (
                <MenuItem key={company} value={company}>
                  {company}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label="Status"
              value={formData.status}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  status: e.target.value as "Online" | "Offline",
                })
              }
              required
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  color: "white",
                  "& fieldset": { borderColor: "#374151" },
                  "&:hover fieldset": { borderColor: "#4B5563" },
                },
                "& .MuiInputLabel-root": { color: "#9CA3AF" },
                "& .MuiMenuItem-root": { color: "black" },
              }}
            >
              <MenuItem value="Online">Online</MenuItem>
              <MenuItem value="Offline">Offline</MenuItem>
            </TextField>
          </Box>
        </DialogContent>
        <DialogActions sx={{ padding: 3, borderTop: "1px solid #374151" }}>
          <Button
            onClick={onClose}
            sx={{
              color: "#9CA3AF",
              "&:hover": { backgroundColor: "#374151" },
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "#3B82F6",
              "&:hover": { backgroundColor: "#2563EB" },
            }}
          >
            {mode === "create" ? "Save User" : "Save Changes"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
