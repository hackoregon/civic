/* eslint-disable no-console */
import React from 'react';
import { css } from 'emotion';
import { connect } from 'react-redux';
/* eslint-disable import/no-extraneous-dependencies */
import 'react-select/dist/react-select.css';
import { isArray, findIndex } from 'lodash';
import { Sandbox } from '@hackoregon/component-library';

import {
  fetchFoundation,
  fetchSlides,
  setFoundation,
  setSlides,
  setPackage,
} from '../../state/sandbox/actions';
import {
  isAllSandboxLoading,
  isFoundationLoading,
  getSelectedPackageData,
  getFoundationError,
  isAnyError,
  getDefaultFoundationData,
  getDefaultSlidesData,
  getSelectedFoundationData,
  getSelectedSlidesData,
  getLayerData,
} from '../../state/sandbox/selectors';

class SandboxComponent extends React.Component {
  constructor(props) {
    super();
    this.state = {
      drawerVisible: false,
    };

    props.fetchFoundation(props.defaultFoundationData.endpoint);
    props.fetchSlides(props.defaultSlidesData.map(slide => slide.endpoint));
    this.updateFoundation = this.updateFoundation.bind(this);
    this.updateSlide = this.updateSlide.bind(this);
    this.updatePackage = this.updatePackage.bind(this);
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.fetchSlideDataByDate = this.fetchSlideDataByDate.bind(this);
  }
  updateFoundation = (selectedFoundation) => {
    const defaultFoundation = this.state.data.foundations[selectedFoundation];
    this.fetchFoundationData(defaultFoundation);
    this.setState({ selectedFoundation, defaultFoundation });
  }
  updateSlide = (selectedSlide) => {
    const selectedSlides = isArray(selectedSlide) ? selectedSlide : selectedSlide.split(',');
    const defaultSlides = selectedSlides.map(slide => this.state.data.slides[slide]);
    this.fetchSlideData(defaultSlides);
    this.setState({ selectedSlide: selectedSlides, defaultSlides });
  }

  findAndReplaceSlideData = (slideData, data, slide) => {
    const slideIndex = findIndex(slideData, o => o[slide.name]);

    return [...slideData.slice(0, slideIndex),
      Object.assign({}, slideData[slideIndex], data),
      ...slideData.slice(slideIndex + 1)];
  }
  fetchSlideDataByDate = (slide, date) => {
    fetch(`${slide.endpoint}${date}`)
      .then((res) => {
        if (!res.ok) {
          throw Error(res.statusText);
        }
        return res;
      })
      .then(res => res.json())
      .then(data => this.setState({ slideData: this.findAndReplaceSlideData(this.state.slideData, data, slide) }))
      .catch(err => console.error(err));
  }
  updatePackage = (selectedPackage) => {
    const { data } = this.state;
    const packageData = data.packages[selectedPackage];
    const selectedFoundation = packageData.default_foundation;
    this.updateFoundation(selectedFoundation);
    const selectedSlide = packageData.default_slide;
    this.updateSlide(selectedSlide);
    const defaultFoundation = data.foundations[selectedFoundation];
    const defaultSlides = selectedSlide.map(slide => data.slides[slide]);
    this.setState({ selectedPackage, selectedFoundation, selectedSlide, defaultFoundation, defaultSlides });
  }
  toggleDrawer = () => {
    this.setState({ drawerVisible: !this.state.drawerVisible });
  }
  render() {
    const styles = css(`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    `);
    console.log(this.props.isLoading);
    return this.props.isLoading ? <div>...Loading</div> :
    <Sandbox
      layerData={this.props.layerData}
      updateFoundation={this.updateFoundation}
      updateSlide={this.updateSlide}
      toggleDrawer={this.toggleDrawer}
      fetchSlideDataByDate={this.fetchSlideDataByDate}
      updatePackage={this.updatePackage}
      css={styles}
      data={this.props.selectedPackageData}
      selectedPackage={this.props.selectedPackage}
      selectedFoundation={this.props.selectedFoundation}
      selectedSlide={this.props.selectedSlide}
      drawerVisible={this.state.drawerVisible}
      slideData={this.props.selectedSlidesData}
      defaultSlides={this.props.defaultSlidesData}
    />;
  }
}

SandboxComponent.displayName = 'SandboxComponent';

// Connect this to the redux store when necessary
export default connect(
  state => ({
    isLoading: isAllSandboxLoading(state),
    isError: isAnyError(state),
    selectedPackageData: getSelectedPackageData(state),
    defaultFoundationData: getDefaultFoundationData(state),
    defaultSlidesData: getDefaultSlidesData(state),
    selectedFoundationData: getSelectedFoundationData(state),
    selectedSlidesData: getSelectedSlidesData(state),
    layerData: getLayerData(state),
  }),
  dispatch => ({
    fetchFoundation(endpoint = '') {
      dispatch(fetchFoundation(endpoint)());
    },
    fetchSlides(endpoints = []) {
      dispatch(fetchSlides(endpoints)());
    },
    setPackage(selectedPackage = '') {
      dispatch(setPackage(selectedPackage));
    },
    setFoundation(selectedFoundation = '') {
      dispatch(setFoundation(selectedFoundation));
    },
    setSlides(selectedSlides = '') {
      dispatch(setSlides(selectedSlides));
    },
  })
)(SandboxComponent);
