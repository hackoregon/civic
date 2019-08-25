import BrandColors from "./Brand/BrandColors";

const categorical = {
  pink: {
    rgb: "rgb(220,69,86)",
    rgba: "rgba(220,69,86,1)",
    mapFormatRGBA: [220, 69, 86, 255],
    hex: "#DC4556"
  },
  // Called "teal" in style story
  green: {
    rgb: "rgb(25,183,170)",
    rgba: "rgba(25,183,170,1)",
    mapFormatRGBA: [25, 183, 170, 255],
    hex: "#19B7AA"
  },
  blue: {
    rgb: "rgb(30,98,189)",
    rgba: "rgba(30,98,189,1)",
    mapFormatRGBA: [30, 98, 189, 255],
    hex: "#1E62BD"
  },
  purple: {
    rgb: "rgb(114,29,124)",
    rgba: "rgba(114,29,124,1)",
    mapFormatRGBA: [114, 29, 124, 255],
    hex: "#721D7C"
  },
  yellow: {
    rgb: "rgb(255,178,31)",
    rgba: "rgba(255,178,38,1)",
    mapFormatRGBA: [255, 178, 38, 255],
    hex: "#FFB226"
  }
};

const victoryColors = [
  categorical.pink.hex,
  categorical.green.hex,
  categorical.blue.hex,
  categorical.purple.hex,
  categorical.yellow.hex,
  BrandColors.tertiary.hex
];

const sequential = {
  thermal: [
    [255, 255, 204, 200],
    [255, 237, 160, 200],
    [254, 217, 118, 200],
    [254, 178, 76, 200],
    [253, 141, 60, 200],
    [252, 78, 42, 200],
    [227, 26, 28, 200],
    [189, 0, 38, 200],
    [128, 0, 38, 200]
  ],
  planet: [
    [247, 244, 249, 200],
    [231, 225, 239, 200],
    [212, 185, 218, 200],
    [201, 148, 199, 200],
    [223, 101, 176, 200],
    [231, 41, 138, 200],
    [206, 18, 86, 200],
    [152, 0, 67, 200],
    [103, 0, 31, 200]
  ],
  space: [
    [247, 252, 253, 200],
    [224, 236, 244, 200],
    [191, 211, 230, 200],
    [158, 188, 218, 200],
    [140, 150, 198, 200],
    [140, 107, 177, 200],
    [136, 65, 157, 200],
    [129, 15, 124, 200],
    [77, 0, 75, 200]
  ],
  earth: [
    [255, 247, 251, 200],
    [236, 226, 240, 200],
    [208, 209, 230, 200],
    [166, 189, 219, 200],
    [103, 169, 207, 200],
    [54, 144, 192, 200],
    [2, 129, 138, 200],
    [1, 108, 89, 200],
    [1, 70, 54, 200]
  ],
  ocean: [
    [255, 255, 217, 200],
    [237, 248, 177, 200],
    [199, 233, 180, 200],
    [127, 205, 187, 200],
    [65, 182, 196, 200],
    [29, 145, 192, 200],
    [34, 94, 168, 200],
    [37, 52, 148, 200],
    [8, 29, 88, 200]
  ]
};

export default {
  categorical,
  victoryColors,
  sequential
};
