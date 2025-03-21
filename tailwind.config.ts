import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
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
      },
    },
  },
  plugins: [],
};
export default config;
