import { isArray, findIndex } from 'lodash';

import {
  SANDBOX_START,
  SANDBOX_SUCCESS,
  SANDBOX_FAILURE,
  FOUNDATION_START,
  FOUNDATION_SUCCESS,
  FOUNDATION_FAILURE,
  SET_PACKAGE,
  SLIDES_START,
  SLIDES_FAILURE,
  SLIDES_SUCCESS,
  SET_FOUNDATION,
  SET_FOUNDATION_DATUM,
  SET_SLIDES,
  SLIDE_START,
  SLIDE_FAILURE,
  SLIDE_SUCCESS,
} from './actions';


const INITIAL_STATE = {
  sandboxPending: false,
  sandboxError: null,
  foundationPending: false,
  foundationError: null,
  slidesPending: false,
  slidesError: null,
  selectedPackage: '',
  sandbox: {},
  foundationData: {},
  slidesData: [],
  slidesSuccess: null,
  selectedFoundation: '',
  selectedSlide: [],
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SANDBOX_START:
      return {
        ...state,
        sandboxPending: true,
        sandboxError: null,
        sandbox: {},
        selectedFoundationDatum: null,
      };
    case SANDBOX_SUCCESS:
      return {
        ...state,
        sandboxPending: false,
        sandboxError: null,
        sandbox: action.payload.body,
        selectedFoundationDatum: null,
      };
    case SANDBOX_FAILURE:
      return {
        ...state,
        sandboxPending: false,
        sandboxError: action.payload,
        sandbox: {},
        selectedFoundationDatum: null,
      };
    case FOUNDATION_START:
      return {
        ...state,
        foundationPending: true,
        foundationError: null,
        selectedFoundationDatum: null,
      };
    case FOUNDATION_SUCCESS:
      return {
        ...state,
        foundationPending: false,
        foundationError: null,
        foundationData: action.payload,
        selectedFoundationDatum: null,
      };
    case FOUNDATION_FAILURE:
      return {
        ...state,
        foundationPending: false,
        foundationError: action.payload,
        foundationData: null,
        selectedFoundationDatum: null,
      };
    case SLIDES_START:
      return {
        ...state,
        slidesPending: true,
        slidesError: null,
        selectedFoundationDatum: null,
      };
    case SLIDES_SUCCESS:
      return {
        ...state,
        slidesPending: false,
        slidesError: null,
        slidesSuccess: true,
        slidesData: action.payload,
        selectedFoundationDatum: null,
      };
    case SLIDES_FAILURE:
      return {
        ...state,
        slidesPending: false,
        slidesError: action.payload,
        slidesData: null,
        selectedFoundationDatum: null,
      };
    case SET_PACKAGE:
      return {
        ...state,
        selectedPackage: action.selectedPackage,
        foundationData: {},
        slidesData: [],
        selectedFoundation: state.sandbox.packages[action.selectedPackage].default_foundation,
        selectedSlide: isArray(state.sandbox.packages[action.selectedPackage].default_slide) ? state.sandbox.packages[action.selectedPackage].default_slide : [state.sandbox.packages[action.selectedPackage].default_slide],
        selectedFoundationDatum: null,
      };
    case SET_FOUNDATION:
      return {
        ...state,
        selectedFoundation: action.selectedFoundation,
        foundationData: {},
        selectedFoundationDatum: null,
      };
    case SET_SLIDES:
      return {
        ...state,
        selectedSlide: action.selectedSlides,
        slidesData: [],
        selectedFoundationDatum: null,
      };
    case SLIDE_START:
      return {
        ...state,
        slidesPending: true,
        slidesError: null,
        selectedFoundationDatum: null,
      };
    case SLIDE_SUCCESS:
      let foundationData = state.foundationData;
      let slidesData = state.slidesData;
      if (action.payload.type === 'foundation') {
        foundationData = action.payload.data;
      }
      if (action.payload.type === 'slide') {
        const slideIndex = findIndex(state.slidesData, o => o[action.payload.name]);
        slidesData = [...state.slidesData.slice(0, slideIndex),
          { [action.payload.name]: action.payload.data },
          ...state.slidesData.slice(slideIndex + 1)];
      }
      return {
        ...state,
        slidesPending: false,
        slidesError: null,
        slidesSuccess: true,
        selectedFoundationDatum: null,
        slidesData,
        foundationData,
      };
    case SLIDE_FAILURE:
      return {
        ...state,
        slidesPending: false,
        slidesError: action.payload,
        slidesData: null,
        selectedFoundationDatum: null,
      };
    case SET_FOUNDATION_DATUM:
      return {
        ...state,
        selectedFoundationDatum: action.feature,
      };
    default:
      return state;
  }
};

export default reducer;
