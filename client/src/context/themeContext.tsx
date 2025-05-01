import {
    createContext,
    useContext,
    useMemo,
    useState,
    useEffect,
    ReactNode,
  } from "react";
  import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
  
  interface ThemeContextType {
    isDarkMode: boolean;
    toggleTheme: () => void;
  }
  
  const ThemeModeContext = createContext<ThemeContextType | undefined>(undefined);
  
  // eslint-disable-next-line react-refresh/only-export-components
  export const useThemeMode = () => {
    const context = useContext(ThemeModeContext);
    if (!context) throw new Error("useThemeMode must be used within ThemeModeProvider");
    return context;
  };
  
  export const ThemeModeProvider = ({ children }: { children: ReactNode }) => {
    // Leer de localStorage 
    const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
      const saved = localStorage.getItem("theme");
      if (saved === "dark") return true;
      if (saved === "light") return false;
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      return prefersDark;
    });
  
    // Guardo en localStorage cuando cambia
    useEffect(() => {
      localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    }, [isDarkMode]);
  
    const toggleTheme = () => {
      setIsDarkMode((prev) => !prev);
    };
  
    const theme = useMemo(
      () =>
        createTheme({
          palette: {
            mode: isDarkMode ? "dark" : "light",
            background: {
              default: isDarkMode ? "#212121" : "#F9FAFB",
            },
          },
          typography: {
            fontFamily: "Inter, sans-serif",
          },
        }),
      [isDarkMode]
    );
  
    return (
      <ThemeModeContext.Provider value={{ isDarkMode, toggleTheme }}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </ThemeModeContext.Provider>
    );
  };
  