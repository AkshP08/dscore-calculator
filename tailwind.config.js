/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        eg: {
          // Element-group accent colours.
          1: "#f59e0b", // EG I — non-acro (amber)
          2: "#06b6d4", // EG II — acro forward (cyan)
          3: "#a855f7", // EG III — acro backward (violet)
          4: "#f43f5e", // EG IV — single salto w/ turns (rose)
        },
      },
    },
  },
  plugins: [],
};
