/* eslint-disable no-console */
import React from 'react';
import { css } from 'emotion';
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/react';
import 'react-select/dist/react-select.css';
import { isArray, findIndex } from 'lodash';
import { withInfo } from '@storybook/addon-info';
import { Sandbox } from '../src';

import { foundations, slides } from '../src/Sandbox/constants';
/* global fetch */

class SandboxStory extends React.Component {
  constructor() {
    super();
    this.state = {
      data: {
        packages: {},
        foundations: {},
        slides: {},
      },
      hasFetched: false,
      selectedPackage: 'Sweeps',
      selectedFoundation: '',
      selectedSlide: [],
      defaultFoundation: {},
      defaultSlides: [],
      drawerVisible: true,
      slideData: [],
      foundationData: {},
      allSlides: [],
      foundationMapProps: {}
    };

    this.updateFoundation = this.updateFoundation.bind(this);
    this.updateSlide = this.updateSlide.bind(this);
    this.updateSlide2 = this.updateSlide2.bind(this);
    this.updatePackage = this.updatePackage.bind(this);
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.fetchSlideData = this.fetchSlideData.bind(this);
    this.fetchFoundationData = this.fetchFoundationData.bind(this);
    this.fetchSlideDataByDate = this.fetchSlideDataByDate.bind(this);
    this.initialDataSetup = this.initialDataSetup.bind(this);
  }
  componentDidMount() {
    fetch('https://sandbox.civicpdx.org/civic-sandbox')
      .then(res => res)
      .then(res => res.json())
      .then(data => this.setState({ data: data.body, hasFetched: true }));
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.hasFetched !== prevState.hasFetched &&
      this.state.hasFetched
    ) {
      this.initialDataSetup(this.state);
    }
    if (this.state.selectedFoundation !== prevState.selectedFoundation) {
      this.updateFoundation(this.state.selectedFoundation);
    }
    if (this.state.selectedSlide !== prevState.selectedSlide) {
      this.updateSlide2(this.state.selectedSlide);
    }
  }
  initialDataSetup = state => {
    const selectedPackageData = state.data.packages[this.state.selectedPackage];
    const selectedFoundation = selectedPackageData
      ? selectedPackageData.default_foundation
      : '';
    const selectedSlide = selectedPackageData
      ? selectedPackageData.default_slide
      : [];
    const defaultFoundation =
      selectedFoundation && state.data.foundations[selectedFoundation];

    const dataObj = {
      slide_meta: {},
      slide_data: {}
    };
    const foundationMapObj = foundations(dataObj)[defaultFoundation.name];

    let foundationMapProps = {
      color: foundationMapObj.color,
      getPropValue: foundationMapObj.getPropValue,
      propName: foundationMapObj.propName,
      scaleType: foundationMapObj.scaleType,
    };
    if(foundationMapObj.scaleType === 'ordinal' || foundationMapObj.scaleType === 'threshold') {
      foundationMapProps.categories = foundationMapObj.categories;
    }

    const allSlides = state.data.packages[this.state.selectedPackage].slides.map(slide => {
      const mapObj = slides(dataObj)[state.data.slides[slide].name];
      const color = mapObj.boundary.getLineColor
        ? mapObj.boundary.getLineColor()
        : [238,238,238,255]; //gray
      const mapType = mapObj.map.mapType;
      return {
        slideNumber: slide,
        slideObj: state.data.slides[slide],
        label: state.data.slides[slide].name,
        checked: selectedSlide.includes(slide) ? true : false,
        color,
        mapType
      };
    });
    const defaultSlides = allSlides
      .filter(slide => slide.checked === true)
      .map(slide => state.data.slides[slide.slideNumber]);

    this.setState({
      selectedFoundation,
      selectedSlide,
      defaultFoundation,
      defaultSlides,
      allSlides,
      foundationMapProps
    });
  };
  updateFoundation = selectedFoundation => {
    const defaultFoundation = this.state.data.foundations[selectedFoundation];

    const dataObj = {
      slide_meta: {},
      slide_data: {}
    };
    const foundationMapObj = foundations(dataObj)[defaultFoundation.name];

    let foundationMapProps = {
      color: foundationMapObj.color,
      getPropValue: foundationMapObj.getPropValue,
      propName: foundationMapObj.propName,
      scaleType: foundationMapObj.scaleType,
    };
    if(foundationMapObj.scaleType === 'ordinal' || foundationMapObj.scaleType === 'threshold') {
      foundationMapProps.categories = foundationMapObj.categories;
    }

    this.fetchFoundationData(defaultFoundation);
    this.setState({ selectedFoundation, defaultFoundation, foundationMapProps });
  };
  updateSlide2 = selectedSlide => {
    const selectedSlides = isArray(selectedSlide)
      ? selectedSlide
      : selectedSlide.split(',');
    const defaultSlides = selectedSlides.map(
      slide => this.state.data.slides[slide]
    );
    this.fetchSlideData(defaultSlides);
    this.setState({ selectedSlide: selectedSlides, defaultSlides });
  };
  updateSlide = event => {
    const slideNumber = event.target.name;
    const allSlides = this.state.allSlides.map(slide => {
      if (slide.slideNumber === slideNumber) { slide.checked = !slide.checked }
      return slide;
    });
    const defaultSlides = allSlides.filter(slide => slide.checked === true)
      .map(slide => this.state.data.slides[slide.slideNumber]);
    const selectedSlides = allSlides.filter(slide => slide.checked === true)
      .map(slide => slide.slideNumber);

    this.fetchSlideData(defaultSlides);
    this.setState({ selectedSlide: selectedSlides, defaultSlides, allSlides });
  };
  fetchFoundationData = foundation => {
    fetch(`${foundation.endpoint}`)
      .then(res => {
        if (!res.ok) {
          throw Error(res.statusText);
        }
        return res;
      })
      .then(res => res.json())
      .then(data => this.setState({ foundationData: data }))
      .catch(err => console.error(err));
  };
  fetchSlideData = slideData => {
    const defaultSlides = [...slideData];
    const slideDataNames = this.state.slideData.map(slide => Object.keys(slide)[0]);
    const onlyFetchNewSlides = defaultSlides.filter(slide => !slideDataNames.includes(slide.name));
    Promise.all(
      onlyFetchNewSlides.map(s =>
        fetch(`${s.endpoint}`)
          .then(res => {
            if (!res.ok) {
              throw Error(res.statusText);
            }
            return res;
          })
          .then(res => res.json())
          .then(data => ({ [s.name]: data }))
          .catch(err => console.error(err))
      )
    ).then(data => {
      this.setState({ slideData: [...this.state.slideData, ...data] });
    });
  };
  findAndReplaceSlideData = (slideData, data, slide, slideLabel) => {
    const slideDataValues = Object.values(slideData);
    const newSlideData = slideData.map((slide, index) => {
      const slideDataName = Object.keys(slideDataValues[index])[0];
      if (slideDataName === slideLabel) { slide = ({[slideLabel]: data}) }
      return slide;
    });
    return newSlideData;
  };
  fetchSlideDataByDate = (slide, date, type) => {
    let url;
    if(type === 'slide') {
      url = `${slide.slideObj.endpoint}${date}`;
    } else {
      url = `${slide.endpoint}${date}`;
    }
    fetch(url)
      .then(res => {
        if (!res.ok) {
          throw Error(res.statusText);
        }
        return res;
      })
      .then(res => res.json())
      .then(data => {
        if(type === 'slide') {
          this.setState({
            slideData: this.findAndReplaceSlideData(
              this.state.slideData,
              data,
              type,
              slide.label
            ),
          });
        } else {
          this.setState({ foundationData: data });
        }
      })
      .catch(err => console.error(err));
  };
  updatePackage = selectedPackage => {
    const { data } = this.state;
    const packageData = data.packages[selectedPackage];
    const selectedFoundation = packageData.default_foundation;
    this.updateFoundation(selectedFoundation);
    const selectedSlide = isArray(packageData.default_slide)
      ? packageData.default_slide
      : packageData.default_slide.split(',');
    this.updateSlide2(selectedSlide);

    const dataObj = { slide_meta: {}, slide_data: {} };
    const defaultFoundation = data.foundations[selectedFoundation];
    const foundationMapObj = foundations(dataObj)[defaultFoundation.name];
    let foundationMapProps = {
      color: foundationMapObj.color,
      getPropValue: foundationMapObj.getPropValue,
      propName: foundationMapObj.propName,
      scaleType: foundationMapObj.scaleType,
    };
    if(foundationMapObj.scaleType === 'ordinal' || foundationMapObj.scaleType === 'threshold') {
      foundationMapProps.categories = foundationMapObj.categories;
    }

    const defaultSlides = selectedSlide.map(slide => data.slides[slide]);
    const allSlides = data.packages[selectedPackage].slides.map(slide => {
      const mapObj = slides(dataObj)[data.slides[slide].name];
      const color = mapObj.boundary.getLineColor
        ? mapObj.boundary.getLineColor()
        : [238,238,238,255]; //gray
      const mapType = mapObj.map.mapType;
      return {
        slideNumber: slide,
        slideObj: data.slides[slide],
        label: data.slides[slide].name,
        checked: selectedSlide.includes(slide) ? true : false,
        color,
        mapType
      };
    });

    this.setState({
      selectedPackage,
      selectedFoundation,
      selectedSlide,
      defaultFoundation,
      defaultSlides,
      allSlides,
      foundationMapProps,
    });
  };
  toggleDrawer = () => {
    this.setState({ drawerVisible: !this.state.drawerVisible });
  };
  formatData = (defaultFoundation, defaultSlides) => {
    const formatSlideData = defaultSlides
      .map(slide => {
        let data = {
          slide_meta: {},
          slide_data: {},
        };

        if (this.state.slideData.length) {
          data = this.state.slideData.find(slideData => {
            return slideData[slide.name];
          })[slide.name];
        }
        const slideObj = slides(data)[slide.name];

        return [
          {
            data: slideObj ? slideObj.boundary : {},
          },
          {
            data: slideObj ? slideObj.map : {},
          },
        ];
      })
      .reduce((a, b) => a.concat(b), []);
    return [
      {
        data: this.state.foundationData.slide_data
          ? foundations(this.state.foundationData)[defaultFoundation.name]
          : {},
      },
      ...formatSlideData,
    ];
  };
  render() {
    const styles = css(`
      margin: 0;
      padding: 0;
      width: 100%;
      font-family: 'Roboto Condensed', 'Helvetica Neue', Helvetica, sans-serif;
    `);
    // console.log(this.state);
    return this.state.hasFetched ? (
      <Sandbox
        layerData={this.formatData(
          this.state.defaultFoundation,
          this.state.defaultSlides
        )}
        updateFoundation={this.updateFoundation}
        updateSlide={this.updateSlide}
        toggleDrawer={this.toggleDrawer}
        fetchSlideDataByDate={this.fetchSlideDataByDate}
        updatePackage={this.updatePackage}
        styles={styles}
        data={this.state.data}
        selectedPackage={this.state.selectedPackage}
        selectedFoundation={this.state.selectedFoundation}
        selectedSlide={this.state.selectedSlide}
        drawerVisible={this.state.drawerVisible}
        slideData={this.state.slideData}
        defaultSlides={this.state.defaultSlides}
        defaultFoundation={this.state.defaultFoundation}
        foundationData={this.state.foundationData}
        allSlides={this.state.allSlides}
        foundationMapProps={this.state.foundationMapProps}
      />
    ) : null;
  }
}

export default () =>
  storiesOf('CIVIC Platform Components//Sandbox', module)
    .add('Sandbox', () => (
      <SandboxStory />
    ));
