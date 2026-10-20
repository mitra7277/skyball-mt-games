import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: { extend: { colors: { sky: { deep: "#0a2a5e" } } } },
  plugins: [],
};
export default config;
