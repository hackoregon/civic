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
export const getPackages = getSandboxProperty("packages");
export const getSlidesSuccess = getSandboxProperty("slidesSuccess");
export const isAnyError =
  getSandboxProperty("foundationError") || getSandboxProperty("slidesError");
export const getSelectedFoundation = getSandboxProperty("selectedFoundation");
export const getSelectedSlides = getSandboxProperty("selectedSlide");
// export const isAllSandboxLoading = isFoundationLoading || areSlidesLoading;
export const isAllSandboxLoading = areSlidesLoading; // getSlidesSuccess;

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

// export const getLayerSlides = createSelector(
//   getSlidesData,
//   getSelectedSlidesData,
//   (defaultSlides, selectedSlides) => {
//     if (
//       defaultSlides &&
//       defaultSlides.length &&
//       selectedSlides &&
//       selectedSlides.length
//     ) {
//       const formatSlideData = defaultSlides
//         .map(slideDatum => {
//           const slideData = selectedSlides.find(slide => {
//             const fetchedSlideDataName = Object.keys(slide)[0];
//             const endpointSlideDataName = slideDatum.name;
//             return fetchedSlideDataName === endpointSlideDataName;
//           });
//           const slideDataObj = slideData
//             ? slides(slideData[slideDatum.name])[slideDatum.name]
//             : null;
//           return [
//             {
//               data: slideDataObj ? slideDataObj.boundary : {}
//             },
//             {
//               data: slideDataObj ? slideDataObj.map : {}
//             }
//           ];
//         })
//         .reduce((a, b) => a.concat(b), []);
//       return [...formatSlideData];
//     }
//     return [{ data: {} }];
//   }
// );

export const getLayerSlides = createSelector(
  getSelectedSlidesData,
  getSelectedSlides,
  (slidesData, selectedSlides) => {
    console.log("\nselector-getLayerSlides-slidesData:", slidesData);
    console.log("selector-getLayerSlides-selectedSlides:", selectedSlides);
    
    // const test1 = selectedSlides.map(d => {
    //   const findSlide = slidesData.find(e => e.displayName === d);
    //   return findSlide;
    // });
    // console.log("selector-getLayerSlides-test1:", test1);

    // const filteredSliderVizData = slidesData
    //   .filter(d => selectedSlides.includes(d.displayName));
    // console.log("selector-getLayerSlides-filteredSliderVizData:", filteredSliderVizData);

    const filteredSliderVizData = selectedSlides.reduce((a,c) => {
      const findSlide = slidesData.find(e => e.displayName === c);
      return findSlide ? [...a, findSlide] : a;
    }, []);
    console.log("selector-getLayerSlides-filteredSliderVizData:", filteredSliderVizData);

    const formattedSliderVizData = filteredSliderVizData
      .map(d => {
        return {
          ...d.visualization.map,
          data: d.results ? d.results.features : [],
          layerInfo: d
        };
      });
    console.log("selector-getLayerSlides-formattedSliderVizData:", formattedSliderVizData);

    // const formattedSliderVizData = slidesData
    //   .filter(d => selectedSlides.includes(d.displayName))
    //   .map(d => {
    //     return [
    //       {
    //         ...d.visualization.map,
    //         data: d.results ? d.results.features : [],
    //         layerInfo: d
    //       }
    //     ];
    //   })
    //   .reduce((a, b) => a.concat(b), []);

    return formattedSliderVizData;
  }
);

export const getLayerFoundation = createSelector(
  getFoundationData,
  getSelectedFoundationData,
  (defaultFn, selectedFn = {}) => {
    const selectedFoundation = selectedFn || {};
    const foundationLayerData = {
      data: selectedFoundation.slide_data
        ? foundations(selectedFn)[defaultFn.name]
        : {}
    };
    return foundationLayerData;
  }
);

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
  ({ selectedSlideDatum }, slide) => {
    if (!slide || !selectedSlideDatum || !selectedSlideDatum.object) return;

    const datumFieldNames = Object.keys(selectedSlideDatum.object.properties);
    if (datumFieldNames.length < 1) return;

    const slideAttributes = slide.map((slideObject, index) => {
      const [slideName] = Object.keys(slideObject);
      const attrs = slideObject[slideName].slide_meta.attributes;
      const slideAttrObj = {};
      slideAttrObj.index = index;
      if (attrs.primary.field) {
        slideAttrObj.primary = attrs.primary;
      }
      if (attrs.secondary.field) {
        slideAttrObj.secondary = attrs.secondary;
      }
      return slideAttrObj;
    });

    const findSlideIndex = slideAttributes.filter(d => {
      const { primary } = d;
      const { secondary } = d;
      if (primary && secondary) {
        return datumFieldNames.includes(d.primary.field && d.secondary.field);
      }
      if (primary) {
        return datumFieldNames.includes(d.primary.field);
      }
      return false;
    });

    if (findSlideIndex.length < 1) return;
    const slideIndex = findSlideIndex[0].index;

    const tooltipObj = {};
    tooltipObj.x = selectedSlideDatum.x;
    tooltipObj.y = selectedSlideDatum.y;
    tooltipObj.content = [];

    const [tooltipSlideName] = Object.keys(slide[slideIndex]);

    const tooltipSlideAttrs =
      slide[slideIndex][tooltipSlideName].slide_meta.attributes;
    const tooltipPrimary = tooltipSlideAttrs.primary;
    const tooltipSecondary = tooltipSlideAttrs.secondary;

    const datumProps = selectedSlideDatum.object.properties;

    if (tooltipPrimary && tooltipPrimary.field) {
      tooltipObj.content.push({
        name: tooltipPrimary.name,
        value: datumProps[tooltipPrimary.field]
      });
    }
    if (tooltipSecondary && tooltipSecondary.field) {
      tooltipObj.content.push({
        name: tooltipSecondary.name,
        value: datumProps[tooltipSecondary.field]
      });
    }

    return tooltipObj;
  }
);

