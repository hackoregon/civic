import { createSelector } from "reselect";
import { isArray } from "lodash";
import { rootState } from "../selectors";

import { slides, foundations } from "../layerStyles";
/* global console */
export const getState = createSelector(
  rootState,
  state => state
);

export const getSandbox = createSelector(
  rootState,
  ({ sandbox = {} }) => sandbox
);

const getProperty = key =>
  createSelector(
    getState,
    state => state[key]
  );

const getSandboxProperty = key =>
  createSelector(
    getSandbox,
    state => state[key]
  );

export const isSandboxLoading = getSandboxProperty("sandboxPending");
export const isFoundationLoading = getSandboxProperty("foundationPending");
export const areSlidesLoading = getSandboxProperty("slidesPending");
export const getSandboxError = getSandboxProperty("sandboxError");
export const getSandboxData = getSandboxProperty("sandbox");
export const getFoundations = getSandboxProperty("foundations");
export const getFoundationError = getSandboxProperty("foundationError");
export const getSelectedPackage = getSandboxProperty("selectedPackage");
export const getSelectedSlideKey = getSandboxProperty("selectedSlideKey");
export const getPackages = getSandboxProperty("packages");
export const getSlidesSuccess = getSandboxProperty("slidesSuccess");
export const isAnyError = getSandboxProperty("slidesError");
export const getSelectedFoundation = getSandboxProperty("selectedFoundation");
export const getSelectedSlides = getSandboxProperty("selectedSlide");
// export const isAllSandboxLoading = isFoundationLoading || areSlidesLoading;
export const isAllSandboxLoading = areSlidesLoading; // getSlidesSuccess;

export const getSelectedPackageData = createSelector(
  getSandboxData,
  getSelectedPackage,
  (data, selectedPackage) => data.packages && data.packages[selectedPackage]
);
// export const getFoundationData = createSelector(
//   getSandboxData,
//   getSelectedFoundation,
//   (sandbox, foundation) => sandbox.foundations[foundation]
// );

export const getSlidesData = createSelector(
  getSandboxData,
  getSelectedSlides,
  getSelectedPackage,
  (sandbox, selectedSlides, selectedPackage) => {
    // isArray(slides)
    // ? slides.map(slide => sandbox.slides[slide])
    // : [sandbox.slides[slides]]
    console.log("\nselectors");
    console.log("selector-getSlidesData-selectedPackage:", selectedPackage);
    console.log("selector-getSlidesData-selectedSlides:", selectedSlides);

    const [packageMatch] = sandbox.packages.filter(d => {
      return d.displayName === selectedPackage;
    });
    console.log("selector-getSlidesData-packageMatch:", packageMatch);

    const selectedSlidesData = packageMatch.layers.map(d => {
      // console.log(d);
      // console.log(selectedSlides.includes(d.name));
      return selectedSlides.includes(d.name)
        ? { slide: d, defaultSlide: true }
        : { slide: d, defaultSlide: false };
    });
    console.log(
      "selector-getSlidesData-selectedSlidesData:",
      selectedSlidesData
    );

    return selectedSlidesData;
  }
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
  getSelectedSlidesData,
  getSelectedSlides,
  getSelectedSlideKey,
  (slidesData, selectedSlides, selectedSlideKey) => {
    // console.log("selector-getLayerSlides-slidesData:", slidesData);
    // console.log("selector-getLayerSlides-selectedSlides:", selectedSlides);
    // console.log("selector-getLayerSlides-selectedSlideKey:", selectedSlideKey);

    const filteredSliderVizData = selectedSlides.reduce((a,c) => {
      const findSlide = slidesData.find(e => e.displayName === c);
      return findSlide ? [...a, findSlide] : a;
    }, []);
    // console.log("selector-getLayerSlides-filteredSliderVizData:", filteredSliderVizData);
    // const hasSelectedSlideKeys = Object.keys(selectedSlideKey).length > 0;
    // console.log("selector-getLayerSlides-hasSelectedSlideKeys:", hasSelectedSlideKeys);

    const formattedSliderVizData = filteredSliderVizData
      .map(d => {
        const mapProps = {
          ...d.visualization.map,
          fieldName: {
            ...d.visualization.map.fieldName,
            color: selectedSlideKey[d.displayName]
              ? selectedSlideKey[d.displayName]
              : d.visualization.map.fieldName && d.visualization.map.fieldName.color
              ? d.visualization.map.fieldName.color
              : "",
            area: selectedSlideKey[d.displayName]
              ? selectedSlideKey[d.displayName]
              : d.visualization.map.fieldName && d.visualization.map.fieldName.area
              ? d.visualization.map.fieldName.area
              : ""
          }
        };
        console.log("mapProps:", mapProps);
        return {
          ...mapProps,
          data: d.results ? d.results.features : [],
          layerInfo: d
        };
      });
    // console.log("selector-getLayerSlides-formattedSliderVizData:", formattedSliderVizData);

    return formattedSliderVizData;
  }
);

// export const getLayerFoundation = createSelector(
//   getFoundationData,
//   getSelectedFoundationData,
//   (defaultFn, selectedFn = {}) => {
//     const selectedFoundation = selectedFn || {};
//     const foundationLayerData = {
//       data: selectedFoundation.slide_data
//         ? foundations(selectedFn)[defaultFn.name]
//         : {}
//     };
//     return foundationLayerData;
//   }
// );

