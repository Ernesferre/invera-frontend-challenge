import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Box, Typography, Avatar, Chip, IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LanguageIcon from "@mui/icons-material/Language";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WorkIcon from "@mui/icons-material/Work";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { User } from "../../services/userService";

export const getColumns = (
  handleOpenEditDialog: (user: User) => void,
  handleOpenDeleteDialog: (user: User) => void
): GridColDef[] => {
  const isTablet = typeof window !== "undefined" && window.innerWidth < 900;

  return [
    {
      field: "name",
      headerName: "Name",
      flex: 1.5,
      minWidth: 150,
      renderHeader: () => (
        <Box display="flex" alignItems="center" gap={1}>
          <PersonIcon sx={{ color: "white", fontSize: 18 }} />
          <Typography
            color="white"
            fontSize={12}
            fontWeight={600}
            sx={{ textTransform: "none" }}
          >
            Name
          </Typography>
        </Box>
      ),
      renderCell: (params: GridRenderCellParams<User>) => {
        const avatarUrl = params.row.avatar
          ? params.row.avatar
          : `https://i.pravatar.cc/150?img=${
              Math.floor(Math.random() * 70) + 1
            }`;
        return (
          <Box display="flex" alignItems="center" gap={1}>
            <Avatar src={avatarUrl} alt={params.row.name} />
            <Box>
              <Typography
                fontSize={14}
                fontWeight={500}
                color="#E2E8F0"
                sx={{
                  fontSize: {
                    xs: 10,
                    sm: 14,
                  },
                }}
              >
                {params.row.name}
              </Typography>
              <Typography
                fontSize={12}
                color="#b0b0b0"
                sx={{
                  fontSize: {
                    xs: 10,
                    sm: 14,
                  },
                }}
              >
                {params.row.email}
              </Typography>
            </Box>
          </Box>
        );
      },
    },
    {
      field: "phone",
      headerName: "Phone",
      flex: 1,
      minWidth: 100,
      renderHeader: () => (
        <Box display="flex" alignItems="center" gap={1}>
          <PhoneIcon sx={{ color: "white", fontSize: 18 }} />
          <Typography
            color="white"
            fontSize={12}
            fontWeight={600}
            sx={{ textTransform: "none" }}
          >
            Phone
          </Typography>
        </Box>
      ),
      renderCell: (params: GridRenderCellParams<User>) => (
        <Typography
          sx={{
            whiteSpace: "normal",
            wordBreak: "break-word",
            fontSize: {
              xs: 8,
              sm: 12,
              md: 14,
            },
            color: "white",
          }}
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: "location",
      headerName: "Location",
      flex: 1,
      renderHeader: () => (
        <Box display="flex" alignItems="center" gap={1}>
          <LocationOnIcon sx={{ color: "white", fontSize: 18 }} />
          <Typography
            color="white"
            fontSize={12}
            fontWeight={600}
            sx={{ textTransform: "none" }}
          >
            Location
          </Typography>
        </Box>
      ),
      renderCell: (params: GridRenderCellParams<User>) => (
        <Typography color="white" fontSize={14}>
          {params.value}
        </Typography>
      ),
    },
    {
      field: "company",
      headerName: "Company",
      flex: 1,
      renderHeader: () => (
        <Box display="flex" alignItems="center" gap={1}>
          <WorkIcon sx={{ color: "white", fontSize: 18 }} />
          <Typography
            color="white"
            fontSize={12}
            fontWeight={600}
            sx={{ textTransform: "none" }}
          >
            Company
          </Typography>
        </Box>
      ),
      renderCell: (params: GridRenderCellParams<User>) => (
        <Box display="flex" alignItems="center" gap={1}>
          {params.value === "Facebook" && (
            <FacebookIcon sx={{ color: "#94A3B8" }} fontSize="small" />
          )}
          {params.value === "Twitter" && (
            <TwitterIcon sx={{ color: "#94A3B8" }} fontSize="small" />
          )}
          {params.value === "YouTube" && (
            <YouTubeIcon sx={{ color: "#94A3B8" }} fontSize="small" />
          )}
          {params.value === "Webflow" && (
            <LanguageIcon sx={{ color: "#94A3B8" }} fontSize="small" />
          )}
          {params.value === "Google" && (
            <LanguageIcon sx={{ color: "#94A3B8" }} fontSize="small" />
          )}
          <Typography color="white" fontSize={14}>
            {params.value}
          </Typography>
        </Box>
      ),
    },
    {
      field: "status",
      headerName: "Status",
      flex: isTablet ? 1.5 : 0.8,
      renderHeader: () => (
        <Box
          display="flex"
          alignItems="center"
          gap={1}
          sx={{ display: { xs: "none", sm: "flex" } }}
        >
          <CheckBoxIcon sx={{ color: "white", fontSize: 18 }} />
          <Typography
            color="white"
            fontSize={12}
            fontWeight={600}
            sx={{ textTransform: "none" }}
          >
            Status
          </Typography>
        </Box>
      ),
      renderCell: (params: GridRenderCellParams<User>) => (
        <Chip
          label={
            <Box display="flex" alignItems="center" gap="6px">
              <Box
                sx={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  backgroundColor:
                    params.value === "Online" ? "#34D399" : "#71717A",
                }}
              />
              {params.value}
            </Box>
          }
          variant="filled"
          size="small"
          sx={{
            backgroundColor: params.value === "Online" ? "#064E3B" : "#27272A",
            color: params.value === "Online" ? "#34D399" : "#71717A",
            fontWeight: 500,
            fontSize: "12px",
            height: "24px",
            borderRadius: "4px",
            px: { xs: 0.5, sm: 1.5 },
          }}
        />
      ),
    },
    {
      field: "actions",
      headerName: "",
      sortable: false,
      flex: 0.6,
      minWidth: 80,
      renderCell: (params: GridRenderCellParams<User>) => (
        <Box display="flex">
          <IconButton
            size="small"
            onClick={() => handleOpenEditDialog(params.row)}
          >
            <EditIcon sx={{ color: "white", fontSize: 18 }} />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => handleOpenDeleteDialog(params.row)}
          >
            <DeleteIcon sx={{ color: "white", fontSize: 18 }} />
          </IconButton>
        </Box>
      ),
    },
  ];
};
