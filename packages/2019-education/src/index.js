import App from "./components/App";
import Routes from "./routes";
import Reducers from "./state";
import IsThereEvidenceTheProgramWorked from "./components/IsThereEvidenceTheProgramWorked";

const CardRegistry = [
  {
    slug: "is-there-evidence-the-program-worked",
    component: IsThereEvidenceTheProgramWorked
  }
  // leave space for card injection
];

export { App, Routes, Reducers, CardRegistry };
