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
        "primary": "#7755F3",
        "primary-pale": "#9F85FF",
        "primary-complementary": "#55F378",
        "primary-contrast": "#F3B655",
        "base-middle": "#B8B8B8",
        "base-black": "#363B40",
        "base-background": "#EEEFF3",
        "base-white": "#FFFFFF",
        "gradient-from": "#D1E6F0",
        "gradient-to": "#C4C5E4"
      }
    },
  },
  plugins: [],
};
export default config;