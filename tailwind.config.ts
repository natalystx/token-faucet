import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryBackground: "#14121F",
        primary: {
          300: "#8F55C5",
          500: "#6811D9",
          950: "#1F1D31",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
export default config;