// export const getAllSlides = createSelector(
//   getSandboxData,
//   getSelectedPackageData,
//   getSelectedSlides,
//   (sandbox, packageData, selectedSlides) => {
//     const allPackageSlideNumbers = isArray(packageData.slides)
//       ? packageData.slides
//       : [packageData.slides];
//     const allSlidesArr = allPackageSlideNumbers.map(
//       slide => sandbox.slides[slide]
//     );
//     const dataObj = { slide_data: {}, slide_meta: {} };
//     const allSlides = allSlidesArr.map((slide, index) => {
//       const mapObj = slides(dataObj)[slide.name];
//       const gray = [238, 238, 238, 255];
//       const color = mapObj.boundary.getLineColor
//         ? mapObj.boundary.getLineColor()
//         : gray;
//       const mapType = mapObj.map.mapType;
//       return {
//         slideId: allPackageSlideNumbers[index],
//         endpoint: slide.endpoint,
//         label: slide.name,
//         checked: selectedSlides.includes(allPackageSlideNumbers[index])
//           ? true
//           : false,
//         color,
//         mapType
//       };
//     });
//     return allSlides;
//   }
// );

export const getAllSlides = createSelector(
  getSandboxData,
  getSelectedSlidesData,
  getSelectedSlides,
  (sandbox, selectedSlidesData, selectedSlides) => {
    // const allPackageSlideNumbers = isArray(packageData.slides)
    //   ? packageData.slides
    //   : [packageData.slides];
    // const allSlidesArr = allPackageSlideNumbers.map(
    //   slide => sandbox.slides[slide]
    // );
    // const dataObj = { slide_data: {}, slide_meta: {} };
    // const allSlides = allSlidesArr.map((slide, index) => {
    //   const mapObj = slides(dataObj)[slide.name];
    //   const gray = [238, 238, 238, 255];
    //   const color = mapObj.boundary.getLineColor
    //     ? mapObj.boundary.getLineColor()
    //     : gray;
    //   const mapType = mapObj.map.mapType;
    //   return {
    //     slideId: allPackageSlideNumbers[index],
    //     endpoint: slide.endpoint,
    //     label: slide.name,
    //     checked: selectedSlides.includes(allPackageSlideNumbers[index])
    //       ? true
    //       : false,
    //     color,
    //     mapType
    //   };
    // });
    // const selectedSlideAll = sandbox.packages
    //   .filter(p => {
    //     console.log("selector-getAllSlides-pack:", p);
    //     console.log("selector-getAllSlides-pack:", selectedPackage);
    //     return p.displayName === selectedPackage;
    //   }).map((d,i) => {
    //     return {
    //       ...d,
    //       ...d.layers[i]
    //     };
    //   });
    // console.log("selector-getAllSlides-selectedSlide", selectedSlide);
    console.log("\n");

    // const allSlides = []//packageData.map(d => d.name === )
    // .layers.map((slide, indx) => {
    //   console.log("selector-getAllSlides-slides:", slide);
    //   return {
    //     slideId: indx,
    //     endpoint: slide.dataEndpoint,
    //     label: slide.displayName,
    //     // checked: !deSelectedSlides.includes(slide.displayName),
    //     color: [220, 20, 60],
    //     mapType: slide.visualization.map.mapType
    //   };
    // });

    console.log(
      "selector-getAllSlides-selectedSlidesData:",
      selectedSlidesData
    );

    const allSlides = selectedSlidesData.map((s, indx) => {
      // console.log("selector-getAllSlides-slide:", s);
      return {
        slideId: indx,
        endpoint: s.dataEndpoint,
        label: s.displayName,
        checked: !!selectedSlides.includes(s.displayName),
        color: [220, 20, 60, 255],
        civicColor: s.visualization.map.civicColor,
        mapType: s.visualization.map.mapType
      };
    });

    console.log("selector-getAllSlides-allSlides", allSlides);
    return allSlides;
  }
);

// export const getfoundationMapProps = createSelector(
//   getSandboxData,
//   getSelectedFoundation,
//   (sandbox, selectedFoundation) => {
//     const dataObj = { slide_meta: {}, slide_data: {} };
//     const foundationMapObj = foundations(dataObj)[
//       sandbox.foundations[selectedFoundation].name
//     ];
//     const foundationMapProps = {
//       color: foundationMapObj.color,
//       getPropValue: foundationMapObj.getPropValue,
//       propName: foundationMapObj.propName,
//       scaleType: foundationMapObj.scaleType
//     };
//     if (
//       foundationMapObj.scaleType === "ordinal" ||
//       foundationMapObj.scaleType === "threshold"
//     ) {
//       foundationMapProps.categories = foundationMapObj.categories;
//     }
//     return foundationMapProps;
//   }
// );
