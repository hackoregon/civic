module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      transparent: "transparent",
      black: "#201024",
      white: "#ffffff",
      gray: {
        light: "#F3F2F3",
        DEFAULT: "#AAA4AB",
        dark: "#726371"
      },
      accent: "#DC4556",
      red: "#DC4556",
      blue: "#1E62BD",
      green: "#19B7AA",
      purple: "#721D7C",
      yellow: "#FFB226"
    },
    fontFamily: {
      sans: ["Roboto Condensed", "sans-serif"],
      serif: ["Merriweather", "serif"]
    },
    boxShadow: {
      DEFAULT:
        "0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)",
      hover:
        "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)",
      active:
        "0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)"
    },
    extend: {
      typography: theme => ({
        DEFAULT: {
          css: {
            color: theme("colors.red")
          }
        }
      })
    }
  },
  variants: {
    extend: {
      backgroundColor: ["active"]
    }
  },
  plugins: [require("@tailwindcss/typography")]
};
