import { createSelector } from 'reselect';
import { rootState } from '../selectors';
import { slides, foundations } from '../layerStyles';
import { select } from 'glamor';

export const getState = createSelector(
  rootState,
  state => state
);

export const getSandbox = createSelector(
  rootState,
  ({ sandbox }) => sandbox
);

const getProperty = key => createSelector(getState, state => state[key]);

const getSandboxProperty = key => createSelector(getSandbox, state => state[key]);

export const isSandboxLoading = getProperty('sandboxPending');
export const isFoundationLoading = getProperty('foundationPending');
export const areSlidesLoading = getProperty('slidesPending');
export const getSandboxError = getProperty('sandboxError');
export const getSandboxData = getProperty('sandbox');
export const getFoundations = getProperty('foundations');
export const getFoundationError = getProperty('foundationError');
export const getSelectedPackage = getProperty('selectedPackage');
export const getPackages = getSandboxProperty('packages');
export const isAnyError = getProperty('foundationError') || getProperty('slidesError');
export const isAllSandboxLoading = isFoundationLoading || areSlidesLoading;


export const getSelectedPackageData = createSelector(
  getState,
  state => state.sandbox.packages && state.sandbox.packages[state.selectedPackage]
);
export const getDefaultFoundationData = createSelector(
  getSandbox,
  getSelectedPackageData,
  (sandbox, data) => sandbox.foundations[data.default_foundation]
);

export const getDefaultSlidesData = createSelector(
  getSandbox,
  getSelectedPackageData,
  (sandbox, data) => data.default_slide.map(slide => sandbox.slides[slide])
);

export const getSelectedFoundationData = createSelector(
  getState,
  state => state.foundationData
);

export const getSelectedSlidesData = createSelector(
  getState,
  state => state.slidesData
);

export const getLayerData = createSelector(
  [getDefaultFoundationData,
    getDefaultSlidesData,
    getSelectedFoundationData,
    getSelectedSlidesData],
  (defaultFn, defaultSlides, selectedFn, selectedSlides) => {
    // const formatSlideData = defaultSlides.map((slide) => {
    //   const data = selectedSlides.find((slideData) => {
    //     return slideData[slide.name];
    //   });
    //   const slideObj = data ? slides(data)[slide.name] : null;
    //   return [{
    //     data: slideObj ? slideObj.boundary : {},
    //   }, {
    //     data: slideObj ? slideObj.map : {},
    //   }];
    // }).reduce((a, b) => a.concat(b), []);
    // return [{
    //   data: selectedFn.slide_data ? foundations(selectedFn)[defaultFn.name] : {},
    // },
    //   ...formatSlideData,
    // ];
    console.log(defaultFn, defaultSlides, selectedFn, selectedSlides);
    return [];
  }
)
;
