/* eslint-disable */
import React from "react";
import { BaseMap, MapOverlay } from "@hackoregon/component-library";
import { isEmpty } from "ramda";
import { connect } from "react-redux";
import {
  getFmasThunk,
  getFmasData,
  renderFmaPanelProperties,
  getFmaPanelData
} from "../../state";
import MapPanel from "../MapPanel/index";

class FmaMap extends React.Component {
  componentDidMount() {
    const { getFmas } = this.props;
    getFmas();
  }

  render() {
    const { fmasData, fmaPanelData, renderPanel } = this.props;
    const getFillColor = f => {
      if (fmaPanelData && fmaPanelData.fma_id === f.properties.fma_id) {
        return [220, 69, 86, 255];
      }
      return [0, 100, 255, 115];
    };

    return (
      <div>
        {fmasData && (
          <BaseMap>
            <MapOverlay
              data={fmasData}
              opacity={0.8}
              onLayerClick={info => renderPanel(info.object.properties)}
              getFillColor={getFillColor}
              getLineColor={[220, 69, 86, 155]}
              getLineWidth={4}
              autoHighlight
              highlightColor={[220, 69, 86, 155]}
            />
          </BaseMap>
        )}
        {fmaPanelData && !isEmpty(fmaPanelData) ? (
          <MapPanel />
        ) : (
          <h6>Click on an FMA to view some statistics</h6>
        )}
      </div>
    );
  }
}

export default connect(
  state => ({
    fmasData: getFmasData(state.emergency || state),
    fmaPanelData: getFmaPanelData(state.emergency || state)
  }),
  dispatch => ({
    getFmas: () => dispatch(getFmasThunk()),
    renderPanel: fmaProperties =>
      dispatch(renderFmaPanelProperties(fmaProperties))
  })
)(FmaMap);
