import flowbite from "flowbite/plugin";
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}", "../../node_modules/flowbite-react/lib/**/*.js"],
  plugins: [flowbite],
  theme: {
    extend: {
      boxShadow: {
        '3xl': '0px 0px 0px 0px rgba(0, 0, 0, 0.3)',
      }
    }
  }
};

export default config;
