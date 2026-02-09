/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", 
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        "eci-blue": "#0071dc",
        "eci-red": "#e30613",
        "eci-dark": "#333333",
        "eci-gray": "#f5f5f5",
      },
    },
  },
  plugins: [],
};
