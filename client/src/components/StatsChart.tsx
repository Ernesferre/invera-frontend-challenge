import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const rings = [
  { color: "#3f51b5", percentage: 85, radius: 90 },
  { color: "#9fa8da", percentage: 65, radius: 80 },
  { color: "#00C49F", percentage: 50, radius: 70 },
];

const circumference = (r: number) => 2 * Math.PI * r;

const StatsChart = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";
  return (
    <Box sx={{ width: 220, height: 220, position: "relative" }}>
      <svg width="100%" height="100%" viewBox="0 0 220 220">
        <circle
          cx="110"
          cy="110"
          r="95"
          fill="none"
          stroke="#2c2c2c"
          strokeWidth="20"
        />
        {rings.map((ring, index) => {
          const radius = ring.radius;
          const dashArray = circumference(radius);
          const dashOffset = dashArray - (ring.percentage / 100) * dashArray;

          return (
            <circle
              key={index}
              cx="110"
              cy="110"
              r={radius}
              fill="none"
              stroke={ring.color}
              strokeWidth="6"
              strokeDasharray={dashArray}
              strokeDashoffset={dashOffset}
              strokeLinecap="round"
              transform="rotate(-180 110 110)"
            />
          );
        })}
      </svg>

      {/* Texto en el centro */}
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
          color:  isDarkMode ? "white" : "black",
        }}
      >
        <Typography variant="h4" fontWeight="bold">
          150k
        </Typography>
        <Typography variant="body2" fontSize={16}>
          users
        </Typography>
      </Box>
    </Box>
  );
};

export default StatsChart;
