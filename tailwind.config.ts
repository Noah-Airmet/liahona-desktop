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
        // Semantic variables for the AI to use
        glass: {
          surface: "rgba(255, 255, 255, 0.08)",
          hover: "rgba(255, 255, 255, 0.12)",
          border: "rgba(255, 255, 255, 0.2)",
        },
        primary: {
          DEFAULT: "#38bdf8", // A crisp sky blue for accents
          glow: "rgba(56, 189, 248, 0.5)",
        }
      },
      backgroundImage: {
        'glass-gradient': 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)',
      }
    },
  },
  plugins: [],
};

export default config;
