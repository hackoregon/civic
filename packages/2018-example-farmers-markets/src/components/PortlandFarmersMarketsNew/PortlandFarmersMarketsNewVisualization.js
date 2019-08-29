import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { BaseMap, ScatterPlotMap } from "@hackoregon/component-library";
import { setFarmersMarket } from "../../state/portland-farmers-markets-new/actions";
import { getActiveFarmersMarket } from "../../state/portland-farmers-markets-new/selectors";

const PortlandFarmersMarketsNewVisualization = ({
  isLoading,
  data,
  selectFarmersMarket,
  activeMarket
}) => (
  <Fragment>
    {!isLoading && data && (
      <Fragment>
        <BaseMap>
          <ScatterPlotMap
            data={data}
            autoHighlight={false}
            getColor={() => [109, 222, 69]}
            getRadius={() => 550}
            onLayerClick={event => selectFarmersMarket(event.object)}
          />
        </BaseMap>
        {activeMarket && (
          <div>
            <h3>
              {activeMarket.Market} ({activeMarket.status})
            </h3>
            <dl>
              <dt>When to visit</dt>
              <dd>
                {activeMarket.Day}, {activeMarket.Open_Times}
              </dd>
              <dt>Address</dt>
              <dd>{activeMarket.Location}</dd>
              <dt>Time of the year</dt>
              <dd>{activeMarket.Open_Dates}</dd>
              <dt>Payment options</dt>
              <dd>{activeMarket.Accepts}</dd>
              <dt>Website</dt>
              <dd>
                <a href={activeMarket.Website}>{activeMarket.Website}</a>
              </dd>
            </dl>
          </div>
        )}
        <h3>Neighborhood Friendly</h3>
        <p>
          Portland has many farmers&apos; markets and they are well-distributed
          throughout the inner-city, extending through the westside as well as
          St. Johns.
        </p>
        <p>
          East of I-205 is a notable Farmers&apos; Market desert. What could be
          the explanation for this?
        </p>
      </Fragment>
    )}
  </Fragment>
);

PortlandFarmersMarketsNewVisualization.propTypes = {
  isLoading: PropTypes.bool,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      year: PropTypes.number,
      ridership: PropTypes.number,
      series: PropTypes.string
    })
  ),
  selectFarmersMarket: PropTypes.func,
  activeMarket: PropTypes.shape({})
};

// export default PortlandFarmersMarketsNewVisualization;

export default connect(
  state => ({
    activeMarket: getActiveFarmersMarket(state)
  }),
  dispatch => ({
    selectFarmersMarket(market) {
      dispatch(setFarmersMarket(market));
    }
  })
)(PortlandFarmersMarketsNewVisualization);
