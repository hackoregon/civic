// Large touch display
export const XL = {
  label: "XL",
  width: 2400
};

// tablet or desktop
export const LG = {
  label: "LG",
  width: 1440
};

export const MD = {
  label: "MD",
  width: 1200
};

// handheld
export const SM = {
  label: "SM",
  width: 768
};

export const getScreen = () => {
  // default is XL
  let screen = XL;
  const width = window.innerWidth;
  if (width < XL.width) {
    screen = LG;
  }
  if (width < LG.width) {
    screen = MD;
  }
  if (width < MD.width) {
    screen = SM;
  }

  return screen;
};
