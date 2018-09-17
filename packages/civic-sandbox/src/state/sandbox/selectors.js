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
);

const makeVisFor = (spec, data) => {
  const type = spec.visualization.type;
  if (type === 'PercentDonut') {
    const val = data.object.properties[spec.field];
    return {
      visualizationType: 'PercentDonut',
      title: spec.name,
      data: [
        { x: spec.name, y: val },
        { x: spec.visualization.comparison_name, y: val < 1 ? (1 - val) : (100 - val) },
      ],
    };
  }
  if (type === 'Text') {
    return {
      visualizationType: 'Text',
      title: spec.name,
      data: data.object.properties[spec.field] !== null && data.object.properties[spec.field] !== undefined ? data.object.properties[spec.field] : 'Data Not Available',
    };
  }
  if (type === 'ComparisonBar') {
    const val = data.object.properties[spec.field];
    return {
      visualizationType: 'ComparisonBar',
      title: spec.name,
      data: [
        {
          name: '',
          value: val ? parseInt(data.object.properties[spec.field], 10) : 0,
          sortOrder: 2,
        },
        {
          name: spec.visualization.comparison_name,
          value: spec.visualization.comparison_value === '10000000' ? 50000 : parseInt(spec.visualization.comparison_value, 10),
          sortOrder: 1,
        },
      ],
      dataLabel: 'name',
      dataValue: 'value',
      sortOrder: 'sortOrder',
      minimalist: true,
    };
  }
  if (type === 'Legend') {
    const field = spec.field;
    const colorScale = data.layer.props.getFillColor;

    if (field === 'pgv_site_mean_mmi_txt') {
      return {
        visualizationType: 'Legend',
        title: 'Map Legend',
        min: 'Very strong (VII)',
        max: 'Severe (VIII)',
        colors: ['Very strong (VII)', 'Severe (VIII)']
          .map(d => colorScale({properties: {[field]: d}}))
          .map(d => `rgba(${d.slice(0,3).toString()},1.0)`),
      };
    }

    if (field === 'pgd_total_wet_mean_di') {
      return {
        visualizationType: 'Legend',
        title: 'Map Legend',
        min: 'Low',
        max: 'Very High',
        colors: ['Low', 'Moderate', 'High', 'Very High']
          .map(d => colorScale({properties: {[field]: d}}))
          .map(d => `rgba(${d.slice(0,3).toString()},1.0)`),
      };
    }

    if (field === 'pgd_landslide_dry_mean_di') {
      return {
        visualizationType: 'Legend',
        title: 'Map Legend',
        min: 'None',
        max: 'Low',
        colors: ['None', 'Low']
          .map(d => colorScale({properties: {[field]: d}}))
          .map(d => `rgba(${d.slice(0,3).toString()},1.0)`),
      };
    }

    const minMax = [...data.layer.props.data]
      .filter(d => d.properties[field] !== null && d.properties[field] !== undefined)
      .sort((a,b) => a.properties[field] - b.properties[field]);

    const uniqColors = [...minMax]
      .map(d => colorScale(d))
      .filter((d,i,arr) => arr.indexOf(d) === i);

    const stringColors = uniqColors
      .map(d => `rgba(${d.slice(0,3).toString()},1.0)`);

    return {
      visualizationType: 'Legend',
      title: 'Map Legend',
      min: minMax[0].properties[field],
      max: minMax[minMax.length-1].properties[field],
      colors: stringColors,
    };
  }

};

export const getSelectedFoundationDatum = createSelector(
  getSandbox,
  getSelectedFoundationData,
  ({ selectedFoundationDatum }, foundation) => {
    if (!foundation || !selectedFoundationDatum) return;

    const attrs = foundation.slide_meta.attributes;
    const visualizations = [];

    const selectedFoundationDatumProps = selectedFoundationDatum.object.properties;
    const priamryFieldMatch = selectedFoundationDatumProps.hasOwnProperty(attrs.primary.field);
    const secondaryFieldMatch = selectedFoundationDatumProps.hasOwnProperty(attrs.secondary.field);

    if(!priamryFieldMatch && !secondaryFieldMatch) return;

    if (attrs.primary && attrs.primary.field && attrs.primary.visualization) {
      visualizations.push(
        makeVisFor(attrs.primary, selectedFoundationDatum),
      );
    }
    if (attrs.secondary && attrs.secondary.field && attrs.primary.visualization) {
      visualizations.push(
        makeVisFor(attrs.secondary, selectedFoundationDatum),
      );
    }
    if (attrs.primary && attrs.primary.field) {
      const legendType = {
        field: attrs.primary.field,
        visualization: {
          type: 'Legend',
        },
      };

      visualizations.push(
        makeVisFor(legendType, selectedFoundationDatum),
      );
    }

    return visualizations;
  }
);

export const getSelectedSlideDatum = createSelector(
  getSandbox,
  getSelectedSlidesData,
  ({ selectedSlideDatum }, slide) => {
    if (!slide || !selectedSlideDatum || !selectedSlideDatum.object) return;

    const datumFieldNames = Object.keys(selectedSlideDatum.object.properties);
    if(datumFieldNames.length < 1) return;

    const slideAttributes = slide.map((slideObject, index) => {
      const slideName = Object.keys(slideObject);
      const attrs = slideObject[slideName[0]].slide_meta.attributes;
      const slideAttrObj = {};
      slideAttrObj['index'] = index;
      if (attrs.primary.field) { slideAttrObj['primary'] = attrs.primary; }
      if (attrs.secondary.field) { slideAttrObj['secondary'] =  attrs.secondary }
      return slideAttrObj;
    });

    const findSlideIndex = slideAttributes.filter(d => {
      const primary = d.primary;
      const secondary = d.secondary;
      if (primary && secondary) {
        return datumFieldNames.includes(d.primary.field && d.secondary.field);
      } else if (primary) {
        return datumFieldNames.includes(d.primary.field);
      } else {
        return false;
      }
    });

    if (findSlideIndex.length < 1) return;
    const slideIndex = findSlideIndex[0].index;

    const tooltipObj = {};
    tooltipObj['x'] = selectedSlideDatum.x;
    tooltipObj['y'] = selectedSlideDatum.y;
    tooltipObj['content'] = [];

    const tooltipSlideName = Object.keys(slide[slideIndex]);

    const tooltipSlideAttrs = slide[slideIndex][tooltipSlideName[0]].slide_meta.attributes;
    const tooltipPrimary = tooltipSlideAttrs.primary;
    const tooltipSecondary = tooltipSlideAttrs.secondary;

    const datumProps = selectedSlideDatum.object.properties;

    if (tooltipPrimary && tooltipPrimary.field) {
      tooltipObj.content.push({
        name: tooltipPrimary.name,
        value: datumProps[tooltipPrimary.field],
      });
    }
    if (tooltipSecondary && tooltipSecondary.field) {
      tooltipObj.content.push({
        name: tooltipSecondary.name,
        value: datumProps[tooltipSecondary.field],
      });
    }

    return tooltipObj;
  }
);
