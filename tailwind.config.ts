import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        brand: {
          50: "#FAF7FE",
          100: "#EDE9FE",
          500: "#8B5CF6",
          700: "#6D28D9",
          900: "#3B0764",
        },
        gold: "#C9A24A",
        ink: "#1F1235",
        muted: "#6B6480",
        whatsapp: "#25D366",
        // legacy aliases kept so nothing that still references them breaks
        pink: "#6D28D9",
        chocolate: "#1F1235",
        cream: "#FAF7FE",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        serif: ["var(--font-dm-serif)", "serif"],
        brand: ["var(--font-montserrat)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
