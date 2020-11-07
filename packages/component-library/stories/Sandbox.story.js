/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
import { Component } from "react";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { storiesOf } from "@storybook/react";
import "react-select/dist/react-select.css";
import { isArray } from "lodash";
import { Sandbox } from "../src";
import { foundations, slides } from "../src/Sandbox/constants";

/* global fetch */

class SandboxStory extends Component {
  constructor() {
    super();
    this.state = {
      data: {
        packages: {},
        foundations: {},
        slides: {}
      },
      hasFetched: false,
      selectedPackage: "Sweeps",
      selectedFoundation: "",
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
    fetch("https://sandbox.civicpdx.org/civic-sandbox")
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
      : "";
    const selectedSlide = selectedPackageData
      ? selectedPackageData.default_slide
      : [];
    const defaultFoundation =
      selectedFoundation && state.data.foundations[selectedFoundation];
    const dataObj = { slide_meta: {}, slide_data: {} };
    const foundationMapObj = foundations(dataObj)[defaultFoundation.name];
    const foundationMapProps = {
      color: foundationMapObj.color,
      getPropValue: foundationMapObj.getPropValue,
      propName: foundationMapObj.propName,
      scaleType: foundationMapObj.scaleType
    };
    if (
      foundationMapObj.scaleType === "ordinal" ||
      foundationMapObj.scaleType === "threshold"
    ) {
      foundationMapProps.categories = foundationMapObj.categories;
    }
    const allSlides = state.data.packages[
      this.state.selectedPackage
    ].slides.map(slide => {
      const mapObj = slides(dataObj)[state.data.slides[slide].name];
      const gray = [238, 238, 238, 255];
      const color = mapObj.boundary.getLineColor
        ? mapObj.boundary.getLineColor()
        : gray;
      const { mapType } = mapObj.map;
      return {
        slideId: slide,
        slideObj: state.data.slides[slide],
        label: state.data.slides[slide].name,
        checked: !!selectedSlide.includes(slide),
        color,
        mapType
      };
    });
    const defaultSlides = allSlides
      .filter(slide => slide.checked === true)
      .map(slide => state.data.slides[slide.slideId]);
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
    const foundationMapProps = {
      color: foundationMapObj.color,
      getPropValue: foundationMapObj.getPropValue,
      propName: foundationMapObj.propName,
      scaleType: foundationMapObj.scaleType
    };
    if (
      foundationMapObj.scaleType === "ordinal" ||
      foundationMapObj.scaleType === "threshold"
    ) {
      foundationMapProps.categories = foundationMapObj.categories;
    }

    this.fetchFoundationData(defaultFoundation);
    this.setState({
      selectedFoundation,
      defaultFoundation,
      foundationMapProps
    });
  };

  updateSlide2 = selectedSlide => {
    const selectedSlides = isArray(selectedSlide)
      ? selectedSlide
      : selectedSlide.split(",");
    const defaultSlides = selectedSlides.map(
      slide => this.state.data.slides[slide]
    );
    this.fetchSlideData(defaultSlides);
    this.setState({ selectedSlide: selectedSlides, defaultSlides });
  };

  updateSlide = event => {
    const slideId = event.target.name;
    const allSlides = this.state.allSlides.map(slide => {
      if (slide.slideId === slideId) {
        return {
          ...slide,
          checked: !slide.checked
        };
      }
      return slide;
    });
    const defaultSlides = allSlides
      .filter(slide => slide.checked === true)
      .map(slide => this.state.data.slides[slide.slideId]);
    const selectedSlides = allSlides
      .filter(slide => slide.checked === true)
      .map(slide => slide.slideId);

    this.fetchSlideData(defaultSlides);
    this.setState({ selectedSlide: selectedSlides, defaultSlides, allSlides });
  };

  fetchFoundationData = foundation => {
    const url = foundation.endpoint.includes("https")
      ? foundation.endpoint
      : `${foundation.endpoint.slice(0, 4)}s${foundation.endpoint.slice(4)}`;
    fetch(url)
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
    const slideDataNames = this.state.slideData.map(
      slide => Object.keys(slide)[0]
    );
    const onlyFetchNewSlides = defaultSlides.filter(
      slide => !slideDataNames.includes(slide.name)
    );
    Promise.all(
      onlyFetchNewSlides.map(s => {
        const url = s.endpoint.includes("https")
          ? s.endpoint
          : `${s.endpoint.slice(0, 4)}s${s.endpoint.slice(4)}`;
        return fetch(url)
          .then(res => {
            if (!res.ok) {
              throw Error(res.statusText);
            }
            return res;
          })
          .then(res => res.json())
          .then(data => ({ [s.name]: data }))
          .catch(err => console.error(err));
      })
    ).then(data => {
      this.setState({ slideData: [...this.state.slideData, ...data] });
    });
  };

  findAndReplaceSlideData = (slideData, data, slideLabel) => {
    const slideDataValues = Object.values(slideData);
    const newSlideData = slideData.map((slide, index) => {
      const [slideDataName] = Object.keys(slideDataValues[index]);
      if (slideDataName === slideLabel) {
        return { [slideLabel]: data };
      }
      return slide;
    });
    return newSlideData;
  };

  fetchSlideDataByDate = (slide, date, type) => {
    let url;
    if (type === "slide") {
      url = slide.slideObj.endpoint.includes("https")
        ? `${slide.slideObj.endpoint}${date}`
        : `${slide.slideObj.endpoint.slice(
            0,
            4
          )}s${slide.slideObj.endpoint.slice(4)}${date}`;
    } else {
      url = slide.endpoint.includes("https")
        ? `${slide.endpoint}${date}`
        : `${slide.endpoint.slice(0, 4)}s${slide.endpoint.slice(4)}${date}`;
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
        if (type === "slide") {
          this.setState({
            slideData: this.findAndReplaceSlideData(
              this.state.slideData,
              data,
              slide.label
            )
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
      : packageData.default_slide.split(",");
    this.updateSlide2(selectedSlide);
    const dataObj = { slide_meta: {}, slide_data: {} };
    const defaultFoundation = data.foundations[selectedFoundation];
    const foundationMapObj = foundations(dataObj)[defaultFoundation.name];
    const foundationMapProps = {
      color: foundationMapObj.color,
      getPropValue: foundationMapObj.getPropValue,
      propName: foundationMapObj.propName,
      scaleType: foundationMapObj.scaleType
    };
    if (
      foundationMapObj.scaleType === "ordinal" ||
      foundationMapObj.scaleType === "threshold"
    ) {
      foundationMapProps.categories = foundationMapObj.categories;
    }
    const defaultSlides = selectedSlide.map(slide => data.slides[slide]);
    const allSlides = data.packages[selectedPackage].slides.map(slide => {
      const mapObj = slides(dataObj)[data.slides[slide].name];
      const gray = [238, 238, 238, 255];
      const color = mapObj.boundary.getLineColor
        ? mapObj.boundary.getLineColor()
        : gray;
      const { mapType } = mapObj.map;
      return {
        slideId: slide,
        slideObj: data.slides[slide],
        label: data.slides[slide].name,
        checked: !!selectedSlide.includes(slide),
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
      foundationMapProps
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
          slide_data: {}
        };
        if (this.state.slideData.length) {
          const findSlide = this.state.slideData.find(slideData => {
            return slideData[slide.name];
          });
          data = findSlide ? findSlide[slide.name] : data;
        }
        const slideObj = slides(data)[slide.name];

        return [
          {
            data: slideObj ? slideObj.boundary : {}
          },
          {
            data: slideObj ? slideObj.map : {}
          }
        ];
      })
      .reduce((a, b) => a.concat(b), []);
    return [
      {
        data: this.state.foundationData.slide_data
          ? foundations(this.state.foundationData)[defaultFoundation.name]
          : {}
      },
      ...formatSlideData
    ];
  };

  render() {
    const styles = css(`
      margin: 0;
      padding: 0;
      width: 100%;
      font-family: 'Roboto Condensed', 'Helvetica Neue', Helvetica, sans-serif;
    `);

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
  storiesOf("Component Lib/CIVIC Platform/Sandbox", module).add(
    "Sandbox",
    () => <SandboxStory />
  );
