/* eslint-disable no-nested-ternary */
/* eslint-disable import/no-extraneous-dependencies */
import { Component } from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs, boolean } from "@storybook/addon-knobs";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import {
  BaseMap,
  CivicSandboxMap,
  CivicSandboxDashboard,
  DemoJSONLoader
} from "../src";
import { wallOfText } from "./shared";

const dashboardDescription = css`
  padding: 0 1% 0 5%;
`;

const dataURLs = [
  "https://service.civicpdx.org/neighborhood-development/sandbox/foundations/population/"
];

const createTextViz = (selectedFoundation, title, propName) => {
  return {
    visualizationType: "Text",
    title,
    data: selectedFoundation.properties[propName]
  };
};

const createDonutViz = (selectedFoundation, title, propName) => {
  return {
    visualizationType: "PercentDonut",
    title,
    data: [
      {
        x: title,
        y: selectedFoundation.properties[propName] / 31000
      },
      {
        x: null,
        y: 1 - selectedFoundation.properties[propName] / 31000
      }
    ]
  };
};

class DashboardStory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dashboardIsOpen: false,
      selectedFoundationDatum: {},
      selectedFoundationDatumID: ""
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      selectedFoundationDatumID: prevSelectedFoundationDatumID
    } = prevState;
    const { selectedFoundationDatumID } = this.state;
    if (prevSelectedFoundationDatumID !== selectedFoundationDatumID) {
      this.toggleDashboardOpen();
    }
  }

  toggleDashboard = () => {
    this.setState(prevState => ({
      dashboardIsOpen: !prevState.dashboardIsOpen
    }));
  };

  toggleDashboardOpen = () => {
    this.setState({ dashboardIsOpen: true });
  };

  setselectedFoundationDatum = info => {
    this.setState({
      selectedFoundationDatum: info.object,
      selectedFoundationDatumID: info.object.id
    });
  };

  render() {
    // eslint-disable-next-line react/prop-types
    const { data } = this.props;

    if (data === null) return null;

    const {
      dashboardIsOpen,
      selectedFoundationDatum,
      selectedFoundationDatumID
    } = this.state;

    // eslint-disable-next-line react/prop-types
    const populationData = data;

    const planetColorScheme = [
      [247, 244, 249, 155],
      [231, 225, 239, 155],
      [212, 185, 218, 155],
      [201, 148, 199, 155],
      [223, 101, 176, 155],
      [231, 41, 138, 155],
      [206, 18, 86, 155],
      [152, 0, 67, 155],
      [103, 0, 31, 155]
    ];

    const foundation = {
      mapType: "ChoroplethMap",
      id: "choropleth-layer-foundation-population",
      opacity: 1,
      data: populationData.slide_data.features,
      getLineColor: f => {
        return f.id === selectedFoundationDatumID
          ? [30, 144, 255, 255]
          : [0, 0, 0, 55];
      },
      getLineWidth: f => {
        return f.id === selectedFoundationDatumID ? 175 : 1;
      },
      scaleType: "equal",
      color: planetColorScheme,
      getPropValue: f => f.properties.total_population,
      propName: "total_population",
      highlightColor: [30, 144, 255, 100],
      onLayerClick: foundationDatum =>
        this.setselectedFoundationDatum(foundationDatum),
      updateTriggers: {
        getLineColor: selectedFoundationDatumID,
        getLineWidth: selectedFoundationDatumID
      }
    };

    const mapLayers = [
      {
        data: foundation,
        visible: true
      }
    ];

    // Dashboard Visualization
    let textData = {};
    if (selectedFoundationDatum.properties) {
      textData = createTextViz(
        selectedFoundationDatum,
        "Neighborhood Population",
        "total_population"
      );
    }

    let donutData = {};
    if (selectedFoundationDatum.properties) {
      donutData = createDonutViz(
        selectedFoundationDatum,
        "Neighborhood Population",
        "total_population"
      );
    }

    const textVisible = boolean("Text:", false);
    const donutVisible = boolean("Percent Donut:", true);

    const dashboardArray = [
      {
        data: textData,
        visible: textVisible
      },
      {
        data: donutData,
        visible: donutVisible
      }
    ];

    const dashboardData = dashboardArray
      .filter(d => d.visible)
      .map(d => d.data);

    // Dashboard Description
    const dashboardInformation = (
      <div css={dashboardDescription}>
        <h2>
          How has ridership changed throughout Tri-Met&apos;s service area over
          time?
        </h2>
        <p>{wallOfText}</p>
        <p>{wallOfText}</p>
        <p>{wallOfText}</p>
        <p>{wallOfText}</p>
        <p>{wallOfText}</p>
        <p>{wallOfText}</p>
        <p>{wallOfText}</p>
        <p>{wallOfText}</p>
        <h4>Source: census.gov ACS</h4>
      </div>
    );
    const dashboardDescriptionVisible = boolean("Include Description:", false);

    return (
      <div>
        <div style={{ position: "relative", margin: "0 2%" }}>
          <BaseMap
            initialZoom={10.5}
            initialLatitude={45.5445}
            initialLongitude={-122.725}
            height={650}
            mapboxStyle="mapbox://styles/mapbox/dark-v9"
            updateViewport={false}
          >
            <CivicSandboxMap
              mapLayers={mapLayers}
              selectedFoundationDatum={[selectedFoundationDatum]}
            />
          </BaseMap>
          <CivicSandboxDashboard
            data={dashboardData}
            onClick={this.toggleDashboard}
            isDashboardOpen={dashboardIsOpen}
          >
            {dashboardDescriptionVisible ? dashboardInformation : null}
          </CivicSandboxDashboard>
        </div>
      </div>
    );
  }
}

export default () =>
  storiesOf("Component Lib/CIVIC Platform/CIVIC Sandbox Dashboard", module)
    .addDecorator(withKnobs)
    .add("Simple usage", () => (
      <DemoJSONLoader urls={dataURLs}>
        {data => <DashboardStory data={data} />}
      </DemoJSONLoader>
    ));
