import {
  KitTickerTape,
  SelectionTickerTape,
  GeneralTickerTape
} from "./tickerTape";

export const ATTRACTOR = "ATTRACTOR";
export const KIT_INTRO = "KIT_INTRO";
export const KIT = "KIT";
export const KIT_OUTRO = "KIT_OUTRO";
export const QUAKE = "QUAKE";
export const TASKS_INTRO = "TASKS_INTRO";
export const TASKS = "TASKS";
export const SUMMARY = "SUMMARY";

const CHAPTERS = [
  { id: ATTRACTOR, title: "Attractor", tickerTape: null },
  {
    id: KIT_INTRO,
    title: "Kit Intro",
    duration: 5
  },
  {
    id: KIT,
    title: "Kit",
    tickerTape: KitTickerTape,
    duration: 25,
    showTitleBar: true
  },
  {
    id: KIT_OUTRO,
    title: "Kit Outro",
    duration: 1000
  },
  { id: QUAKE, title: "Quake", tickerTape: GeneralTickerTape, duration: 12 },
  {
    id: TASKS_INTRO,
    title: "Tasks Intro",
    duration: 10
  },
  {
    id: TASKS,
    title: "Tasks",
    tickerTape: SelectionTickerTape,
    voteDuration: 15,
    showTitleBar: true
  },
  { id: SUMMARY, title: "Summary", tickerTape: GeneralTickerTape, duration: 0 }
];

export default CHAPTERS;
