import { findIndex } from "lodash";

import {
  SANDBOX_START,
  SANDBOX_SUCCESS,
  SANDBOX_FAILURE,
  FOUNDATION_START,
  FOUNDATION_SUCCESS,
  FOUNDATION_FAILURE,
  SET_PACKAGE,
  SET_SLIDE_KEY,
  SLIDES_START,
  SLIDES_FAILURE,
  SLIDES_SUCCESS,
  SET_FOUNDATION,
  SET_FOUNDATION_DATUM,
  SET_SLIDE_DATUM,
  SET_BASE_MAP_DATUM,
  SET_SLIDES,
  SLIDE_START,
  SLIDE_FAILURE,
  SLIDE_SUCCESS
} from "./actions";

const INITIAL_STATE = {
  sandboxPending: false,
  sandboxError: null,
  foundationPending: false,
  foundationError: null,
  slidesPending: false,
  slidesError: null,
  selectedPackage: "",
  selectedPackageDescription: "",
  sandbox: {},
  foundationData: {},
  slidesData: [],
  slidesSuccess: null,
  selectedFoundation: "",
  selectedFoundationDescription: "",
  selectedSlide: [],
  selectedSlideKey: {},
  selectedFoundationDatum: null,
  selectedSlideDatum: null,
  selectedBaseMapDatum: null
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
        selectedSlideDatum: null,
        selectedBaseMapDatum: null
      };
    case SANDBOX_SUCCESS:
      return {
        ...state,
        sandboxPending: false,
        sandboxError: null,
        sandbox: {
          packages: action.payload
        },
        selectedFoundationDatum: null,
        selectedSlideDatum: null,
        selectedBaseMapDatum: null
      };
    case SANDBOX_FAILURE:
      return {
        ...state,
        sandboxPending: false,
        sandboxError: action.payload,
        sandbox: {},
        selectedFoundationDatum: null,
        selectedSlideDatum: null,
        selectedBaseMapDatum: null
      };
    case FOUNDATION_START:
      return {
        ...state,
        foundationPending: true,
        foundationError: null,
        selectedFoundationDatum: null,
        selectedSlideDatum: null,
        selectedBaseMapDatum: null
      };
    case FOUNDATION_SUCCESS:
      return {
        ...state,
        foundationPending: false,
        foundationError: null,
        foundationData: action.payload,
        selectedFoundationDatum: null,
        selectedSlideDatum: null,
        selectedBaseMapDatum: null
      };
    case FOUNDATION_FAILURE:
      return {
        ...state,
        foundationPending: false,
        foundationError: action.payload,
        foundationData: null,
        selectedFoundationDatum: null,
        selectedSlideDatum: null,
        selectedBaseMapDatum: null
      };
    case SLIDES_START:
      return {
        ...state,
        slidesPending: true,
        slidesError: null
      };
    case SLIDES_SUCCESS: {
      return {
        ...state,
        slidesPending: false,
        slidesError: null,
        slidesSuccess: true,
        slidesData: [...action.payload]
      };
    }
    case SLIDES_FAILURE: {
      return {
        ...state,
        slidesPending: false,
        slidesError: action.payload,
        slidesData: [],
        selectedFoundationDatum: null,
        selectedSlideDatum: null,
        selectedBaseMapDatum: null
      };
    }
    case SET_PACKAGE: {
      const [findDefaultLayers] = state.sandbox.packages.filter(
        d => d.displayName === action.selectedPackage.displayName
      );

      if (state.selectedPackage === action.selectedPackage.displayName) {
        return state;
      }

      return {
        ...state,
        selectedPackage: action.selectedPackage.displayName,
        selectedPackageDescription: action.selectedPackage.description
          ? action.selectedPackage.description
          : "A brief description of the selected data collection",
        foundationData: {},
        slidesData: [],
        selectedSlide: findDefaultLayers.defaultLayers
          ? findDefaultLayers.defaultLayers
          : [],
        sandbox: {
          ...state.sandbox,
          foundations: []
        },
        selectedFoundationDatum: null,
        selectedSlideDatum: null,
        selectedBaseMapDatum: null,
        selectedSlideKey: {}
      };
    }
    case SET_SLIDE_KEY:
      return {
        ...state,
        selectedSlideKey: {
          ...state.selectedSlideKey,
          ...action.selectedSlideKey
        }
      };
    case SET_FOUNDATION:
      return {
        ...state,
        selectedFoundation: action.selectedFoundation,
        foundationData: {},
        selectedFoundationDatum: null,
        selectedSlideDatum: null,
        selectedBaseMapDatum: null
      };
    case SET_SLIDES:
      return {
        ...state,
        selectedSlide: action.selectedSlides
      };
    case SLIDE_START:
      return {
        ...state,
        slidesPending: true,
        slidesError: null
      };
    case SLIDE_SUCCESS: {
      let { foundationData, slidesData } = state;
      if (action.payload.type === "foundation") {
        foundationData = action.payload.data;
      }
      if (action.payload.type === "slide") {
        const slideIndex = findIndex(
          state.slidesData,
          o => o[action.payload.name]
        );
        slidesData = [
          ...state.slidesData.slice(0, slideIndex),
          { [action.payload.name]: action.payload.data },
          ...state.slidesData.slice(slideIndex + 1)
        ];
      }
      return {
        ...state,
        slidesPending: false,
        slidesError: null,
        slidesSuccess: true,
        selectedSlideDatum: null,
        selectedBaseMapDatum: null,
        slidesData,
        foundationData
      };
    }
    case SLIDE_FAILURE:
      return {
        ...state,
        slidesPending: false,
        slidesError: action.payload,
        slidesData: null,
        selectedFoundationDatum: null,
        selectedSlideDatum: null,
        selectedBaseMapDatum: null
      };
    case SET_FOUNDATION_DATUM: {
      return {
        ...state,
        selectedFoundationDatum: {
          feature: action.feature,
          index: action.index
        }
      };
    }
    case SET_SLIDE_DATUM: {
      return {
        ...state,
        selectedSlideDatum: { feature: action.feature, index: action.index }
      };
    }
    case SET_BASE_MAP_DATUM: {
      return {
        ...state,
        selectedBaseMapDatum: { feature: action.feature, index: action.index }
      };
    }
    default:
      return state;
  }
};

export default reducer;
