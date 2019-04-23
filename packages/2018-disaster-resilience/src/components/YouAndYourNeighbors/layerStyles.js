// Slide 016 - points of interest - from packages/civic-sandbox/src/state/layerStyles.js
export const poiIconMapping = {
  School: {
    x: 0,
    y: 0,
    width: 250,
    height: 250,
    mask: true
  },
  Hospital: {
    x: 250,
    y: 0,
    width: 250,
    height: 250,
    mask: true
  },
  BEECN: {
    x: 500,
    y: 0,
    width: 250,
    height: 250,
    mask: true
  },
  "Fire Station": {
    x: 0,
    y: 250,
    width: 250,
    height: 250,
    mask: true
  },
  Pin: {
    x: 250,
    y: 250,
    width: 250,
    height: 250,
    mask: true
  },
  COMMCTR: {
    x: 500,
    y: 250,
    width: 250,
    height: 250,
    mask: true
  }
};

export const poiIconZoomScale = zoom =>
  zoom > 11.5
    ? 10
    : zoom > 10.5
    ? 8
    : zoom > 9.5
    ? 6
    : zoom > 8.5
    ? 4
    : zoom > 7.5
    ? 2
    : 1;

export const poiGetIconColor = f =>
  f.properties.type === "BEECN"
    ? [0, 0, 0, 255]
    : f.properties.type === "COMMCTR"
    ? [114, 29, 124, 255]
    : f.properties.type === "Fire Station"
    ? [220, 69, 86, 255]
    : f.properties.type === "School"
    ? [255, 178, 38, 255]
    : f.properties.type === "Hospital"
    ? [30, 98, 189, 255]
    : [0, 0, 0, 255];
