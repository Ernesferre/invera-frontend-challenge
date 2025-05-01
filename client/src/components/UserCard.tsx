// UserCard.tsx
import { Box, Typography, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { ReactElement } from "react";
import { useTheme } from "@mui/material/styles";

type UserCardProps = {
  title: string;
  qty: number;
  icon: ReactElement;
};

export default function UserCard({ title, qty, icon }: UserCardProps) {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  return (
    <Box
      sx={{
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        padding: "20px",
        gap: "10px",
        width: {
          xs: "100%",
          sm: "100%",
        },
        minWidth: "242px",
        height: "80px",
        backgroundColor: isDarkMode ? "black" : "white",
        border: "0.6px solid #5F5F5F",
        borderRadius: "8px",
        position: "relative",
      }}
    >
      <Box display="flex" alignItems="center" gap={2} width="100%">
        <Box
          sx={{
            backgroundColor: "#21243B",
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {icon}
        </Box>

        <Box display="flex" flexDirection="column">
          <Typography
            sx={{
              fontFamily: "Inter, sans-serif",
              fontSize: "14px",
              fontWeight: 600,
              color: isDarkMode ? "#D1D5DB" : "black",
            }}
          >
            {title}
          </Typography>
          <Typography
            sx={{
              fontFamily: "Inter, sans-serif",
              fontSize: "16px",
              fontWeight: 700,
              color: isDarkMode ? "#D1D5DB" : "gray",
            }}
          >
            {qty}
          </Typography>
        </Box>
      </Box>

      <IconButton
        size="small"
        sx={{
          position: "absolute",
          top: 20,
          right: 8,
          color: "#71717A",
        }}
      >
        <MoreVertIcon fontSize="small" />
      </IconButton>
    </Box>
  );
}
