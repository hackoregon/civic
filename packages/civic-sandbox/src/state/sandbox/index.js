import { isArray, findIndex } from "lodash";

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
  SET_SLIDE_DATUM,
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
  sandbox: {},
  foundationData: {},
  slidesData: [],
  slidesSuccess: null,
  selectedFoundation: "",
  selectedSlide: []
};

const reducer = (state = INITIAL_STATE, action) => {
  /* global console */
  console.log("STATE:", state);
  switch (action.type) {
    case SANDBOX_START:
      return {
        ...state,
        sandboxPending: true,
        sandboxError: null,
        sandbox: {},
        selectedFoundationDatum: null,
        selectedSlideDatum: null
      };
    case SANDBOX_SUCCESS:
      console.log("a-SANDBOX_SUCCESS:", action);
      return {
        ...state,
        sandboxPending: false,
        sandboxError: null,
        sandbox: {
          packages: action.payload
        },
        selectedFoundationDatum: null,
        selectedSlideDatum: null
      };
    case SANDBOX_FAILURE:
      return {
        ...state,
        sandboxPending: false,
        sandboxError: action.payload,
        sandbox: {},
        selectedFoundationDatum: null,
        selectedSlideDatum: null
      };
    case FOUNDATION_START:
      return {
        ...state,
        foundationPending: true,
        foundationError: null,
        selectedFoundationDatum: null,
        selectedSlideDatum: null
      };
    case FOUNDATION_SUCCESS:
      return {
        ...state,
        foundationPending: false,
        foundationError: null,
        foundationData: action.payload,
        selectedFoundationDatum: null,
        selectedSlideDatum: null
      };
    case FOUNDATION_FAILURE:
      return {
        ...state,
        foundationPending: false,
        foundationError: action.payload,
        foundationData: null,
        selectedFoundationDatum: null,
        selectedSlideDatum: null
      };
    case SLIDES_START:
      return {
        ...state,
        slidesPending: true,
        slidesError: null
      };
    case SLIDES_SUCCESS: {
      console.log("a-SLIDES_SUCCESS");
      console.log("a-payload:", action.payload);
      console.log("a-state.slidesData:", state.slidesData);
      // let { slidesData } = state;
      // if (state.slidesData.findIndex(d => d.displayName === action.payload[0].displayName)) {
      //   const slideIndex = state.slidesData.findIndex(d => d.displayName === action.payload[0].displayName);

      //   slidesData = [
      //     ...state.slidesData.slice(0, slideIndex),
      //     ...action.payload,
      //     ...state.slidesData.slice(slideIndex + 1)
      //   ];
      // }

      // const payloadSlideIndex = state.slidesData.findIndex(d => {
      //   return d.displayName === action.payload[0].displayName;
      // });
      // console.log("a-payloadSlideIndex:", payloadSlideIndex);

      // const newSlidesData = payloadSlideIndex > -1
      //   ? state.slidesData.map((d,i) => {
      //       return i === payloadSlideIndex ? action.payload[0] : d;
      //     })
      //   : [...state.slidesData, ...action.payload];
      // console.log("a-newSlidesData:", newSlidesData);

      return {
        ...state,
        slidesPending: false,
        slidesError: null,
        slidesSuccess: true,
        slidesData: state.slidesData.length
          ? [
              ...state.slidesData.map(d => {
                return d.displayName === action.payload[0].displayName
                  ? action.payload[0]
                  : d;
              })
            ]
          : [...state.slidesData, ...action.payload]
        // slidesData
      };
    }
    case SLIDES_FAILURE: {
      console.log("a-SLIDES_FAILURE");
      console.log("a-payload:", action.payload);
      return {
        ...state,
        slidesPending: false,
        slidesError: action.payload,
        slidesData: [],
        selectedFoundationDatum: null,
        selectedSlideDatum: null
      };
    }
    case SET_PACKAGE:
      console.log("a-SET_PACKAGE:", action);
      return {
        ...state,
        selectedPackage: action.selectedPackage.displayName,
        foundationData: {},
        slidesData: [],
        // selectedFoundation:
        //   state.sandbox.packages[action.selectedPackage].default_foundation,
        selectedSlide: state.sandbox.packages
          .filter(d => d.displayName === action.selectedPackage.displayName)
          .reduce((a, c) => [...a, ...c.layers.map(d => d.name)], [])
          .slice(0, 1),
        sandbox: {
          ...state.sandbox,
          foundations: []
        },
        selectedFoundationDatum: null,
        selectedSlideDatum: null
      };
    case SET_FOUNDATION:
      return {
        ...state,
        selectedFoundation: action.selectedFoundation,
        foundationData: {},
        selectedFoundationDatum: null,
        selectedSlideDatum: null
      };
    case SET_SLIDES:
      console.log("a-SET_SLIDESSSSS:", action);
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
        selectedSlideDatum: null
      };
    case SET_FOUNDATION_DATUM:
      return {
        ...state,
        selectedFoundationDatum: action.feature
      };
    case SET_SLIDE_DATUM:
      return {
        ...state,
        selectedSlideDatum: action.feature
      };
    default:
      return state;
  }
};

export default reducer;
