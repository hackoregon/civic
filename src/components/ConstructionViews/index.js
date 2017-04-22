import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import SelectorButtons from '../SelectorButtons';
import ControlBox from '../ControlBox';
import TransportMap from '../TransportMap';
import { getFmasThunk, getFmasData, renderFmaPanelId, getFmaPanelId } from '../../state';


class ConstructionViews extends Component {

  componentWillMount() {
    this.props.getFmas();
  }

  render() {

    return (
      <div>
        <p className="Description">
          Construction Project Exploration
        </p>
        <SelectorButtons />
        <ControlBox />
        <TransportMap fmasData={this.props.fmasData} />
      </div>
    );
  }
}

ConstructionViews.defaultProps = {
  children: <div />,
};

ConstructionViews.propTypes = {
  children: React.PropTypes.node,
};

export default connect(
  state => ({
    fmasData: getFmasData(state),
    fmaPanelId: getFmaPanelId(state),
  }),
  dispatch => ({
    getFmas: () => dispatch(getFmasThunk()),
    renderPanel: fmaId => dispatch(renderFmaPanelId(fmaId)),
  }),
)(ConstructionViews);
