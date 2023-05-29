const theme = require("./utils/config.util").theme;

module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: theme,
    // colors: {
    //   Marti: "#006DA7",
    // },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
