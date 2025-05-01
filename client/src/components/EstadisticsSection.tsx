import { Box, Paper, Typography } from "@mui/material";
import StatsChart from "./StatsChart";
import { useTheme } from "@mui/material/styles";

const EstadisticsSection = () => {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";


  return (
    <Paper
      elevation={2}
      sx={{
        p: 4, 
        borderRadius: 2, 
        backgroundColor: isDarkMode ? "black" : "white", 
        border: "1px solid #444",
        mb: 5,
        height: {
            xs: "503px",
            sm: "321px"
        },
        
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontFamily: "Inter, sans-serif",
          fontWeight: 700,
          fontSize: "18px",
          lineHeight: "24px",
          color: isDarkMode ? "white" : "black",
          letterSpacing: "0px",
        }}
      >
        Estadistics
      </Typography>

      <Box
        display="flex"
        flex={1}
        alignItems="center"
        justifyContent="space-around"
        gap={0}
        sx={{
          flexDirection: {
            xs: "column",
            sm: "row",
          },
        }}
      >
        {/* StatsChart */}
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{
            width: "300px",
            height: "100%",
          }}
        >
          <StatsChart />
        </Box>

        {/* Lista de porcentajes */}
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          gap={2}
          sx={{ color: isDarkMode ? "white" : "black", fontFamily: "Inter, sans-serif" }}
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            sx={{
              width: {
                xs: "300px",
                sm: "200px", 
                md: "300px",
              },
            }}
          >
            <Box display="flex" alignItems="center" gap={1}>
              <Box width={8} height={8} borderRadius="50%" bgcolor="#3B82F6" />{" "}
              {/* Blue dot */}
              <Typography>Organic</Typography>
            </Box>
            <Typography>30%</Typography>
          </Box>

          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            sx={{
              width: {
                xs: "300px",
                sm: "200px",
                md: "300px", 
              },
            }}
          >
            <Box display="flex" alignItems="center" gap={1}>
              <Box width={8} height={8} borderRadius="50%" bgcolor="#22C55E" />{" "}
              <Typography>Social</Typography>
            </Box>
            <Typography>50%</Typography>
          </Box>

          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            sx={{
              width: {
                xs: "300px",
                sm: "200px",
                md: "300px", 
              },
            }}
          >
            <Box display="flex" alignItems="center" gap={1}>
              <Box width={8} height={8} borderRadius="50%" bgcolor="#10B981" />{" "}
              <Typography>Direct</Typography>
            </Box>
            <Typography>20%</Typography>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default EstadisticsSection;
