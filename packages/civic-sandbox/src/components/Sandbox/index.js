/* eslint-disable no-console */
import React from "react";
import { css } from "emotion";
import { connect } from "react-redux";
/* eslint-disable import/no-extraneous-dependencies */
import "react-select/dist/react-select.css";
import { isArray } from "lodash";
import { Sandbox, Logo } from "@hackoregon/component-library";
import { equals } from "ramda";

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
  constructor(props) {
    super();
    this.state = {
      drawerVisible: true
    };
    this.updateSlide = this.updateSlide.bind(this);
    this.toggleDrawer = this.toggleDrawer.bind(this);
  }

  componentDidMount() {
    // this.props.fetchFoundation(this.props.foundationData.endpoint);
    console.log("sandbox-index-CDM-slidesData:", this.props.slidesData);
    const layerURLs = this.props.slidesData;
    console.log("sandbox-index-CDM-layerURLs:", layerURLs);

    this.props.fetchLayers(layerURLs);
  }

  componentDidUpdate(prevProps) {
    console.log("sandbox-index-CDU-slidesData:", this.props.slidesData);
    if (
      equals(this.props.selectedPackage, prevProps.selectedPackage) &&
      !equals(this.props.selectedSlide, prevProps.selectedSlide)
    ) {
      console.log("sandbox-index-CDU-SAME PACK & NEW SLIDES");
      const onlyFetchNewLayers = this.props.slidesData.map((layer, index) => {
        const previouslyFetchedData = this.props.selectedSlidesData[index].results;
        console.log("sandbox-index-CDU-previouslyFetchedData:", previouslyFetchedData);
        return (
          !previouslyFetchedData &&
          !prevProps.selectedSlide.includes(layer.slide.name) &&
          this.props.selectedSlide.includes(layer.slide.name)
        )
        ? layer
        : {
            ...layer,
            geoJSON: previouslyFetchedData
          };
      });
      console.log("sandbox-index-CDU-onlyFetchNewLayers", onlyFetchNewLayers);

      if (onlyFetchNewLayers.length) {
        this.props.fetchLayers(onlyFetchNewLayers);
      }
      // this.props.fetchLayers(this.props.slidesData);
    }

    if (!equals(this.props.selectedPackage, prevProps.selectedPackage)) {
      console.log("sandbox-index-CDU-NEW PACK & NEW SLIDES");
      this.props.fetchLayers(this.props.slidesData);
    }
  }

  updateSlide = event => {
    console.log("sandbox-index-updateSlide:", event);
    // console.log(
    //   "sandbox-index-updateSlide-event-target:",
    //   event.target
    // );
    // console.log(
    //   "sandbox-index-updateSlide-event-target-name:",
    //   event.target.name
    // );
    console.log(
      "sandbox-index-updateSlide-event-target-value:",
      event.target.value
    );
    const slideName = event.target.value;

    // const selectedSlides = this.props.selectedSlide.includes(slideName)
      // ? this.props.selectedSlide.filter(name => name !== slideName)
      // : [...this.props.selectedSlide, slideName];
    // console.log("sandbox-index-selectedSlides:", selectedSlides);

    // console.log("sandbox-index-allSlides:", this.props.allSlides);
    const orderSelectedSlides = this.props.allSlides.reduce((a,c,i) => {
      a[c.label] = i;
      return a;
      }, {});
    console.log("sandbox-index-orderSelectedSlides:", orderSelectedSlides);

    const reorderSelectedSlides = this.props.selectedSlide.includes(slideName)
        ? this.props.selectedSlide.filter(name => name !== slideName)
        : [
            ...this.props.selectedSlide.slice(0, orderSelectedSlides[slideName]),
            slideName,
            ...this.props.selectedSlide.slice(orderSelectedSlides[slideName]),
          ];
    console.log("sandbox-index-reorderSelectedSlides:", reorderSelectedSlides);

    this.props.setSlides(reorderSelectedSlides);
  };

  toggleDrawer = () => {
    this.setState({ drawerVisible: !this.state.drawerVisible });
  };

  render() {
    /* global console */
    console.log("sandox-index-props:", this.props);

    const styles = css(`
      font-family: "Roboto Condensed", "Helvetica Neue", Helvetica, sans-serif;
    `);

    // const loadingContainer = css`
    //   display: flex;
    //   height: 300px;
    // `;
    // const loading = css`
    //   font-size: 1.5rem;
    //   margin: auto;
    //   text-align: center;
    //   font-family: "Roboto Condensed", "Helvetica Neue", Helvetica, sans-serif;
    // `;
    // const loader = (
    //   <div className={loadingContainer}>
    //     <div className={loading}>
    //       <Logo type="squareLogoAnimated" alt="Loading..." />
    //     </div>
    //   </div>
    // );

    const layerData = [...this.props.layerSlides];
    return (
      // this.props.isLoading ? (
      // loader
      // ) : (
      <Sandbox
        layerData={layerData}
        updateFoundation={this.props.setFoundation}
        updateSlide={this.updateSlide}
        toggleDrawer={this.toggleDrawer}
        fetchSlideDataByDate={this.props.fetchSlideByDate}
        updatePackage={this.props.setPackage}
        styles={styles}
        data={this.props.sandboxData}
        selectedPackage={this.props.selectedPackage}
        selectedFoundation={this.props.selectedFoundation}
        selectedSlide={this.props.selectedSlide}
        drawerVisible={this.state.drawerVisible}
        slideData={this.props.selectedSlidesData}
        defaultSlides={this.props.slidesData}
        foundationData={this.props.selectedFoundationData}
        defaultFoundation={this.props.foundationData}
        onSlideHover={this.props.slideHover}
        tooltipInfo={this.props.selectedSlideDatum}
        allSlides={this.props.allSlides}
        // foundationMapProps={this.props.foundationMapProps}
        selectedFoundationDatum={this.props.selectedFoundationDatum}
        areSlidesLoading={this.props.isLoading}
        errors={this.props.isError}
        updateSlideKey={this.props.setSlideKey}
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
