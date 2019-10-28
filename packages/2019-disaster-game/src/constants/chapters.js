import {
  KitTickerTape,
  SelectionTickerTape,
  GeneralTickerTape
} from "./tickerTape";

export const ATTRACTOR = "ATTRACTOR";
export const KIT = "KIT";
export const QUAKE = "QUAKE";
// export const PLAN = "PLAN";
// export const MEET = "MEET";
export const TASKS = "TASKS";
export const SUMMARY = "SUMMARY";

const CHAPTERS = [
  { id: ATTRACTOR, title: "Attractor", tickerTape: null },
  { id: KIT, title: "Kit", tickerTape: KitTickerTape, duration: 25 },
  { id: QUAKE, title: "Quake", tickerTape: GeneralTickerTape, duration: 15 },
  // { id: PLAN, title: "Plan", tickerTape: null },
  // { id: MEET, title: "Meet", tickerTape: null },
  {
    id: TASKS,
    title: "Tasks",
    tickerTape: SelectionTickerTape,
    voteDuration: 15
  },
  { id: SUMMARY, title: "Summary", tickerTape: GeneralTickerTape, duration: 0 }
];

export default CHAPTERS;
