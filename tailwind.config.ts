import { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Ubuntu", ...fontFamily.sans],
    },
    extend: {},
  },
  darkMode: "class",
  plugins: [require("@tailwindcss/forms")],
} satisfies Config;
