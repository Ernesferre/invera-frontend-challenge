import { Box, Button, Typography } from "@mui/material";
import ThemeToggle from "./ThemeToggle";
import { useThemeMode } from "../context/themeContext";
import { useTheme } from "@mui/material/styles";


interface HeaderProps {
  onAddClick: () => void;
}

const Header = ({ onAddClick }: HeaderProps) => {
  const { isDarkMode, toggleTheme } = useThemeMode();
  const theme = useTheme();

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Typography
        variant="h4"
        sx={{
          color: theme.palette.mode === "dark" ? "white" : "black",
        }}
      >
        Users
      </Typography>

      <ThemeToggle checked={isDarkMode} onChange={toggleTheme} />
      <Button
  variant="contained"
  onClick={onAddClick}
  sx={{
    width: "137px",
    height: "32px",
    padding: "0 16px",
    textTransform: "none",
    backgroundColor: isDarkMode ? "#7B99FF" : "#3B82F6",
    borderRadius: "4px",
    fontWeight: 600,
    fontSize: "14px",
    color: isDarkMode ? "white" : "white",
    "&:hover": {
      backgroundColor: isDarkMode ? "#6883e6" : "#2563EB",
    },
  }}
>
  Add user
</Button>

    </Box>
  );
};

export default Header;
