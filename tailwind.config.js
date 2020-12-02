module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      transparent: "transparent",
      black: "#201024",
      white: "#ffffff",
      red: {
        50: "#fef2f2",
        100: "#fee2e2",
        200: "#fecaca",
        300: "#fca5a5",
        400: "#f87171",
        500: "#ef4444",
        600: "#dc2626",
        700: "#b91c1c",
        800: "#991b1b",
        900: "#7f1d1d"
      },
      primary: "#201024",
      secondary: "#DC4556",
      tertiarty: "#201024",
      medium: "#AAA4AB",
      subdued: "#F3F2F3",
      action: {
        DEFAULT: "#1E62BD",
        plum: "#726371"
      },
      pink: "#DC4556",
      blue: "#1E62BD",
      green: "#19B7AA",
      purple: "#721D7C",
      yellow: "#FFB226"
    },
    fontFamily: {
      sans: ["Roboto Condensed", "sans-serif"],
      serif: ["Merriweather", "serif"]
    },
    extend: {}
  },
  variants: {
    extend: {
      backgroundColor: ["active"]
    }
  },
  plugins: []
};
