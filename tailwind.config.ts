import { type Config } from "tailwindcss";

export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js", // datepicker
  ],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config;
