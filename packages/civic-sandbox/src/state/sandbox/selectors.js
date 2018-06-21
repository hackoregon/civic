import { createSelector } from 'reselect';
import { isArray } from 'lodash';
import { rootState } from '../selectors';

import { slides, foundations } from '../layerStyles';
import { select } from 'glamor';

export const getState = createSelector(
  rootState,
  state => state
);

export const getSandbox = createSelector(
  rootState,
  ({ sandbox = {} }) => sandbox
);

const getProperty = key => createSelector(getState, state => state[key]);

const getSandboxProperty = key => createSelector(getSandbox, sandbox => sandbox[key]);

export const isSandboxLoading = getProperty('sandboxPending');
export const isFoundationLoading = getProperty('foundationPending');
export const areSlidesLoading = getProperty('slidesPending');
export const getSandboxError = getProperty('sandboxError');
export const getSandboxData = getProperty('sandbox');
export const getFoundations = getProperty('foundations');
export const getFoundationError = getProperty('foundationError');
export const getSelectedPackage = getProperty('selectedPackage');
export const getPackages = getSandboxProperty('packages');
export const getSlidesSuccess = getProperty('slidesSuccess');
export const isAnyError = getProperty('foundationError') || getProperty('slidesError');
export const getSelectedFoundation = getProperty('selectedFoundation');
export const getSelectedSlides = getProperty('selectedSlide');
export const isAllSandboxLoading = isFoundationLoading || areSlidesLoading;


export const getSelectedPackageData = createSelector(
  getState,
  state => state.sandbox.packages && state.sandbox.packages[state.selectedPackage]
);
export const getFoundationData = createSelector(
  getSandbox,
  getSelectedFoundation,
  (sandbox, foundation) => sandbox.foundations[foundation]
);

export const getSlidesData = createSelector(
  getSandbox,
  getSelectedSlides,
  (sandbox, slides) => isArray(slides) ? slides.map(slide => sandbox.slides[slide]) : [sandbox.slides[slides]]
);

export const getSelectedFoundationData = createSelector(
  getState,
  state => state.foundationData
);

export const getSelectedSlidesData = createSelector(
  getState,
  state => state.slidesData
);


export const getLayerSlides = createSelector(
  getSlidesData,
  getSelectedSlidesData,
  (defaultSlides, selectedSlides) => {
    if (defaultSlides && defaultSlides.length && selectedSlides && selectedSlides.length) {
      const formatSlideData = selectedSlides && selectedSlides.length && defaultSlides.map((slide) => {
        const data = selectedSlides && selectedSlides.find((slideData) => {
          return slideData[slide.name];
        })[slide.name];
        const slideObj = data ? slides(data)[slide.name] : null;
        return [{
          data: slideObj ? slideObj.boundary : {},
        }, {
          data: slideObj ? slideObj.map : {},
        }];
      }).reduce((a, b) => a.concat(b), []);
      return formatSlideData;
    }
    return [{ data: {} }];
  });

export const getLayerFoundation = createSelector(
  getFoundationData,
  getSelectedFoundationData,
  (defaultFn, selectedFn = {}) => {
    const selectedFoundation = selectedFn || {};
    const foundationLayerData = {
      data: selectedFoundation.slide_data ? foundations(selectedFn)[defaultFn.name] : {},
    };
    return foundationLayerData;
  }
)
;
