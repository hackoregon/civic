import { ungroupBy } from "@hackoregon/component-library";

import { createSelector } from "reselect";
import { rootState } from "../selectors";

export const getHumanImpactOfSweepingUrbanCampsitesRequest = createSelector(
  rootState,
  ({ humanImpactOfSweepingUrbanCampsites }) =>
    humanImpactOfSweepingUrbanCampsites
);

function toDate(dateStr) {
  const [year, month, day] = dateStr.split("-");
  return new Date(year, month - 1, day);
}

const categories = ["report_count", "unique_sites_estimate", "sweep_count"];
const categorylabels = ["Reports", "Campsites (estimated)", "Sweeps"];

const formatData = arr =>
  arr.map(obj => ({
    date: toDate(obj.date),
    report_count: obj.report_count,
    sweep_count: obj.sweep_count,
    unique_sites_estimate: obj.unique_sites_estimate
  }));

const filterNull = arr => arr.filter(obj => !!obj.value);

export const getHumanImpactOfSweepingUrbanCampsitesData = createSelector(
  getHumanImpactOfSweepingUrbanCampsitesRequest,
  ({ data }) =>
    data &&
    filterNull(ungroupBy(formatData(data.results), categories, categorylabels))
);

export const isHumanImpactOfSweepingUrbanCampsitesPending = createSelector(
  getHumanImpactOfSweepingUrbanCampsitesRequest,
  ({ pending }) => !!pending
);

export const catchHumanImpactOfSweepingUrbanCampsitesErrors = createSelector(
  getHumanImpactOfSweepingUrbanCampsitesRequest,
  ({ error }) => error || error
);
