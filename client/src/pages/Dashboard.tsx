import { Box, Alert } from "@mui/material";
import UserCard from "../components/UserCard";
import Header from "../components/Header";
import TableUsers from "../components/TableUser/TableUsers";
import { useEffect, useState } from "react";
import UserFormDialog from "../components/UserFormDialog";
import { userService, type User } from "../services/userService";
import EstadisticsSection from "../components/EstadisticsSection";
import { mock_users } from "../mocks/mock_users";
import Grid from "@mui/material/Grid";
import { motion } from "framer-motion";

const Dashboard = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [editingUser, setEditingUser] = useState<User | undefined>(undefined);
  const [dialogMode, setDialogMode] = useState<"create" | "edit">("create");
  const [loading, setLoading] = useState(true);

  const loadInitialUsers = async () => {
    try {
      const data = await userService.getUsers();
      setUsers(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInitialUsers();
  }, []);

  const handleAddUser = async (userData: Omit<User, "id">) => {
    try {
      const newUser = await userService.createUser(userData);
      setUsers([...users, newUser]);
    } catch (err) {
      setError("Error al agregar el usuario");
      console.error(err);
    }
  };

  const handleEditUser = async (id: number, userData: Omit<User, "id">) => {
    try {
      const updatedUser = await userService.updateUser(id, userData);
      setUsers(users.map((user) => (user.id === id ? updatedUser : user)));
    } catch (err) {
      setError("Error al actualizar el usuario");
      console.error(err);
    }
  };

  const handleOpenDialog = () => {
    setDialogMode("create");
    setEditingUser(undefined);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingUser(undefined);
  };

  const handleOpenEditDialog = (user: User) => {
    setDialogMode("edit");
    setEditingUser(user);
    setOpenDialog(true);
  };

  const handleSubmit = (userData: Omit<User, "id">) => {
    if (dialogMode === "edit" && editingUser) {
      handleEditUser(editingUser.id, userData);
    } else {
      handleAddUser(userData);
    }
  };

  return (
    <Box
      sx={{
        margin: "0 auto",
        mb: 4,
        px: {
          xs: 0,
          sm: 4,
          md: 4,
        },
      }}
    >
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <Header onAddClick={handleOpenDialog} />

      {/* Seccion 1: Users Cards */}
      <Grid
        container
        sx={{
          mt: { xs: 4, sm: 2 },
          mb: { xs: 4, sm: 4 },
          display: "flex",
          justifyContent: "space-between",
          gap: 4,
          flexDirection: {
            xs: "column",
            sm: "row",
          },
        }}
      >
        {mock_users.map((user, index) => {
          const Icon = user.icon;
          return (
            <Grid
              key={user.title || index}
              container
              component={motion.div}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              sx={{
                mb: { xs: 0, sm: 1 },
                mt: { xs: 0, sm: 1 },
                display: "flex",
                justifyContent: "space-between",
                gap: 4,
                flexDirection: {
                  xs: "column",
                  sm: "row",
                },
              }}
            >
              <UserCard
                title={user.title}
                qty={user.qty}
                icon={<Icon sx={{ color: "#8AB4F8", fontSize: "20px" }} />}
              />
            </Grid>
          );
        })}
      </Grid>

      {/* Seccion 2: Estadisticas */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <EstadisticsSection />
      </motion.div>

      {/* Secccion 3: Tabla de usuarios */}
      <Box>
        <TableUsers
          users={users}
          onEditUser={handleOpenEditDialog}
          loading={loading}
        />
      </Box>

      <UserFormDialog
        open={openDialog}
        onClose={handleCloseDialog}
        onSubmit={handleSubmit}
        editingUser={editingUser}
        mode={dialogMode}
      />
    </Box>
  );
};

export default Dashboard;
