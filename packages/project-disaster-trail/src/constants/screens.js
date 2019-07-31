export const XL = {
  label: "XL",
  width: 2400,
  height: 1800,
  interfaceHeight: 700
};
export const LG = {
  label: "LG",
  width: 768,
  height: 800,
  interfaceHeight: 250
};
export const SM = {
  label: "SM",
  width: 320,
  height: 799,
  interfaceHeight: 200
};

export const getScreen = () => {
  // default is XL
  let screen = XL;
  const width = window.innerWidth;
  if (width < XL.width) {
    screen = LG;
  }
  if (width < LG.width) {
    screen = SM;
  }

  return screen;
};
