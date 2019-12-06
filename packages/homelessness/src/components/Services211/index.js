import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { CivicStoryCard } from "@hackoregon/component-library";
import { HalfDonutChart, ListBarChart } from "../Reuseable";
import { fetchServiceCallsData } from "../../state/Services211/actions";
import shared from "../shared.styles";

class Services211 extends React.Component {
  componentDidMount() {
    this.props.loadData();
  }

  render() {
    const dataLoaded = !!this.props.pieData[0];
    return (
      <CivicStoryCard
        footer={false}
        watermark={<div />}
        title="Homelessness Services"
      >
        <p style={shared.text}>
          In 2016 the 211info helpline fielded 6759 calls for services from
          people who self-identified as homeless. Most of those calls were
          directed to housing assistance services.
        </p>
        {dataLoaded ? (
          <HalfDonutChart dataSets={this.props.pieData[0].data} />
        ) : null}
        <h3 style={shared.header}>Housing Assistance</h3>
        <p style={shared.text}>
          Housing assistance is one of the most common ‘basic needs’ requested
          by people who seek help through 211info.
        </p>
        <p style={shared.text}>
          The most frequently requested housing services in 2016 were rent
          payment assistance, referrals to community shelters, or transitional
          housing, housing search assistance, and and low-cost rental
          assistance.
        </p>
        <h3 style={shared.header}>Other Services</h3>
        <p style={shared.text}>
          Hundreds of people seek assistance through 211info every day. Here are
          the services they asked for most in 2016:
        </p>
        {dataLoaded ? (
          <ListBarChart
            data={this.props.pieData[0].otherChart}
            title="Non-Housing Assistance 211info Calls"
          />
        ) : null}
      </CivicStoryCard>
    );
  }
}

Services211.propTypes = {
  loadData: PropTypes.func.isRequired,
  pieData: PropTypes.array.isRequired
};

const mapDispatchToProps = dispatch => ({
  loadData: () => dispatch(fetchServiceCallsData())
});

const mapStateToProps = allState => {
  const state = allState.homelessness || allState;
  return {
    pieData: [state.services211.serviceCallsData]
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Services211);
