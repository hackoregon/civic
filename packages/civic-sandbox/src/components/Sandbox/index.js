/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import { connect } from "react-redux";
import { css } from "emotion";
import { Sandbox } from "@hackoregon/component-library";
import { arrayOf, shape, func, string, bool } from "prop-types";
import { equals } from "ramda";

import "react-select/dist/react-select.css";

import {
  fetchFoundation,
  fetchLayers,
  setFoundation,
  setSlides,
  setPackage,
  setSlideKey,
  fetchSlideByDate,
  setSelectedFoundationDatum,
  setSelectedSlideDatum
} from "../../state/sandbox/actions";

import {
  isAllSandboxLoading,
  getSandboxData,
  getSelectedPackageData,
  isAnyError,
  getSlidesData,
  getSelectedFoundationData,
  getSelectedSlidesData,
  getSelectedPackage,
  getSelectedFoundation,
  getSelectedSlides,
  getLayerSlides,
  getSelectedSlideDatum,
  getAllSlides,
  getSelectedFoundationDatum
} from "../../state/sandbox/selectors";

class SandboxComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      drawerVisible: true
    };
    this.updateSlide = this.updateSlide.bind(this);
    this.toggleDrawer = this.toggleDrawer.bind(this);
  }

  componentDidMount() {
    const { slidesData, fetchLayers: cdmFetchLayers } = this.props;
    const layerURLs = slidesData;
    cdmFetchLayers(layerURLs);
  }

  componentDidUpdate(prevProps) {
    const {
      slidesData,
      selectedPackage,
      selectedSlide,
      selectedSlidesData,
      fetchLayers: cduFetchLayers
    } = this.props;

    if (
      equals(selectedPackage, prevProps.selectedPackage) &&
      !equals(selectedSlide, prevProps.selectedSlide)
    ) {
      const onlyFetchNewLayers = slidesData.map((layer, index) => {
        const previouslyFetchedData = selectedSlidesData[index].results;
        return !previouslyFetchedData &&
          !prevProps.selectedSlide.includes(layer.slide.name) &&
          selectedSlide.includes(layer.slide.name)
          ? layer
          : {
              ...layer,
              geoJSON: previouslyFetchedData
            };
      });

      if (onlyFetchNewLayers.length) {
        cduFetchLayers(onlyFetchNewLayers);
      }
    }

    if (!equals(selectedPackage, prevProps.selectedPackage)) {
      cduFetchLayers(slidesData);
    }
  }

  updateSlide = event => {
    const { selectedSlide, allSlides, setSlides: updateSetSlides } = this.props;
    const slideName = event.target.value;

    const orderSelectedSlides = [...allSlides].reduce((a, c, i) => {
      // eslint-disable-next-line no-param-reassign
      a[c.label] = i;
      return a;
    }, {});

    const reorderSelectedSlides = selectedSlide.includes(slideName)
      ? selectedSlide.filter(name => name !== slideName)
      : [
          ...selectedSlide.slice(0, orderSelectedSlides[slideName]),
          slideName,
          ...selectedSlide.slice(orderSelectedSlides[slideName])
        ];

    updateSetSlides(reorderSelectedSlides);
  };

  toggleDrawer = () => {
    this.setState(prevState => {
      return {
        drawerVisible: !prevState.drawerVisible
      };
    });
  };

  render() {
    const {
      layerSlides,
      setFoundation: renderSetFoundation,
      fetchSlideByDate: renderFetchSlideByDate,
      setPackage: renderSetPackage,
      sandboxData,
      selectedPackage,
      selectedFoundation,
      selectedSlide,
      selectedSlidesData,
      slidesData,
      selectedFoundationData,
      foundationData,
      slideHover,
      selectedSlideDatum,
      allSlides,
      isLoading,
      isError,
      setSlideKey: renderSetSlideKey,
      selectedFoundationDatum,
      foundationClick
    } = this.props;
    const { drawerVisible } = this.state;

    const styles = css(`
      font-family: "Roboto Condensed", "Helvetica Neue", Helvetica, sans-serif;
    `);

    const layerData = [...layerSlides];
    return (
      <Sandbox
        layerData={layerData}
        updateFoundation={renderSetFoundation}
        updateSlide={this.updateSlide}
        toggleDrawer={this.toggleDrawer}
        fetchSlideDataByDate={renderFetchSlideByDate}
        updatePackage={renderSetPackage}
        styles={styles}
        data={sandboxData}
        selectedPackage={selectedPackage}
        selectedFoundation={selectedFoundation}
        selectedSlide={selectedSlide}
        drawerVisible={drawerVisible}
        slideData={selectedSlidesData}
        defaultSlides={slidesData}
        foundationData={selectedFoundationData}
        defaultFoundation={foundationData}
        onSlideHover={slideHover}
        onFoundationClick={foundationClick}
        tooltipInfo={selectedSlideDatum}
        allSlides={allSlides}
        areSlidesLoading={isLoading}
        errors={isError}
        updateSlideKey={renderSetSlideKey}
        selectedFoundationDatum={selectedFoundationDatum}
      />
    );
  }
}

