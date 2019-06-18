/* eslint-disable */
import React, { Component } from "react";
import { connect } from "react-redux";
import { BaseMap, MapOverlay } from "@hackoregon/component-library";
import PropTypes from "prop-types";
import { isEmpty } from "ramda";
import { MapPanel } from "../index";
import { setPanelValues } from "../../state";

class TransportMap extends Component {
  openPanel(e) {
    this.props.setPanelValues(e.object);
  }

  render() {
    // console.log('transport map render');
    // console.log(this.props.appData)
    // const mapType = this.props.appData.mapType;
    // const featureData = this.props.appData[`${mapType}Data`] || {};
    // console.log('transport featureData')
    // console.log('mapType', mapType);
    // console.log(this.state.appData)
    // console.log(this.state.appData[`${mapType}Data`]);

    const blurb = {
      features:
        "This is a comprehensive map of all projects in the Right of Way, of any status. The map currently displays projects for the Grind and Pave group for the next several years.  Any feature can be clicked to display details for that feature.",
      conflicts:
        'Projects that appear on this map are potentially close together in time and space.  The default definition of "close" is shown here, which is within 200 meters and 14 days of another project.  In addition, only projects that overlap with the start and end dates show will be displayed. Note that in many cases, the project timelines (which can be viewed below the map by clicking on a marker) are very long, which leads to many potential overlaps with other projects.',
      nearby:
        'This map shows projects that are scheduled close to city hall until the end of the year.  With a little bit more development, users will be able to input an address and view nearby development.  Currently, the map shows the default definition of "nearby" for this map, which is projects within 200 meters of Portland City Hall.'
    };

    const radiusFor = {
      features: 250,
      conflicts: 250,
      nearby: 20
    };

    const zoomFor = {
      features: 10,
      conflicts: 10,
      nearby: 15
    };

    const { geoData, mapType } = this.props;

    const lon = (type, data) => {
      if (!data) return null;
      if (type === "nearby") {
        console.log("LON", data.features[0].geometry.coordinates[0][0]);
        return data.features[0].geometry.coordinates[0][0];
      }
      return null;
    };

    const lat = (type, data) => {
      if (!data) return null;
      if (type === "nearby") {
        return data.features[0].geometry.coordinates[0][1];
      }
      return null;
    };

    console.log("RENDERING");
    console.log("GEODATA", geoData);
    let key = "tempkey";
    if (geoData) {
      key = `${mapType}_${geoData.features.length}` || "tempkey";
    }

    return (
      <div>
        <div style={{ textAlign: "left", marginBottom: "1em" }}>
          {blurb[mapType]}
        </div>
        <BaseMap
          initialZoom={zoomFor[mapType]}
          initialLongitude={lon(mapType, geoData)}
          initialLatitude={lat(mapType, geoData)}
        >
          {geoData && (
            <MapOverlay
              data={geoData}
              opacity={0.5}
              getFillColor={() => [232, 114, 32, 255]}
              getLineColor={() => [232, 114, 32, 255]}
              getRadius={radiusFor[mapType]}
              getLineWidth={1}
              onLayerClick={this.openPanel.bind(this)}
            />
          )}
        </BaseMap>
      </div>
    );
  }
}

TransportMap.defaultProps = {
  appData: {}
};

TransportMap.propTypes = {
  appData: PropTypes.object
};

export default connect(
  allState => {
    const state = allState.transportation || allState;
    return { panelValues: state.app.panelValues };
  },
  dispatch => ({
    setPanelValues: properties => dispatch(setPanelValues(properties))
  })
)(TransportMap);
