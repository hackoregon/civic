import apiAdapter from '../api-adapter';
import actionEmitter from '../api-adapter-action-emitter';

export const API_START = 'CLASS_SIZE_AND_QUALITY/START';
export const API_SUCCESS = 'CLASS_SIZE_AND_QUALITY/SUCCESS';
export const API_ERROR = 'CLASS_SIZE_AND_QUALITY/ERROR';

export const UPDATE_YEAR = 'CLASS_SIZE_AND_QUALITY/UPDATE_YEAR';

export const classAndSizeQualityStart = actionEmitter(API_START);
export const classAndSizeQualitySuccess = actionEmitter(API_SUCCESS);
export const classAndSizeQualityError = actionEmitter(API_ERROR);

const ENDPOINT = 'http://service.civicpdx.org/neighborhood-development/api/school_class_size?format=json&limit=1000';

export const fetchclassAndSizeQuality = apiAdapter(
  ENDPOINT,
  {
    start: classAndSizeQualityStart,
    success: classAndSizeQualitySuccess,
    error: classAndSizeQualityError,
  }
);

export const updateYear = (selectedYear) => {
  return {
    type: UPDATE_YEAR,
    selectedYear,
  };
};
