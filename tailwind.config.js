module.exports = {
  purge: ["./src/**/*.js*", "./packages/**/src/**/*.js*"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      transparent: "transparent",
      black: "#201024",
      white: "#FFFEFE",
      gray: {
        100: "#f3f2f3",
        200: "#dddadd",
        300: "#c9c5c9",
        400: "#b3adb3",
        500: "#9d959d",
        600: "#877d87",
        700: "#726972",
        800: "#5a535a",
        900: "#423d42"
      },
      brand: "#DC4556",
      accent: "#3B1054",
      action: "#3523B8",
      success: "#18A807",
      error: "#F30007",
      warning: "#D37C12",
      informational: "#0D57A3",
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
        sm: {
          css: {
            fontFamily: theme("fontFamily.sans"),
            h1: {
              fontFamily: theme("fontFamily.sans"),
              fontWeight: 700
            },
            h2: {
              fontFamily: theme("fontFamily.sans"),
              fontWeight: 700
            },
            h3: {
              fontFamily: theme("fontFamily.sans"),
              fontWeight: 700
            },
            h4: {
              fontFamily: theme("fontFamily.sans"),
              fontWeight: 700
            },
            h5: {
              fontFamily: theme("fontFamily.sans"),
              fontWeight: 700
            },
            h6: {
              fontFamily: theme("fontFamily.sans"),
              fontWeight: 700
            }
          }
        },
        DEFAULT: {
          css: {
            color: theme("colors.black"),
            fontFamily: theme("fontFamily.serif"),
            a: {
              color: theme("colors.action"),
              fontWeight: "bold",
              textDecoration: "none",
              "&:hover": {
                color: theme("colors.accent"),
                textDecoration: "underline"
              }
            },
            h1: {
              fontFamily: theme("fontFamily.rubik"),
              fontWeight: 500
            },
            h2: {
              fontFamily: theme("fontFamily.rubik"),
              fontWeight: 400
            },
            h3: {
              fontFamily: theme("fontFamily.rubik"),
              fontWeight: 500
            },
            h4: {
              fontFamily: theme("fontFamily.rubik"),
              fontWeight: 400
            },
            h5: {
              fontFamily: theme("fontFamily.rubik"),
              fontWeight: 400
            },
            h6: {
              fontFamily: theme("fontFamily.rubik"),
              fontWeight: 300
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
