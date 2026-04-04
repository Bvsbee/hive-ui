/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Hive theme colors
        hive: {
          primary: "#2D3B5C", // Dark blue background
          secondary: "#4A5A7A", // Muted blue borders
          accent: "#f9f6deff", // Light cream text
          error: "#FF4D4D", // Error red
          surface: "#2D3B5C", // Card backgrounds
          onSurface: "#f9f6deff", // Text on surfaces
          border: "#4A5A7A", // Borders
        },
        // Semantic aliases for easy switching
        background: "#2D3B5C",
        foreground: "#f9f6deff",
        border: "#4A5A7A",
        destructive: "#FF4D4D",
      },
      fontFamily: {
        sans: [
          "System",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        mono: [
          "Menlo",
          "Monaco",
          "Consolas",
          "Liberation Mono",
          "Courier New",
          "monospace",
        ],
      },
      spacing: {
        18: "4.5rem",
        88: "22rem",
        128: "32rem",
        144: "36rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1rem" }],
        sm: ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1rem", { lineHeight: "1.5rem" }],
        lg: ["1.125rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "1.75rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
        "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
        "5xl": ["3rem", { lineHeight: "1" }],
      },
      boxShadow: {
        soft: "0 2px 8px rgba(0, 0, 0, 0.1)",
        medium: "0 4px 16px rgba(0, 0, 0, 0.15)",
        hard: "0 8px 32px rgba(0, 0, 0, 0.2)",
      },
    },
  },
  plugins: [],
};
