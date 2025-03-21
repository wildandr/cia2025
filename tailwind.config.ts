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
        "custom-580": "580px",
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
        "cia-dark": "#443F38",
        "cia-primary": "#524D45",
        "sbc-dark": "#B43C1A",
        "fcec-dark": "#003B60",
        "cic-dark": "#AD7727",
        "sbc-secondary": "#FF5F33",
        "sbc-third": "#B53B1A",
        "fcec-primary": "#2395DD",
        "fcec-secondary": "#2395DD",
        "fcec-third": "#00568D",
        'cic-primary': '#FFC974',
        'cic-secondary': '#FCB342',
        'cic-third': '#AC7828',
        'cic-footer': '#D69500',
        'craft-primary': '#524D45',
        'craft-secondary': '#696155',
        'craft-third': '#463F35',
      },
    },
  },
  plugins: [],
};
export default config;
