import { create } from "zustand";

interface ThemeStore {
  theme: Theme;
  change: (to: Theme) => void;
}

type Theme = "dark" | "light";

export const useTheme = create<ThemeStore>()((set) => ({
  theme: "dark",
  change: (to) => set(() => ({ theme: to })),
}));
