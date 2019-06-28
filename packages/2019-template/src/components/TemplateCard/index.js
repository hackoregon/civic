import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { CivicStoryCard, LineChart } from "@hackoregon/component-library";
import { css } from "emotion";

import { fetchTemplateData } from "../../state/template-data/actions";
import {
  isTemplateDataPending,
  getTemplateData
} from "../../state/template-data/selectors";

const cardLoading = css`
  width: 100%;
  padding: 50px;
  text-align: center;
  background: #eee;
`;

const cardError = css`
  width: 100%;
  padding: 50px;
  text-align: center;
  background: #fdd;
  border: 1px solid #c99;
`;

class TemplateCard extends Component {
  componentDidMount() {
    const { init } = this.props;
    init();
  }

  render() {
    const { isLoading, templateData } = this.props;

    if (isLoading) {
      return <div className={cardLoading}>Loading...</div>;
    }

    if (!templateData) {
      return <div className={cardError}>Could not render Template data</div>;
    }

    return (
      <CivicStoryCard
        title="(Story Card #1, Issue #000) Template Card Title"
        slug="template-card-slug"
      >
        <p>
          Sed ut perspiciatis, unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae
          ab illo inventore veritatis et quasi architecto beatae vitae dicta
          sunt, explicabo.
        </p>

        <LineChart
          data={templateData}
          dataKey="year"
          dataValue="ridership"
          dataSeries="series"
          title="Template Plot"
        />
      </CivicStoryCard>
    );
  }
}

TemplateCard.displayName = "TemplateCard";
TemplateCard.propTypes = {
  init: PropTypes.func,
  isLoading: PropTypes.bool,
  templateData: PropTypes.arrayOf(PropTypes.object)
};

export default connect(
  state => ({
    isLoading: isTemplateDataPending(state),
    templateData: getTemplateData(state)
  }),
  dispatch => ({
    init() {
      dispatch(fetchTemplateData());
    }
  })
)(TemplateCard);
