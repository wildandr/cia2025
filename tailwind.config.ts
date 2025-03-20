import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        'custom-580': '580px', 
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        openSans: ["var(--font-open-sans)", "sans-serif"],
        plusJakarta: ["var(--font-plus-jakarta)", "sans-serif"],
      },
      colors: {
        "sbc-primary": "#ED4F23",
        "sbc-secondary": "#FF5F33",
        "sbc-third": "#B53B1A",
      },
    },
  },
  plugins: [],
};
export default config;
