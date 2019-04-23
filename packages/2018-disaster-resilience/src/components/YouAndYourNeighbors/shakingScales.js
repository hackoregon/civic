//modified from https://stackoverflow.com/questions/8584902/get-closest-number-out-of-array
function findIndexInScale(arr, target) {
  if (!arr || arr.length === 0) return null;
  if (arr.length === 1) return 0;

  for (var i = 1; i < arr.length; i++) {
    // As soon as a number bigger than or equal to target is found, return the current
    if (arr[i] >= target) {
      return i;
    }
  }
  // No number in array is bigger so return the last.
  return arr.length - 1;
}

const scale = [0, 10, 30, 100, 1180];

export const transformForLandslidesAndLiquefaction = value =>
  findIndexInScale(scale, value);

export const shakingScale = {
  1: {
    name: "Not felt",
    description:
      "Not felt except by a very few under especially favorable conditions."
  },
  2: {
    name: "Weak",
    description:
      "Felt only by a few persons at rest,especially on upper floors of buildings."
  },
  3: {
    name: "Weak",
    description:
      "Felt quite noticeably by persons indoors, especially on upper floors of buildings. Many people do not recognize it as an earthquake. Standing motor cars may rock slightly. Vibrations similar to the passing of a truck. Duration estimated."
  },
  4: {
    name: "Light",
    description:
      "Felt indoors by many, outdoors by few during the day. At night, some awakened. Dishes, windows, doors disturbed; walls make cracking sound. Sensation like heavy truck striking building. Standing motor cars rocked noticeably."
  },
  5: {
    name: "Moderate",
    description:
      "Felt by nearly everyone; many awakened. Some dishes, windows broken. Unstable objects overturned. Pendulum clocks may stop."
  },
  6: {
    name: "Strong",
    description:
      "Felt by all, many frightened. Some heavy furniture moved; a few instances of fallen plaster. Damage slight."
  },
  7: {
    name: "Very strong",
    description:
      "Damage negligible in buildings of good design and export construction; slight to moderate in well-built ordinary structures; considerable damage in poorly built or badly designed structures; some chimneys broken."
  },
  8: {
    name: "Severe",
    description:
      "Damage slight in specially designed structures; considerable damage in ordinary substantial buildings with partial collapse. Damage great in poorly built structures. Fall of chimneys, factory stacks, columns, monuments, walls. Heavy furniture overturned."
  },
  9: {
    name: "Violent",
    description:
      "Damage considerable in specially designed structures; well-designed frame structures thrown out of plumb. Damage great in substantial buildings, with partial collapse. Buildings shifted off foundations."
  },
  10: {
    name: "Extreme",
    description:
      "Some well-built wooden structures destroyed; most masonry and frame structures destroyed with foundations. Rails bent."
  }
};

export const landslidesScale = {
  0: {
    name: "None",
    description: "No potential permanent ground deformation due to landslides"
  },
  1: {
    name: "Low",
    description:
      "Low potential permanent ground deformation due to landslides (0 - 4 inches)"
  },
  2: {
    name: "Moderate",
    description:
      "Moderate potential permanent ground deformation due to landslides (4 - 12 inches)"
  },
  3: {
    name: "High",
    description:
      "High potential permanent ground deformation due to landslides (12 - 39 inches)"
  },
  4: {
    name: "Very High",
    description:
      "Very high potential permanent ground deformation due to landslides (39 - 173 inches)"
  }
};

export const liquefactionScale = {
  0: {
    name: "None",
    description: "No potential permanent ground deformation due to liquefaction"
  },
  1: {
    name: "Low",
    description:
      "Low potential permanent ground deformation due to liquefaction (0 - 4 inches)"
  },
  2: {
    name: "Moderate",
    description:
      "Moderate potential permanent ground deformation due to liquefaction (4 - 12 inches)"
  },
  3: {
    name: "High",
    description:
      "High potential permanent ground deformation due to liquefaction (12 - 39 inches)"
  },
  4: {
    name: "Very High",
    description:
      "Very high potential permanent ground deformation due to liquefaction (39 - 173 inches)"
  }
};
