import { IconButton } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

export default function ThemeToggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <IconButton onClick={onChange}>
      {checked ? (
        <LightModeIcon sx={{ color: "#9CA3AF" }} />
      ) : (
        <DarkModeIcon sx={{ color: "#FACC15" }} />
        
      )}
    </IconButton>
  );
}