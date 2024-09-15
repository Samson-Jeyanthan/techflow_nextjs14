import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1400px",
    },
    extend: {
      colors: {
        primary: {
          "100": "#070A0F",
          "500": "#ffffff",
        },
        dark: {
          "100": "#000000",
          "200": "#070A0F",
          "250": "#0B0F15",
          "300": "#101722",
          "350": "#1B1E2D",
          "400": "#2A2A3E",
          "500": "#414157",
        },
        light: {
          "500": "#7F7F8C",
          "600": "#9292A3",
          "700": "#BCC1CF",
          "750": "#DDDFE5",
          "800": "#F0F0F0",
          "850": "#FAFAFA",
          "900": "#ffffff",
        },
        custom: {
          "100": "#C92437",
          "200": "#ffb100",
        },
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      fontFamily: {
        poppins: ["var(--font-poppins)"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
