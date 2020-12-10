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
      red: {
        light: "#F59AA5",
        DEFAULT: "#DC4556",
        dark: "#A33340"
      },
      blue: {
        light: "#87AFE6",
        DEFAULT: "#1E62BD",
        dark: "#16498C"
      },
      green: {
        light: "#84E3DB",
        DEFAULT: "#19B7AA",
        dark: "#13877E"
      },
      purple: {
        light: "#BC89C2",
        DEFAULT: "#721D7C",
        dark: "#3C0B41"
      },
      yellow: {
        light: "#FFDC88",
        DEFAULT: "#FFB226",
        dark: "#BD841C"
      }
    },
    fontFamily: {
      sans: ['"Roboto Condensed", sans-serif'],
      serif: ['"Merriweather", serif'],
      mono: ['"Roboto Mono", mono'],
      rubik: ['"Rubik", sans-serif']
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
        sm: { css: { fontFamily: theme("fontFamily.sans") } },
        DEFAULT: {
          css: {
            color: theme("colors.black"),
            fontFamily: theme("fontFamily.serif"),
            a: {
              color: theme("colors.black"),
              fontFamily: theme("fontFamily.rubik"),
              fontWeight: 500,
              "&:hover": {
                color: theme("colors.accent")
              }
            },
            h1: {
              fontFamily: theme("fontFamily.rubik"),
              fontWeight: 300
            },
            h2: {
              fontFamily: theme("fontFamily.rubik"),
              fontWeight: 700
            },
            h3: {
              fontFamily: theme("fontFamily.rubik"),
              fontWeight: 900
            },
            h4: {
              fontFamily: theme("fontFamily.rubik"),
              fontWeight: 900
            },
            h5: {
              fontFamily: theme("fontFamily.rubik"),
              fontWeight: 700
            },
            h6: {
              fontFamily: theme("fontFamily.rubik"),
              fontWeight: 700
            },
            table: {
              fontFamily: theme("fontFamily.sans")
            }
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
  // eslint-disable-next-line
  plugins: [require("@tailwindcss/typography")]
};
