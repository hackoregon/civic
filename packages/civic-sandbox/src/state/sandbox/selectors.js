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

const getSandboxProperty = key => createSelector(getSandbox, state => state[key]);

export const isSandboxLoading = getSandboxProperty('sandboxPending');
export const isFoundationLoading = getSandboxProperty('foundationPending');
export const areSlidesLoading = getSandboxProperty('slidesPending');
export const getSandboxError = getSandboxProperty('sandboxError');
export const getSandboxData = getSandboxProperty('sandbox');
export const getFoundations = getSandboxProperty('foundations');
export const getFoundationError = getSandboxProperty('foundationError');
export const getSelectedPackage = getSandboxProperty('selectedPackage');
export const getPackages = getSandboxProperty('packages');
export const getSlidesSuccess = getSandboxProperty('slidesSuccess');
export const isAnyError = getSandboxProperty('foundationError') || getSandboxProperty('slidesError');
export const getSelectedFoundation = getSandboxProperty('selectedFoundation');
export const getSelectedSlides = getSandboxProperty('selectedSlide');
export const isAllSandboxLoading = isFoundationLoading || areSlidesLoading;


export const getSelectedPackageData = createSelector(
  getSandboxData,
  getSelectedPackage,
  (data, selectedPackage) => data.packages && data.packages[selectedPackage]
);
export const getFoundationData = createSelector(
  getSandboxData,
  getSelectedFoundation,
  (sandbox, foundation) => sandbox.foundations[foundation]
);

export const getSlidesData = createSelector(
  getSandboxData,
  getSelectedSlides,
  (sandbox, slides) => isArray(slides) ? slides.map(slide => sandbox.slides[slide]) : [sandbox.slides[slides]]
);

export const getSelectedFoundationData = createSelector(
  getSandbox,
  sandbox => sandbox.foundationData
);

export const getSelectedSlidesData = createSelector(
  getSandbox,
  sandbox => sandbox.slidesData
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