const makeVisFor = (spec, data) => {
  const { type } = spec.visualization;
  if (type === "PercentDonut") {
    const val = data.object.properties[spec.field];
    const comparisonName = spec.visualization.comparison_name
      ? spec.visualization.comparison_name
      : " ";
    return {
      id: data.object.id,
      visualizationType: "PercentDonut",
      title: spec.name,
      data: [
        { x: spec.name, y: val },
        {
          x: comparisonName,
          y: val < 1 ? 1 - val : 100 - val
        }
      ]
    };
  }
  if (type === "Text" || type === "ComparisonBar") {
    return {
      id: data.object.id,
      visualizationType: "Text",
      title: spec.name,
      data:
        data.object.properties[spec.field] !== null &&
        data.object.properties[spec.field] !== undefined
          ? data.object.properties[spec.field]
          : "Data Not Available"
    };
  }
};

export const getSelectedFoundationDatum = createSelector(
  getSandbox,
  getSelectedFoundationData,
  ({ selectedFoundationDatum }, foundation) => {
    if (!foundation || !selectedFoundationDatum) return [];

    const attrs = foundation.slide_meta.attributes;
    const visualizations = [];

    const selectedFoundationDatumProps =
      selectedFoundationDatum.object.properties;
    const primaryFieldMatch = selectedFoundationDatumProps.hasOwnProperty(
      attrs.primary.field
    );
    const secondaryFieldMatch = selectedFoundationDatumProps.hasOwnProperty(
      attrs.secondary.field
    );

    if (!primaryFieldMatch && !secondaryFieldMatch) return [];

    if (attrs.primary && attrs.primary.field && attrs.primary.visualization) {
      visualizations.push(makeVisFor(attrs.primary, selectedFoundationDatum));
    }
    if (
      attrs.secondary &&
      attrs.secondary.field &&
      attrs.primary.visualization
    ) {
      visualizations.push(makeVisFor(attrs.secondary, selectedFoundationDatum));
    }

    return visualizations;
  }
);

export const getSelectedSlideDatum = createSelector(
  getSandbox,
  getSelectedSlidesData,
  getSelectedSlides,
  getSelectedSlideKey,
  ({ selectedSlideDatum }, slides, selectedSlides, selectedSlideKey) => {
    // console.log("\nselector-getSelectedSlideDatum-selectedSlideDatum:", selectedSlideDatum);
    // console.log("selector-getSelectedSlideDatum-slides:", slides);
    // console.log("selector-getSelectedSlideDatum-selectedSlides:", selectedSlides);

    if (!selectedSlideDatum || !selectedSlideDatum.feature.object || !slides) return;
    const { feature: slideFeature, index: slideIndex} = selectedSlideDatum;


    const activeLayerName = selectedSlides[slideIndex];
    // console.log("selector-getSelectedSlideDatum-activeLayerName:", activeLayerName);

    const activeLayer = slides.find(s => {
      return s.displayName === activeLayerName;
    });
    // console.log("selector-getSelectedSlideDatum-activeLayer:", activeLayer);

    if (!activeLayer || !activeLayer.visualization || !activeLayer.visualization.tooltip) return;
    const tooltipFields = activeLayer.visualization.tooltip;
    // console.log("selector-getSelectedSlideDatum-tooltipFields:", tooltipFields);

    const tooltipInfo = {
      x: slideFeature.x,
      y: slideFeature.y,
      content: [],
    };
    if (
      tooltipFields && 
      tooltipFields.primary && 
      tooltipFields.primary.label &&
      tooltipFields.primary.fieldName
    ) {
      const tooltipFieldName = selectedSlideKey[activeLayerName]
        ? selectedSlideKey[activeLayerName]
        : tooltipFields.primary.fieldName;
      tooltipInfo.content.push({
        name: tooltipFields.primary.label,
        value: slideFeature.object.properties[tooltipFieldName]
      });
    }
    if (
      tooltipFields && 
      tooltipFields.secondary && 
      tooltipFields.secondary.label &&
      tooltipFields.secondary.fieldName
    ) {
      tooltipInfo.content.push({
        name: tooltipFields.secondary.label,
        value: slideFeature.object.properties[tooltipFields.secondary.fieldName]
      });
    }
    // console.log("selector-getSelectedSlideDatum-tooltipInfo:", tooltipInfo);

    return tooltipInfo;
  }
);

export const getAllSlides = createSelector(
  getSelectedSlidesData,
  getSelectedSlides,
  (selectedSlidesData, selectedSlides) => {
    console.log(
      "selector-getAllSlides-selectedSlidesData:",
      selectedSlidesData
    );

    const allSlides = selectedSlidesData.map((s, indx) => {
      console.log("selector-getAllSlides-slide:", s);
      const vizCheck = s.visualization && s.visualization.map;
      return {
        slideId: indx,
        endpoint: s.dataEndpoint,
        label: s.displayName,
        checked: !!selectedSlides.includes(s.displayName),
        civicColor: vizCheck && s.visualization.map.civicColor ? s.visualization.map.civicColor : "",
        mapType: vizCheck && s.visualization.map.mapType ? s.visualization.map.mapType : ""
      };
    });

    console.log("selector-getAllSlides-allSlides", allSlides);
    return allSlides;
  }
);
