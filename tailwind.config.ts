import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ["var(--font-pretendard)"],
      },
      fontSize: {
        h1: "60px",
        h2: "48px",
        h3: "40px",
        h4: "36px",
        body1: "32px",
        body2: "20px",
        body3: "18px",
        body4: "16px",
        body5: "14px",
        caption: "12px",
        button: "16px",
      },
      colors: {
        mainNavy: {
          50: "#E6E9EF",
          100: "#C0CBD9",
          200: "#98A5BF",
          300: "#7282A5",
          400: "#546894",
          500: "#364F84",
          600: "#30487C",
          700: "#283E70",
          800: "#213564",
          900: "#18254C",
        },
        secondBlue: {
          50: "#E1F5FD",
          100: "#B2E6FA",
          200: "#80D5F7",
          300: "#4CC5F4",
          400: "#1CB8F3",
          500: "#00ACF2",
          600: "#009EE3",
          700: "#008BD0",
          800: "#0079BC",
          900: "#005A9B",
        },
        scaleGray: {
          0: "#FFFFFF",
          100: "#F5F5F5",
          200: "#E9E9E9",
          300: "#C5C5C5",
          400: "#9F9F9F",
          500: "#7D7D7D",
          600: "#575757",
          700: "#454545",
          800: "#282828",
          900: "#121212",
        },
        background: "#F1F3F8",
        warning: "#FF294F",
        success: "#1FCE65",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        blur: {
          "0%": { filter: "blur(0)" },
          "25%": { filter: "blur(2px)" },
          "50%": { filter: "blur(5px)" },
          "75%": { filter: "blur(2px)" },
          "100%": { filter: "blur(0)" },
        },
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
export default config;
