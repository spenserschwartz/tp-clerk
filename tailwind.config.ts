import { type Config } from "tailwindcss";

export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js", // datepicker
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/aspect-ratio"), // Images with details from https://tailwindui.com/components/application-ui/lists/grid-lists
    require("@tailwindcss/forms"), // Combobox
  ],
} satisfies Config;
