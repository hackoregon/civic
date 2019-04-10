import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import SelectorButtons from "../SelectorButtons";
import ControlBox from "../ControlBox";
import TransportMap from "../TransportMap";
import {
  selectMapThunk,
  getFeatureData,
  renderFmaPanelId,
  getFmaPanelId
} from "../../state";

class ConstructionViews extends Component {
  componentDidMount() {
    this.props.selectMap("features");
  }

  render() {
    console.log("rendering Construction", this.props.appData);
    // let features = this.props.appData[`${this.props.appData.mapType}Data`];
    // console.log('cv features');
    // console.log(features);
    // console.log('cv appdata');
    // console.log(this.props.appData);
    const mapType = this.props.appData.mapType;
    console.log("cv maptype", mapType);
    const geoData = this.props.appData[`${this.props.appData.mapType}Data`];
    console.log("cv geodata", geoData);
    const controls = this.props.appData[mapType];
    console.log("cv controls", controls);
    return (
      <div style={{ textAlign: "left" }}>
        <p>
          These maps provide the ability to explore road work data provided by
          the City of Portland. Road word data is a loose term that currently
          includes Right of Way closures, pavement moratoriums, repaving plans,
          and several other types of project types that can affect access to our
          streets. The maps below represent a proof of concept for how this data
          can be used and they demonstrate the ability to:
        </p>
        <p>
          <ul>
            <li style={{ textAlign: "left" }}>
              Consume different types of data, including existing public APIs,
              extracts from other mapping systems, and even PDFs.
            </li>
            <li style={{ textAlign: "left" }}>
              Provide filtered views of the data, which replicates some of
              PBOT's existing capability.
            </li>
            <li style={{ textAlign: "left" }}>
              Provide a way to see what projects are scheduled close to a
              particular location.
            </li>
            <li style={{ textAlign: "left" }}>
              Display potential scheduling conflicts between any project in the
              system.
            </li>
          </ul>
        </p>
        <p>
          While this page does not currently have the ability to take user input
          for project filters, we hope to implement this functionality soon. The
          APIs, which have full filtering capability, can be accessed directly
          at http://service.civicpdx.org/transport/
        </p>
        <strong>
          <p
            style={{
              display: "flex",
              flexFlow: "row wrap",
              justifyContent: "center"
            }}
          >
            Choose a Map
          </p>
        </strong>
        <SelectorButtons />
        <ControlBox controls={controls} mapType={this.props.appData.mapType} />
        <TransportMap geoData={geoData} mapType={this.props.appData.mapType} />
      </div>
    );
  }
}

ConstructionViews.defaultProps = {
  children: <div />
};

ConstructionViews.propTypes = {
  children: PropTypes.node
};

export default connect(
  state => ({
    appData: state.transportation ? state.transportation.app : state.app,
    fmaPanelId: getFmaPanelId(state.transportation || state)
  }),
  dispatch => ({
    selectMap: mapType => dispatch(selectMapThunk(mapType)),
    renderPanel: fmaId => dispatch(renderFmaPanelId(fmaId))
  })
)(ConstructionViews);
