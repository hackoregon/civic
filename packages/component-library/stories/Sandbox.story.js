/* eslint-disable no-console */
import React from 'react';
import { css } from 'emotion';
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/react';
import 'react-select/dist/react-select.css';
import { isArray, findIndex } from 'lodash';
import { Sandbox } from '../src';

import { foundations, slides } from '../src/Sandbox/constants';

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
    };

    this.updateFoundation = this.updateFoundation.bind(this);
    this.updateSlide = this.updateSlide.bind(this);
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
      this.updateSlide(this.state.selectedSlide);
    }
  }

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
    Promise.all(
      slideData.map(s =>
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
      this.setState({ slideData: data });
    });
  };

  fetchSlideDataByDate = (slide, date) => {
    fetch(`${slide.endpoint}${date}`)
      .then(res => {
        if (!res.ok) {
          throw Error(res.statusText);
        }
        return res;
      })
      .then(res => res.json())
      .then(data =>
        this.setState({
          slideData: this.findAndReplaceSlideData(
            this.state.slideData,
            data,
            slide
          ),
        })
      )
      .catch(err => console.error(err));
  };

  findAndReplaceSlideData = (slideData, data, slide) => {
    const slideIndex = findIndex(slideData, o => o[slide.name]);

    return [
      ...slideData.slice(0, slideIndex),
      Object.assign({}, slideData[slideIndex], data),
      ...slideData.slice(slideIndex + 1),
    ];
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
    const defaultSlides =
      selectedSlide && selectedSlide.map(slide => state.data.slides[slide]);
    this.setState({
      selectedFoundation,
      selectedSlide,
      defaultFoundation,
      defaultSlides,
    });
  };

  toggleDrawer = () => {
    this.setState({ drawerVisible: !this.state.drawerVisible });
  };

  updateFoundation = selectedFoundation => {
    const defaultFoundation = this.state.data.foundations[selectedFoundation];
    this.fetchFoundationData(defaultFoundation);
    this.setState({ selectedFoundation, defaultFoundation });
  };

  updatePackage = selectedPackage => {
    const { data } = this.state;
    const packageData = data.packages[selectedPackage];
    const selectedFoundation = packageData.default_foundation;
    this.updateFoundation(selectedFoundation);
    const selectedSlide = packageData.default_slide;
    this.updateSlide(selectedSlide);
    const defaultFoundation = data.foundations[selectedFoundation];
    const defaultSlides = selectedSlide.map(slide => data.slides[slide]);
    this.setState({
      selectedPackage,
      selectedFoundation,
      selectedSlide,
      defaultFoundation,
      defaultSlides,
    });
  };

  updateSlide = selectedSlide => {
    const selectedSlides = isArray(selectedSlide)
      ? selectedSlide
      : selectedSlide.split(',');
    const defaultSlides = selectedSlides.map(
      slide => this.state.data.slides[slide]
    );
    this.fetchSlideData(defaultSlides);
    this.setState({ selectedSlide: selectedSlides, defaultSlides });
  };

  render() {
    const styles = css(`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
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
        css={styles}
        data={this.state.data}
        selectedPackage={this.state.selectedPackage}
        selectedFoundation={this.state.selectedFoundation}
        selectedSlide={this.state.selectedSlide}
        drawerVisible={this.state.drawerVisible}
        slideData={this.state.slideData}
        defaultSlides={this.state.defaultSlides}
        defaultFoundation={this.state.defaultFoundation}
        foundationData={this.state.foundationData}
      />
    ) : null;
  }
}

export default () =>
  storiesOf('CIVIC Platform Components//Sandbox', module).add('Sandbox', () => (
    <SandboxStory />
  ));
