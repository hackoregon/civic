import fetchAdapter, {
  fetchLayersAdapter,
  fetchByDateAdapter
} from "../fetch-adapter";
import actionEmitter from "../common-action-emitter";

// Types
export const SANDBOX_START = "SANDBOX/SANDBOX_START";
export const SANDBOX_SUCCESS = "SANDBOX/SANDBOX_SUCCESS";
export const SANDBOX_FAILURE = "SANDBOX/SANDBOX_FAILURE";
export const FOUNDATION_START = "SANDBOX/FOUNDATION_START";
export const FOUNDATION_SUCCESS = "SANDBOX/FOUNDATION_SUCCESS";
export const FOUNDATION_FAILURE = "SANDBOX/FOUNDATION_FAILURE";
export const SET_PACKAGE = "SANDBOX/SET_PACKAGE";
export const SET_SLIDE_KEY = "SANDBOX/SET_SLIDE_KEY";
export const SET_FOUNDATION = "SANDBOX/SET_FOUNDATION";
export const SLIDES_START = "SANDBOX/SLIDES_START";
export const SLIDES_SUCCESS = "SANDBOX/SLIDES_SUCCESS";
export const SLIDES_FAILURE = "SANDBOX/SLIDES_FAILURE";
export const SLIDE_START = "SANDBOX/SLIDE_START";
export const SLIDE_SUCCESS = "SANDBOX/SLIDE_SUCCESS";
export const SLIDE_FAILURE = "SANDBOX/SLIDE_FAILURE";
export const SET_SLIDES = "SANDBOX/SET_SLIDES";
export const SET_FOUNDATION_DATUM = "SANDBOX/SET_FOUNDATION_DATUM";
export const SET_SLIDE_DATUM = "SANDBOX/SET_SLIDE_DATUM";

// Simple actions
export const SandboxStart = actionEmitter(SANDBOX_START);
export const SandboxSuccess = actionEmitter(SANDBOX_SUCCESS);
export const SandboxFailure = actionEmitter(SANDBOX_FAILURE);

export const FoundationStart = actionEmitter(FOUNDATION_START);
export const FoundationSuccess = actionEmitter(FOUNDATION_SUCCESS);
export const FoundationFailure = actionEmitter(FOUNDATION_FAILURE);

export const SlidesStart = actionEmitter(SLIDES_START);
export const SlidesSuccess = actionEmitter(SLIDES_SUCCESS);
export const SlidesFailure = actionEmitter(SLIDES_FAILURE);

export const SlideStart = actionEmitter(SLIDE_START);
export const SlideSuccess = actionEmitter(SLIDE_SUCCESS);
export const SlideFailure = actionEmitter(SLIDE_FAILURE);

// Thunk actions
export const fetchSandbox = fetchAdapter(
  "https://gist.githubusercontent.com/mendozaline/5f9b9157d031cb5fd505bcce098f3fc2/raw/329b1d633d990f2625b83c78657ebc26d10af1dc/packages.json",
  {
    start: SandboxStart,
    success: SandboxSuccess,
    failure: SandboxFailure
  }
);

export const fetchFoundation = endpoint =>
  fetchAdapter(endpoint, {
    start: FoundationStart,
    success: FoundationSuccess,
    failure: FoundationFailure
  });

export const fetchLayers = layers => {
  // console.log("actions-fetchLayers-layers:", layers);
  return fetchLayersAdapter(layers, {
    start: SlidesStart,
    success: SlidesSuccess,
    failure: SlidesFailure
  });
};

export const setPackage = (selectedPackage = "") => ({
  type: SET_PACKAGE,
  selectedPackage
});

export const setSlideKey = (selectedSlideKey = {}) => ({
  type: SET_SLIDE_KEY,
  selectedSlideKey
});

export const setFoundation = (selectedFoundation = "") => ({
  type: SET_FOUNDATION,
  selectedFoundation
});

export const setSlides = (selectedSlides = []) => ({
  type: SET_SLIDES,
  selectedSlides
});

export const fetchSlideByDate = (slide, date, type) =>
  fetchByDateAdapter(slide, date, type, {
    start: SlideStart,
    success: SlideSuccess,
    failure: SlideFailure
  });

export const setSelectedFoundationDatum = (feature = {}) => ({
  type: SET_FOUNDATION_DATUM,
  feature
});

export const setSelectedSlideDatum = (feature = {}, index) => {
  // console.log("actions-setSelectedSlideDatum-f:", feature);
  // console.log("actions-setSelectedSlideDatum-i:", index);
  return {
    type: SET_SLIDE_DATUM,
    feature,
    index
  };
};
