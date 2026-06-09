import { createContext, useContext, useEffect, type ReactNode } from "react";

type Theme = "dark" | "light";

interface ThemeProviderState {
  theme: Theme;
  resolvedTheme: Theme;
  setTheme: (theme: Theme) => void;
}

const initialState: ThemeProviderState = {
  theme: "light",
  resolvedTheme: "light",
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  // Tonante é light-only: o tema fica travado em "light" — sem toggle, sem
  // leitura de preferência salva. A arquitetura de tema é mantida (herdada do
  // template PCYES) só para não quebrar quem consome useTheme().
  const theme: Theme = "light";

  const setTheme = (_newTheme: Theme) => {
    /* no-op — Tonante não alterna tema */
  };

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("dark");
    root.classList.add("light");
  }, []);

  return (
    <ThemeProviderContext.Provider value={{ theme, resolvedTheme: theme, setTheme }}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeProviderContext);
