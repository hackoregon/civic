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

export const getLayerSlides = createSelector(
  getSelectedSlidesData,
  getSelectedSlides,
  getSelectedSlideKey,
  (slidesData, selectedSlides, selectedSlideKey) => {
    const filteredSlideVizData = selectedSlides.reduce((a, c) => {
      const findSlide = slidesData.find(e => e.displayName === c);
      return findSlide ? [...a, findSlide] : a;
    }, []);

    const formattedSliderVizData = filteredSlideVizData.map(d => {
      const mapProps = {
        ...d.visualization.map,
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
        }
      };

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
    if (
      !selectedBaseMapDatum ||
      !selectedBaseMapDatum.feature.object ||
      !slides
    )
      return;

    const { feature: slideFeature, index: slideIndex } = selectedBaseMapDatum;

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
      const tooltipFieldName = tooltipFields.primary.fieldName;
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

export const getSelectedFoundationDatum = createSelector(
  getSandbox,
  getSelectedSlidesData,
  getSelectedSlides,
  getSelectedSlideKey,
  ({ selectedFoundationDatum }, slides, selectedSlides) => {
    if (!selectedFoundationDatum) {
      return;
    }
    const { index } = selectedFoundationDatum;

    const activeLayerName = selectedSlides[index];

    const activeLayer = slides.find(s => {
      return s.displayName === activeLayerName;
    });

    if (!activeLayer || !activeLayer.visualization) return;

    if (activeLayer.visualization.map.mapType !== "ChoroplethMap") return;
    // eslint-disable-next-line consistent-return
    return {
      ...selectedFoundationDatum,
      ...activeLayer
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
