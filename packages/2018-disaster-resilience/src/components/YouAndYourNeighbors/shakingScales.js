export const shakingScale = {
  1: {
    shaking: 'Not felt',
    description: 'Not felt except by a very few under especially favorable conditions.',
  },
  2: {
    shaking: 'Weak',
    description: 'Felt only by a few persons at rest,especially on upper floors of buildings.',
  },
  3: {
    shaking: 'Weak',
    description: 'Felt quite noticeably by persons indoors, especially on upper floors of buildings. Many people do not recognize it as an earthquake. Standing motor cars may rock slightly. Vibrations similar to the passing of a truck. Duration estimated.',
  },
  4: {
    shaking: 'Light',
    description: 'Felt indoors by many, outdoors by few during the day. At night, some awakened. Dishes, windows, doors disturbed; walls make cracking sound. Sensation like heavy truck striking building. Standing motor cars rocked noticeably.',
  },
  5: {
    shaking: 'Moderate',
    description: 'Felt by nearly everyone; many awakened. Some dishes, windows broken. Unstable objects overturned. Pendulum clocks may stop.',
  },
  6: {
    shaking: 'Strong',
    description: 'Felt by all, many frightened. Some heavy furniture moved; a few instances of fallen plaster. Damage slight.',
  },
  7: {
    shaking: 'Very strong',
    description: 'Damage negligible in buildings of good design and export construction; slight to moderate in well-built ordinary structures; considerable damage in poorly built or badly designed structures; some chimneys broken.',
  },
  8: {
    shaking: 'Severe',
    description: 'Damage slight in specially designed structures; considerable damage in ordinary substantial buildings with partial collapse. Damage great in poorly built structures. Fall of chimneys, factory stacks, columns, monuments, walls. Heavy furniture overturned.',
  },
  9: {
    shaking: 'Violent',
    description: 'Damage considerable in specially designed structures; well-designed frame structures thrown out of plumb. Damage great in substantial buildings, with partial collapse. Buildings shifted off foundations.',
  },
  10: {
    shaking: 'Extreme',
    description: 'Some well-built wooden structures destroyed; most masonry and frame structures destroyed with foundations. Rails bent.',
  },
};

export const landslidesScale = {
  None: {
    scale: 0,
    description: 'No potential permanent ground deformation due to landslides',
  },
  Low: {
    scale: 1,
    description: 'Low potential permanent ground deformation due to landslides (0 - 4 inches)',
  },
  Moderate: {
    scale: 2,
    description: 'Moderate potential permanent ground deformation due to landslides (4 - 12 inches)',
  },
  High: {
    scale: 3,
    description: 'High potential permanent ground deformation due to landslides (12 - 39 inches)',
  },
  'Very High': {
    scale: 4,
    description: 'Very high potential permanent ground deformation due to landslides (39 - 173 inches)',
  },
};

export const liquefactionScale = {
  None: {
    scale: 0,
    description: 'No potential permanent ground deformation due to liquefaction',
  },
  Low: {
    scale: 1,
    description: 'Low potential permanent ground deformation due to liquefaction (0 - 4 inches)',
  },
  Moderate: {
    scale: 2,
    description: 'Moderate potential permanent ground deformation due to liquefaction (4 - 12 inches)',
  },
  High: {
    scale: 3,
    description: 'High potential permanent ground deformation due to liquefaction (12 - 39 inches)',
  },
  'Very High': {
    scale: 4,
    description: 'Very high potential permanent ground deformation due to liquefaction (39 - 173 inches)',
  },
};
