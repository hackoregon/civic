/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import { connect } from "react-redux";
import { css } from "emotion";
import { Sandbox } from "@hackoregon/component-library";
import { arrayOf, shape, func, string, bool } from "prop-types";
import { equals } from "ramda";

import ContributeDialogComponent from "../LayerCreate/index";
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
  setSelectedSlideDatum,
  setSelectedBaseMapDatum
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
  getSelectedPackageDescription,
  getSelectedFoundation,
  getSelectedSlides,
  getLayerSlides,
  getSelectedSlideDatum,
  getSelectedBaseMapDatum,
  getAllSlides,
  getSelectedFoundationDatum
} from "../../state/sandbox/selectors";

class SandboxComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      drawerVisible: true,
      dialogVisible: true,
      contributeDialogVisible: false,
      drawerVisualization: false,
      drawerLayerSelector: false,
      drawerExplore: true
    };
    this.updateSlide = this.updateSlide.bind(this);
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.toggleDialog = this.toggleDialog.bind(this);
    this.toggleContributeDialog = this.toggleContributeDialog.bind(this);
    this.toggleDrawerVisualization = this.toggleDrawerVisualization.bind(this);
    this.toggleDrawerLayerSelector = this.toggleDrawerLayerSelector.bind(this);
    this.toggleDrawerExplore = this.toggleDrawerExplore.bind(this);
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
      fetchLayers: cduFetchLayers,
      selectedFoundationDatum: currentSelectedFoundation
    } = this.props;

    const { drawerVisualization } = this.state;
    const { selectedFoundationDatum: previousSelectedFoundation } = prevProps;

    const previousID =
      previousSelectedFoundation && previousSelectedFoundation.id
        ? previousSelectedFoundation.id
        : null;
    const currentID =
      currentSelectedFoundation && currentSelectedFoundation.id
        ? currentSelectedFoundation.id
        : null;

    if (previousID !== currentID && currentID !== null) {
      this.toggleDrawerVisualization();
    }
    if (previousID !== null && currentID === null && drawerVisualization) {
      this.toggleDrawerLayerSelector();
    }

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
    const {
      selectedSlide,
      allSlides,
      setSlides: updateSetSlides,
      selectedSlidesData
    } = this.props;
    const slideName = event.target.value;

    const originalSelectedSlideOrder = [...allSlides].map(s => {
      if (s.label === slideName) {
        return {
          label: s.label,
          checked: !s.checked
        };
      }
      return {
        label: s.label,
        checked: s.checked
      };
    });

    const reorderSelectedSlides = selectedSlide.includes(slideName)
      ? selectedSlide.filter(name => name !== slideName)
      : [
          ...originalSelectedSlideOrder.filter(s => s.checked).map(s => s.label)
        ];

    const choroplethSlidesData = selectedSlidesData.filter(
      slideDatum =>
        slideDatum.visualization.map.mapType === "ChoroplethMap" ||
        slideDatum.visualization.map.mapType === "vtChoroplethMap"
    );
    const choroplethSlides = choroplethSlidesData.map(
      slideDatum => slideDatum.displayName
    );
    // Only allow one choropleth to be selected at a time
    const reorderSelectedSlidesOnlyOneChoropleth = choroplethSlides.includes(
      slideName
    )
      ? reorderSelectedSlides.filter(
          slide => slide === slideName || !choroplethSlides.includes(slide)
        )
      : reorderSelectedSlides;
    updateSetSlides(reorderSelectedSlidesOnlyOneChoropleth);
  };

  toggleDrawer = () => {
    this.setState(prevState => {
      return {
        drawerVisible: !prevState.drawerVisible
      };
    });
  };

  toggleDialog = () => {
    this.setState(prevState => {
      return {
        dialogVisible: !prevState.dialogVisible
      };
    });
  };

  toggleContributeDialog = () => {
    this.setState(prevState => {
      return {
        contributeDialogVisible: !prevState.contributeDialogVisible
      };
    });
  };

  toggleDrawerVisualization = () => {
    this.setState({
      drawerVisualization: true,
      drawerLayerSelector: false,
      drawerExplore: false,
      drawerVisible: true
    });
  };

  toggleDrawerLayerSelector = () => {
    this.setState({
      drawerVisualization: false,
      drawerLayerSelector: true,
      drawerExplore: false,
      drawerVisible: true
    });
  };

  toggleDrawerExplore = () => {
    this.setState({
      drawerVisualization: false,
      drawerLayerSelector: false,
      drawerExplore: true,
      drawerVisible: true
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
      selectedPackageDescription,
      selectedFoundation,
      selectedSlide,
      selectedSlidesData,
      slidesData,
      selectedFoundationData,
      foundationData,
      slideHover,
      baseMapHover,
      selectedSlideDatum,
      selectedBaseMapDatum,
      allSlides,
      isLoading,
      isError,
      setSlideKey: renderSetSlideKey,
      selectedFoundationDatum,
      foundationClick
    } = this.props;
    const {
      drawerVisible,
      dialogVisible,
      contributeDialogVisible,
      drawerVisualization,
      drawerLayerSelector,
      drawerExplore
    } = this.state;

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
        toggleDialog={this.toggleDialog}
        toggleContributeDialog={this.toggleContributeDialog}
        toggleDrawerLayerSelector={this.toggleDrawerLayerSelector}
        toggleDrawerVisualization={this.toggleDrawerVisualization}
        toggleDrawerExplore={this.toggleDrawerExplore}
        fetchSlideDataByDate={renderFetchSlideByDate}
        updatePackage={renderSetPackage}
        styles={styles}
        data={sandboxData}
        selectedPackage={selectedPackage}
        selectedPackageDescription={selectedPackageDescription}
        selectedFoundation={selectedFoundation}
        selectedSlide={selectedSlide}
        drawerVisible={drawerVisible}
        dialogVisible={dialogVisible}
        contributeDialogVisible={contributeDialogVisible}
        ContributeDialogComponent={ContributeDialogComponent}
        drawerVisualization={drawerVisualization}
        drawerLayerSelector={drawerLayerSelector}
        drawerExplore={drawerExplore}
        slideData={selectedSlidesData}
        defaultSlides={slidesData}
        foundationData={selectedFoundationData}
        defaultFoundation={foundationData}
        onSlideHover={slideHover}
        onBaseMapHover={baseMapHover}
        onFoundationClick={foundationClick}
        tooltipInfo={selectedSlideDatum}
        tooltipInfoVector={selectedBaseMapDatum}
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
    selectedPackageDescription: getSelectedPackageDescription(state),
    selectedPackageData: getSelectedPackageData(state),
    selectedFoundation: getSelectedFoundation(state),
    slidesData: getSlidesData(state),
    selectedFoundationData: getSelectedFoundationData(state),
    selectedSlidesData: getSelectedSlidesData(state),
    selectedSlide: getSelectedSlides(state),
    layerSlides: getLayerSlides(state),
    selectedSlideDatum: getSelectedSlideDatum(state),
    selectedBaseMapDatum: getSelectedBaseMapDatum(state),
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
    },
    baseMapHover(feature, slideIndex) {
      dispatch(setSelectedBaseMapDatum(feature, slideIndex));
    }
  })
)(SandboxComponent);

SandboxComponent.propTypes = {
  sandboxData: shape({
    packages: arrayOf(shape({}))
  }),
  slidesData: arrayOf(shape({})),
  selectedPackage: string,
  selectedPackageDescription: string,
  selectedSlide: arrayOf(string),
  selectedSlidesData: arrayOf(shape({})),
  allSlides: arrayOf(shape({})),
  layerSlides: arrayOf(shape({})),
  selectedSlideDatum: shape({}),
  selectedBaseMapDatum: shape({}),
  slideHover: func,
  baseMapHover: func,
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
