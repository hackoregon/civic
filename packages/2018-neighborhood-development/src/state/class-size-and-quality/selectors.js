import { createSelector } from "reselect";
import { rootState } from "../selectors";

const typeMap = {
  E: "Elementary School",
  M: "Middle School",
  H: "High School",
  C: "Charter School",
  O: "Other"
};

const getFormattedData = (data, selectedYear) =>
  data
    .filter(({ year }) => year === selectedYear)
    .map(item => ({
      classSize: item.class_size,
      teacherExperience: item.teacher_experience,
      type: typeMap[item.type],
      combinedLabel: `${item.name} • Experience`
    }));

const getClassSizeAndQualityDomain = createSelector(
  rootState,
  ({ classSizeAndQuality }) => classSizeAndQuality
);

const getClassSizeAndQualityData = createSelector(
  getClassSizeAndQualityDomain,
  ({ data }) => data
);

export const isDataPending = createSelector(
  getClassSizeAndQualityDomain,
  ({ pending }) => !!pending
);

export const getErrors = createSelector(
  getClassSizeAndQualityDomain,
  ({ error }) => error
);

export const getSelectedYear = createSelector(
  getClassSizeAndQualityDomain,
  ({ selectedYear }) => selectedYear
);

export const getDataForSelectedYear = createSelector(
  getClassSizeAndQualityData,
  getSelectedYear,
  (data, year) => getFormattedData(data, year)
);
