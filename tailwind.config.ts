import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "background-color": "rgba(9, 53, 69, 1)",
        "input-background-color": "rgba(34, 73, 87, 1)",
        "button-background-color": "rgba(43, 209, 126, 1)",
        "card-background-color": "rgba(9, 44, 57, 1)",
      },
      height: {
        "80p": "80%",
        "70p": "70%",
      },
    },
  },
  plugins: [],
};
export default config;
