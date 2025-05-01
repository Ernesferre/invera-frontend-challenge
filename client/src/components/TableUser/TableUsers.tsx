import { DataGrid, GridPaginationModel } from "@mui/x-data-grid";
import { Box, IconButton, Paper, Typography } from "@mui/material";
import { InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { useCallback, useState } from "react";
import UserFormDialog from "../UserFormDialog";
import DeleteConfirmDialog from "../DeleteConfirmDialog";
import axios from "axios";
import { getColumns } from "./columnsDefinition";
import { useTheme } from "@mui/material/styles";

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

export default function TableUsers({
  users,
  onEditUser,
  loading
}: {
  users: User[];
  onEditUser: (user: User) => void;
  loading: boolean
}) {
  const [search, setSearch] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [editingUser, setEditingUser] = useState<User | undefined>(undefined);
  const [dialogMode, setDialogMode] = useState<"create" | "edit">("create");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });

  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingUser(undefined);
  };

  const handleSubmit = (userData: Omit<User, "id">) => {
    if (dialogMode === "edit" && editingUser) {
      onEditUser({ ...userData, id: editingUser.id });
    }
  };

  const handleOpenEditDialog = useCallback(
    (user: User) => {
      setDialogMode("edit");
      onEditUser(user);
    },
    [onEditUser]
  );

  const handleOpenDeleteDialog = (user: User) => {
    setUserToDelete(user);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setUserToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (userToDelete) {
      try {
        await axios.delete(`http://localhost:8000/users/${userToDelete.id}`);
        window.location.reload();
      } catch (error) {
        console.error("Error al eliminar el usuario:", error);
      }
    }
    handleCloseDeleteDialog();
  };

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()) ||
      u.location.toLowerCase().includes(search.toLowerCase()) ||
      u.company.toLowerCase().includes(search.toLowerCase())
  );

  const startIndex = paginationModel.page * paginationModel.pageSize;
  const endIndex = startIndex + paginationModel.pageSize;
  const isMobile = typeof window !== "undefined" && window.innerWidth < 600;

  return (
    <Paper
      sx={{
        width: "100%",
        borderRadius: 2,
        backgroundColor: isDarkMode ? "black" : "white",
        overflow: "hidden",
        border: "1px solid #5F5F5F",
        "& .MuiDataGrid-root": {
          "&::-webkit-scrollbar": {
            display: "none",
          },
          scrollbarWidth: "none",
          "-ms-overflow-style": "none",
        },
      }}
    >
      <Box
        display="flex"
        alignItems={{ xs: "flex-start", sm: "center" }}
        justifyContent="space-between"
        flexWrap="wrap"
        px={3}
        py={2}
        borderBottom="1px solid #1F2937"
        sx={{
          flexDirection: {
            xs: "column",
            sm: "row",
          },
          alignItems: {
            xs: "flex-start",
            sm: "center",
          },
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent={{ xs: "center", sm: "flex-start" }}
          gap={1}
          width={{ xs: "100%", sm: "auto" }}
        >
          <Typography
            variant="subtitle1"
            fontWeight={600}
            
            sx={{
              color: isDarkMode ? "#E2E8F0" : "black",
              fontSize: {
                xs: "14px",
                sm: "18px",
              },
              mt: {
                xs: 2,
                sm: 0,
              },
            }}
          >
            All Users
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              border: "1px solid #5F5F5F",
              borderRadius: "6px",
              width: 240,
              height: 36,
              // ml: 3,
              ml: { xs: 0, sm: 3 },
              mt: { xs: 2, sm: 0 },
            }}
          >
            <SearchIcon sx={{ color: isDarkMode ? "#BABABA" : "black", ml: 1.5, fontSize: 20 }} />
            <InputBase
              placeholder="Search for..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{
                ml: 1,
                flex: 1,
                color: isDarkMode ? "#BABABA" : "black",
                fontSize: 14,
                "& .MuiInputBase-input::placeholder": {
                  color: isDarkMode ? "#BABABA" : "gray",
                  opacity: 1,
                },
              }}
            />
            {search && (
              <IconButton
                size="small"
                onClick={() => setSearch("")}
                sx={{
                  color: "#BABABA",
                  padding: "4px",
                  mr: 1,
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  },
                }}
              >
                <ClearIcon sx={{ fontSize: 16 }} />
              </IconButton>
            )}
          </Box>
        </Box>
        <Typography
          color="#94A3B8"
          fontSize={14}
          sx={{
            mt: { xs: 2, sm: 0 },
            alignSelf: { xs: "flex-start", sm: "center" },
          }}
        >
          {`${startIndex + 1}-${Math.min(endIndex, filteredUsers.length)} of ${
            filteredUsers.length
          }`}
        </Typography>
      </Box>

      <DataGrid
        rows={filteredUsers}
        columns={getColumns(handleOpenEditDialog, handleOpenDeleteDialog)}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        disableRowSelectionOnClick
        autoHeight={false}
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        loading={loading}
        localeText={{
          noRowsLabel: loading
            ? ""
            : "No se encontraron resultados para esa búsqueda.",
        }}
        columnVisibilityModel={{
          phone: isMobile ? false : true,
          location: isMobile ? false : true,
          company: isMobile ? false : true,
        }}
        sx={{
          border: "none",
          color: "gray",
          backgroundColor: "black",
          height: 650,
          "--DataGrid-rowBorderColor": "#5F5F5F",
          "--DataGrid-border-color": "transparent",
          "& .MuiDataGrid-overlay": {
            backgroundColor: "black",
            color: "white",
            fontSize: "16px",
          },
          "& .MuiDataGrid-main": {
            backgroundColor: "black",
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "black",
            color: "white",
            fontSize: 12,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
            minHeight: "48px !important",
            maxHeight: "48px !important",
          },
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: "black",
            "&:focus": {
              outline: "none",
            },
            "&:focus-within": {
              outline: "none",
            },
          },
          "& .MuiDataGrid-columnSeparator": {
            display: "none",
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            fontWeight: 600,
            color: "white",
          },
          "& .MuiDataGrid-columnHeaderCheckbox .MuiCheckbox-root": {
            color: "white",
          },

          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: "black",
          },
          "& .MuiDataGrid-row": {
            backgroundColor: "black",
            borderBottom: "none",
            minHeight: "62px !important",
            maxHeight: "62px !important",
            "&:hover": {
              backgroundColor: "#1F2937",
              "& .MuiDataGrid-cell": {
                backgroundColor: "#1F2937",
                borderBottom: "none",
              },
            },
            "&.Mui-selected": {
              backgroundColor: "#1F2937",
              "&:hover": {
                backgroundColor: "#1F2937",
              },
              "& .MuiDataGrid-cell": {
                backgroundColor: "#1F2937",
              },
            },
          },
          "& .MuiDataGrid-cell": {
            backgroundColor: "black",
            borderBottom: "none",
            display: "flex",
            alignItems: "center",
            px: { xs: 0, sm: 3 },
            "&:focus": {
              outline: "none",
            },
            "&:focus-within": {
              outline: "none",
            },
          },
          "& .MuiDataGrid-cellContent": {
            width: "100%",
          },
          "& .MuiCheckbox-root": {
            color: "#64748B",
            "&.Mui-checked": {
              color: "#3B82F6",
            },
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: isDarkMode ? "black" : "white",
            borderTop: "1px solid rgba(255, 255, 255, 0.05)",
            minHeight: "52px !important",
            maxHeight: "52px !important",
          },
          "& .MuiTablePagination-root": {
            color: "#94A3B8",
          },
          "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows":
            {
              color: "#94A3B8",
            },
          "& .MuiTablePagination-select": {
            color: "#94A3B8",
          },
          "& .MuiDataGrid-iconButtonContainer": {
            color: "white",
            visibility: "visible !important",
          },
          "& .MuiDataGrid-sortIcon": {
            color: "white",
          },
          "& .MuiDataGrid-filterIcon": {
            color: "white",
          },
          "& .MuiDataGrid-menuIcon": {
            color: "white",
            visibility: "visible !important",
            "& .MuiSvgIcon-root": {
              color: "white",
            },
          },
          "& .MuiDataGrid-menu": {
            "& .MuiPaper-root": {
              backgroundColor: "#1F2937",
            },
            "& .MuiMenuItem-root": {
              color: "white",
            },
          },
        }}
      />

      <UserFormDialog
        open={openDialog}
        onClose={handleCloseDialog}
        onSubmit={handleSubmit}
        editingUser={editingUser}
        mode={dialogMode}
      />

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        onConfirm={handleConfirmDelete}
        userName={userToDelete?.name || ""}
      />
    </Paper>
  );
}