SandboxComponent.displayName = "SandboxComponent";

// Connect this to the redux store when necessary
export default connect(
  state => ({
    isLoading: isAllSandboxLoading(state),
    isError: isAnyError(state),
    sandboxData: getSandboxData(state),
    selectedPackage: getSelectedPackage(state),
    selectedPackageData: getSelectedPackageData(state),
    selectedFoundation: getSelectedFoundation(state),
    slidesData: getSlidesData(state),
    selectedFoundationData: getSelectedFoundationData(state),
    selectedSlidesData: getSelectedSlidesData(state),
    selectedSlide: getSelectedSlides(state),
    layerSlides: getLayerSlides(state),
    selectedSlideDatum: getSelectedSlideDatum(state),
    allSlides: getAllSlides(state),
    selectedFoundationDatum: getSelectedFoundationDatum(state)
  }),
  dispatch => ({
    fetchFoundation(endpoint = "") {
      dispatch(fetchFoundation(endpoint)());
    },
    fetchLayers(slides = []) {
      dispatch(fetchLayers(slides)());
    },
    fetchSlideByDate(slide, date = "", type = "") {
      dispatch(fetchSlideByDate(slide, date, type)());
    },
    setPackage(selectedPackage = "") {
      dispatch(setPackage(selectedPackage));
    },
    setSlideKey(selectedSlideKey = {}) {
      dispatch(setSlideKey(selectedSlideKey));
    },
    setFoundation(selectedFoundation = "") {
      dispatch(setFoundation(selectedFoundation));
    },
    setSlides(selectedSlides = []) {
      dispatch(setSlides(selectedSlides));
    },
    foundationClick(feature, foundationIndex) {
      dispatch(setSelectedFoundationDatum(feature, foundationIndex));
    },
    slideHover(feature, slideIndex) {
      dispatch(setSelectedSlideDatum(feature, slideIndex));
    }
  })
)(SandboxComponent);

SandboxComponent.propTypes = {
  sandboxData: shape({
    packages: arrayOf(shape({}))
  }),
  slidesData: arrayOf(shape({})),
  selectedPackage: string,
  selectedSlide: arrayOf(string),
  selectedSlidesData: arrayOf(shape({})),
  allSlides: arrayOf(shape({})),
  layerSlides: arrayOf(shape({})),
  selectedSlideDatum: shape({}),
  slideHover: func,
  foundationClick: func,
  fetchLayers: func,
  fetchSlideByDate: func,
  setPackage: func,
  setSlides: func,
  setSlideKey: func,
  isLoading: bool,
  isError: bool,
  selectedFoundation: string,
  selectedFoundationData: shape({}),
  foundationData: arrayOf(),
  setFoundation: func,
  selectedFoundationDatum: shape({})
};
