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
  // isFoundationLoading,
  getSelectedPackageData,
  // getFoundationError,
  isAnyError,
  // getFoundationData,
  getSlidesData,
  getSelectedFoundationData,
  getSelectedSlidesData,
  // getLayerFoundation,
  getSelectedPackage,
  getSelectedFoundation,
  getSelectedSlides,
  getLayerSlides,
  getSelectedSlideDatum,
  getAllSlides,
  // getfoundationMapProps,
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
    // this.props.fetchFoundation(this.props.foundationData.endpoint);
    // console.log("sandbox-index-CDM-slidesData:", slidesData);
    const layerURLs = slidesData;
    // console.log("sandbox-index-CDM-layerURLs:", layerURLs);

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
    // console.log("sandbox-index-CDU-slidesData:", slidesData);
    if (
      equals(selectedPackage, prevProps.selectedPackage) &&
      !equals(selectedSlide, prevProps.selectedSlide)
    ) {
      console.log("sandbox-index-CDU-SAME PACK & NEW SLIDES");
      const onlyFetchNewLayers = slidesData.map((layer, index) => {
        const previouslyFetchedData = selectedSlidesData[index].results;
        // console.log("sandbox-index-CDU-previouslyFetchedData:", previouslyFetchedData);
        return !previouslyFetchedData &&
          !prevProps.selectedSlide.includes(layer.slide.name) &&
          selectedSlide.includes(layer.slide.name)
          ? layer
          : {
              ...layer,
              geoJSON: previouslyFetchedData
            };
      });
      // console.log("sandbox-index-CDU-onlyFetchNewLayers", onlyFetchNewLayers);

      if (onlyFetchNewLayers.length) {
        cduFetchLayers(onlyFetchNewLayers);
      }
      // cduFetchLayers(slidesData);
    }

    if (!equals(selectedPackage, prevProps.selectedPackage)) {
      console.log("sandbox-index-CDU-NEW PACK & NEW SLIDES");
      cduFetchLayers(slidesData);
    }
  }

  updateSlide = event => {
    const { selectedSlide, allSlides, setSlides: updateSetSlides } = this.props;
    // console.log("sandbox-index-updateSlide:", event);
    // console.log(
    //   "sandbox-index-updateSlide-event-target-value:",
    //   event.target.value
    // );
    const slideName = event.target.value;

    // const selectedSlides = selectedSlide.includes(slideName)
    // ? selectedSlide.filter(name => name !== slideName)
    // : [...selectedSlide, slideName];
    // console.log("sandbox-index-selectedSlides:", selectedSlides);

    // console.log("sandbox-index-allSlides:", allSlides);
    const orderSelectedSlides = [...allSlides].reduce((a, c, i) => {
      // eslint-disable-next-line no-param-reassign
      a[c.label] = i;
      return a;
    }, {});
    console.log("sandbox-index-orderSelectedSlides:", orderSelectedSlides);

    const reorderSelectedSlides = selectedSlide.includes(slideName)
      ? selectedSlide.filter(name => name !== slideName)
      : [
          ...selectedSlide.slice(0, orderSelectedSlides[slideName]),
          slideName,
          ...selectedSlide.slice(orderSelectedSlides[slideName])
        ];
    console.log("sandbox-index-reorderSelectedSlides:", reorderSelectedSlides);

    updateSetSlides(reorderSelectedSlides);
  };

  toggleDrawer = () => {
    // this.setState({ drawerVisible: !this.state.drawerVisible });
    this.setState(prevState => {
      return {
        drawerVisible: !prevState.drawerVisible
      };
    });
  };

  render() {
    /* global console */
    console.log("SANDBOX-INDEX-PROPS:", this.props);
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
      // selectedFoundationDatum,
      isLoading,
      isError,
      setSlideKey: renderSetSlideKey
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
        tooltipInfo={selectedSlideDatum}
        allSlides={allSlides}
        // foundationMapProps={this.props.foundationMapProps}
        // selectedFoundationDatum={selectedFoundationDatum}
        areSlidesLoading={isLoading}
        errors={isError}
        updateSlideKey={renderSetSlideKey}
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
    // foundationData: getFoundationData(state),
    slidesData: getSlidesData(state),
    selectedFoundationData: getSelectedFoundationData(state),
    selectedSlidesData: getSelectedSlidesData(state),
    // layerFoundation: getLayerFoundation(state),
    selectedSlide: getSelectedSlides(state),
    layerSlides: getLayerSlides(state),
    selectedSlideDatum: getSelectedSlideDatum(state),
    allSlides: getAllSlides(state),
    // foundationMapProps: getfoundationMapProps(state),
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
    foundationClick(feature) {
      dispatch(setSelectedFoundationDatum(feature));
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
  fetchLayers: func,
  fetchSlideByDate: func,
  setPackage: func,
  setSlides: func,
  setSlideKey: func,

  isLoading: bool,
  isError: bool,

  selectedFoundation: string,
  selectedFoundationData: shape({}),
  // selectedFoundationDatum: arrayOf(),
  foundationData: arrayOf(),
  setFoundation: func
};
