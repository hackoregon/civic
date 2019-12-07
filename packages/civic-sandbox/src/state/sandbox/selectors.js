/* eslint-disable no-nested-ternary */
import { createSelector } from "reselect";
import { rootState } from "../selectors";

export const getState = createSelector(
  rootState,
  state => state
);

export const getSandbox = createSelector(
  rootState,
  ({ sandbox = {} }) => sandbox
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
export const isAllSandboxLoading = areSlidesLoading;

export const getSelectedPackageData = createSelector(
  getSandboxData,
  getSelectedPackage,
  (data, selectedPackage) => data.packages && data.packages[selectedPackage]
);

export const getSlidesData = createSelector(
  getSandboxData,
  getSelectedSlides,
  getSelectedPackage,
  (sandbox, selectedSlides, selectedPackage) => {
    const [packageMatch] = sandbox.packages.filter(d => {
      return d.displayName === selectedPackage;
    });

    const selectedSlidesData = packageMatch.layers.map(d => {
      return selectedSlides.includes(d.name)
        ? { slide: d, defaultSlide: true }
        : { slide: d, defaultSlide: false };
    });

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

export const getBaseMapDatum = createSelector(
  getSandbox,
  sandbox => sandbox.selectedBaseMapDatum
);

export const getLayerSlides = createSelector(
  getSelectedSlidesData,
  getSelectedSlides,
  getSelectedSlideKey,
  getBaseMapDatum,
  (slidesData, selectedSlides, selectedSlideKey, baseMapDatum) => {
    const filteredSlideVizData = selectedSlides.reduce((a, c) => {
      const findSlide = slidesData.find(e => e.displayName === c);
      return findSlide ? [...a, findSlide] : a;
    }, []);

    const createFilter = mapOptions => {
      const { filter = [], fieldName } = mapOptions;
      if (!filter.length || !fieldName.hover) return filter;

      if (!baseMapDatum) return filter;
      const { feature } = baseMapDatum;
      if (!feature) return filter;

      const { object } = feature;
      if (!object || !object.properties) return filter;

      const { properties } = object;
      if (!properties[fieldName.hover]) return filter;
      const hoverPropValue = properties[fieldName.hover];
      const finalFilter = [...filter.slice(0, 2), hoverPropValue];

      return finalFilter;
    };

    const formattedSliderVizData = filteredSlideVizData.map(d => {
      const filter =
        d.visualization.map.mapType === "VectorTilesMap"
          ? createFilter(d.visualization.map)
          : [];

      const mapProps = {
        ...d.visualization.map,
        legend: {
          ...d.visualization.legend
        },
        tooltip: {
          ...d.visualization.tooltip
        },
        fieldName: {
          ...d.visualization.map.fieldName,
          color: selectedSlideKey[d.displayName]
            ? selectedSlideKey[d.displayName]
            : d.visualization.map.fieldName &&
              d.visualization.map.fieldName.color
            ? d.visualization.map.fieldName.color
            : "",
          area: selectedSlideKey[d.displayName]
            ? selectedSlideKey[d.displayName]
            : d.visualization.map.fieldName &&
              d.visualization.map.fieldName.area
            ? d.visualization.map.fieldName.area
            : ""
        },
        filter
      };
      // console.log("SELECT-mapProps:", mapProps);
      return {
        ...mapProps,
        data: d.results ? d.results.features : [],
        layerInfo: d
      };
    });

    return formattedSliderVizData;
  }
);

export const getSelectedSlideDatum = createSelector(
  getSandbox,
  getSelectedSlidesData,
  getSelectedSlides,
  getSelectedSlideKey,
  ({ selectedSlideDatum }, slides, selectedSlides, selectedSlideKey) => {
    if (!selectedSlideDatum || !selectedSlideDatum.feature.object || !slides)
      return;
    const { feature: slideFeature, index: slideIndex } = selectedSlideDatum;

    const activeLayerName = selectedSlides[slideIndex];

    const activeLayer = slides.find(s => {
      return s.displayName === activeLayerName;
    });

    if (
      !activeLayer ||
      !activeLayer.visualization ||
      !activeLayer.visualization.tooltip
    )
      return;
    const tooltipFields = activeLayer.visualization.tooltip;

    const tooltipInfo = {
      x: slideFeature.x,
      y: slideFeature.y,
      content: []
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

    // eslint-disable-next-line consistent-return
    return tooltipInfo;
  }
);

export const getSelectedBaseMapDatum = createSelector(
  getSandbox,
  getSelectedSlidesData,
  getSelectedSlides,
  ({ selectedBaseMapDatum }, slides, selectedSlides) => {
    const noBaseMapDatum =
      !selectedBaseMapDatum || !selectedBaseMapDatum.feature.object || !slides;
    if (noBaseMapDatum) return null;

    const { feature: slideFeature, index: slideIndex } = selectedBaseMapDatum;

    const activeLayerName = selectedSlides[slideIndex];

    const activeLayer = slides.find(s => {
      return s.displayName === activeLayerName;
    });

    const noTooltip =
      !activeLayer ||
      !activeLayer.visualization ||
      !activeLayer.visualization.tooltip ||
      activeLayer.visualization.tooltip.length < 0;

    if (noTooltip) return null;

    const tooltipArr = activeLayer.visualization.tooltip;

    const { object: slideObject } = slideFeature;

    const tooltipContent = tooltipArr.map(t => {
      const { fieldName: rawValueName, fieldNameTotal: totalValueName } = t;
      const rawValue = slideObject.properties[rawValueName];
      const calcValue =
        t.format === "percentage" && t.fieldNameTotal && rawValue
          ? rawValue / slideObject.properties[totalValueName]
          : rawValue;
      return {
        ...t,
        label: t.label,
        value: calcValue
      };
    });

    return {
      x: slideFeature.x,
      y: slideFeature.y,
      content: tooltipContent
    };
  }
);

export const getSelectedFoundationDatum = createSelector(
  getSandbox,
  getSelectedSlidesData,
  getSelectedSlides,
  getSelectedSlideKey,
  ({ selectedFoundationDatum }, slides, selectedSlides) => {
    if (!selectedFoundationDatum) {
      return null;
    }
    const { index, feature: selectedFeature } = selectedFoundationDatum;

    const activeLayerName = selectedSlides[index];

    const activeLayer = slides.find(s => {
      return s.displayName === activeLayerName;
    });

    if (!activeLayer || !activeLayer.visualization) return null;

    if (activeLayer.visualization.map.mapType !== "ChoroplethMap") return null;

    const feature = selectedFeature && selectedFeature.object;
    const id =
      selectedFeature && selectedFeature.object && selectedFeature.object.id;
    const featureProperties =
      selectedFeature &&
      selectedFeature.object &&
      selectedFeature.object.properties;

    const { displayName } = activeLayer;

    const { visualization: vizProperties } = activeLayer;

    const { map: mapProperties } = vizProperties;
    const colorKey = mapProperties.fieldName && mapProperties.fieldName.color;

    const { tooltip: tooltipProperties } = vizProperties;
    const primaryFormat =
      tooltipProperties &&
      tooltipProperties.primary &&
      tooltipProperties.primary.format;

    return {
      id,
      displayName,
      feature,
      featureProperties,
      colorKey,
      primaryFormat
    };
  }
);

export const getAllSlides = createSelector(
  getSelectedSlidesData,
  getSelectedSlides,
  (selectedSlidesData, selectedSlides) => {
    const allSlides = selectedSlidesData.map((s, indx) => {
      const vizCheck = s.visualization && s.visualization.map;
      return {
        slideId: indx,
        endpoint: s.dataEndpoint,
        label: s.displayName,
        checked: !!selectedSlides.includes(s.displayName),
        civicColor:
          vizCheck && s.visualization.map.civicColor
            ? s.visualization.map.civicColor
            : "",
        mapType:
          vizCheck && s.visualization.map.mapType
            ? s.visualization.map.mapType
            : ""
      };
    });

    return allSlides;
  }
);
