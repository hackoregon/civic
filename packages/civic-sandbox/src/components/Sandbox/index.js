/* eslint-disable no-console */
import React from "react";
import { css } from "emotion";
import { connect } from "react-redux";
/* eslint-disable import/no-extraneous-dependencies */
import "react-select/dist/react-select.css";
import { isArray } from "lodash";
import { Sandbox } from "@hackoregon/component-library";
import { equals } from "ramda";

import {
  fetchFoundation,
  fetchSlides,
  setFoundation,
  setSlides,
  setPackage,
  fetchSlideByDate,
  setSelectedFoundationDatum,
  setSelectedSlideDatum
} from "../../state/sandbox/actions";
import {
  isAllSandboxLoading,
  getSandboxData,
  isFoundationLoading,
  getSelectedPackageData,
  getFoundationError,
  isAnyError,
  getFoundationData,
  getSlidesData,
  getSelectedFoundationData,
  getSelectedSlidesData,
  getLayerFoundation,
  getSelectedPackage,
  getSelectedFoundation,
  getSelectedSlides,
  getLayerSlides,
  getSelectedSlideDatum,
  getAllSlides,
  getfoundationMapProps,
  getSelectedFoundationDatum
} from "../../state/sandbox/selectors";

class SandboxComponent extends React.Component {
  constructor(props) {
    super();
    this.state = {
      drawerVisible: false
    };
    this.updateSlide = this.updateSlide.bind(this);
    this.toggleDrawer = this.toggleDrawer.bind(this);
  }
  componentDidMount() {
    this.props.fetchFoundation(this.props.foundationData.endpoint);
    this.props.fetchSlides(this.props.slidesData);
  }
  componentDidUpdate(prevProps) {
    if (!equals(this.props.selectedPackage, prevProps.selectedPackage)) {
      this.props.fetchFoundation(this.props.foundationData.endpoint);
      this.props.fetchSlides(this.props.slidesData);
    }
    if (
      equals(this.props.selectedPackage, prevProps.selectedPackage) &&
      !equals(this.props.selectedFoundation, prevProps.selectedFoundation)
    ) {
      this.props.fetchFoundation(this.props.foundationData.endpoint);
    }
    if (
      equals(this.props.selectedPackage, prevProps.selectedPackage) &&
      !equals(this.props.selectedSlide, prevProps.selectedSlide)
    ) {
      const fetchedSlideDataNames = this.props.selectedSlidesData.map(
        slideDatum => {
          return Object.keys(slideDatum)[0];
        }
      );
      const onlyFetchNewSlide = this.props.slidesData.filter(
        d => !fetchedSlideDataNames.includes(d.name)
      );
      this.props.fetchSlides(onlyFetchNewSlide);
    }
  }
  updateSlide = event => {
    const slideNumber = event.target.name;
    const selectedSlides = this.props.selectedSlide.includes(slideNumber)
      ? this.props.selectedSlide.filter(num => num !== slideNumber)
      : [...this.props.selectedSlide, slideNumber];
    this.props.setSlides(selectedSlides);
  };
  toggleDrawer = () => {
    this.setState({ drawerVisible: !this.state.drawerVisible });
  };
  render() {
    const styles = css(`
    font-family: "Roboto Condensed", "Helvetica Neue", Helvetica, sans-serif;
    `);

    const loading = css`
      font-size: 1.5rem;
      width: 100%;
      text-align: center;
      font-family: "Roboto Condensed", "Helvetica Neue", Helvetica, sans-serif;
    `;

    const layerData = [this.props.layerFoundation, ...this.props.layerSlides];
    return this.props.isLoading ? (
      <div className={loading}>Loading...</div>
    ) : (
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
        onFoundationClick={this.props.foundationClick}
        onSlideHover={this.props.slideHover}
        tooltipInfo={this.props.selectedSlideDatum}
        allSlides={this.props.allSlides}
        foundationMapProps={this.props.foundationMapProps}
        selectedFoundationDatum={this.props.selectedFoundationDatum}
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
    foundationData: getFoundationData(state),
    slidesData: getSlidesData(state),
    selectedFoundationData: getSelectedFoundationData(state),
    selectedSlidesData: getSelectedSlidesData(state),
    layerFoundation: getLayerFoundation(state),
    selectedSlide: getSelectedSlides(state),
    layerSlides: getLayerSlides(state),
    selectedSlideDatum: getSelectedSlideDatum(state),
    allSlides: getAllSlides(state),
    foundationMapProps: getfoundationMapProps(state),
    selectedFoundationDatum: getSelectedFoundationDatum(state)
  }),
  dispatch => ({
    fetchFoundation(endpoint = "") {
      dispatch(fetchFoundation(endpoint)());
    },
    fetchSlides(slides = []) {
      dispatch(fetchSlides(slides)());
    },
    fetchSlideByDate(slide, date = "", type = "") {
      dispatch(fetchSlideByDate(slide, date, type)());
    },
    setPackage(selectedPackage = "") {
      dispatch(setPackage(selectedPackage));
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
    slideHover(feature) {
      dispatch(setSelectedSlideDatum(feature));
    }
  })
)(SandboxComponent);
