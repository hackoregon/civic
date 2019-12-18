import preparerBadge from "../../assets/badges/preparer.svg";
import taskSurvivorBadge from "../../assets/badges/task-survivor.svg";
import taskNeighborhoodHeroBadge from "../../assets/badges/task-neighborhood-hero.svg";
import taskCitySuperheroBadge from "../../assets/badges/task-city-superhero.svg";
import earthquakeHeroBadge from "../../assets/badges/earthquake-hero.svg";

export default {
  preparerBadge: {
    title: "Preparer",
    id: "preparerBadge",
    badgeSVG: preparerBadge,
    shown: false,
    activeTaskIndexWhenEarned: null
  },
  taskSurvivorBadge: {
    title: "Survivor",
    id: "taskSurvivorBadge",
    badgeSVG: taskSurvivorBadge,
    shown: false,
    activeTaskIndexWhenEarned: null
  },
  taskNeighborhoodHeroBadge: {
    title: "Neighborhood Hero",
    id: "taskNeighborhoodHeroBadge",
    badgeSVG: taskNeighborhoodHeroBadge,
    shown: false,
    activeTaskIndexWhenEarned: null
  },
  taskCitySuperheroBadge: {
    title: "City Superhero",
    id: "taskCitySuperheroBadge",
    badgeSVG: taskCitySuperheroBadge,
    shown: false,
    activeTaskIndexWhenEarned: null
  },
  earthquakeHeroBadge: {
    title: "Earthquake Hero",
    id: "earthquakeHeroBadge",
    badgeSVG: earthquakeHeroBadge,
    shown: false,
    activeTaskIndexWhenEarned: null
  }
};
