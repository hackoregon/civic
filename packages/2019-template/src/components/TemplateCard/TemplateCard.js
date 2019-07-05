import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { LineChart } from "@hackoregon/component-library";

import { fetchTemplateData } from "../../state/template-data/actions";
import {
  isTemplateDataPending,
  getTemplateData
} from "../../state/template-data/selectors";

const TemplateCardVisualization = ({ isLoading, templateData }) => (
  <React.Fragment>
    {!isLoading && templateData && (
      <LineChart
        data={templateData}
        dataKey="year"
        dataValue="ridership"
        dataSeries="series"
        title="Template Plot"
      />
    )}
  </React.Fragment>
);

TemplateCardVisualization.propTypes = {
  isLoading: PropTypes.bool,
  templateData: PropTypes.arrayOf(
    PropTypes.shape({
      year: PropTypes.number,
      ridership: PropTypes.number,
      series: PropTypes.string
    })
  )
};

const templateCardFull = {
  title: "(Story Card #1, Issue #000) Template Card Title",
  slug: "template-card",
  introText: (
    <p>
      Sed ut perspiciatis, unde omnis iste natus error sit voluptatem
      accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab
      illo inventore veritatis et quasi architecto beatae vitae dicta sunt,
      explicabo.
    </p>
  ),
  visualization: TemplateCardVisualization,
  additionalText: (
    <p>
      Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis
      suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem
      vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil
      molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla
      pariatur?
    </p>
  ),
  shareText: "The future of story cards is now! Share it with your friends",
  tags: ["transportation", "bus", "rail", "portland"],
  selector: null,
  analysis: (
    <p>
      Sed ut perspiciatis, unde omnis iste natus error sit voluptatem
      accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab
      illo inventore veritatis et quasi architecto beatae vitae dicta sunt,
      explicabo.
    </p>
  ),
  metadata: "https://link.to/metadata",
  resources: [
    { link: "http://www.hackoregon.org", description: "Hack Oregon" },
    {
      link: "https://www.civicsoftwarefoundation.org",
      description: "Civic Software Foundation"
    },
    { link: "https://www.civicplatform.org", description: "Civic Platform" }
  ]
};

class TemplateCard extends Component {
  componentDidMount() {
    const { init } = this.props;
    init();
  }

  render() {
    const { isLoading, templateData, children } = this.props;

    return children({ isLoading, templateData, templateCardFull });
  }
}

TemplateCard.displayName = "TemplateCard";

TemplateCard.propTypes = {
  init: PropTypes.func,
  isLoading: PropTypes.bool,
  templateData: PropTypes.arrayOf(PropTypes.object),
  children: PropTypes.node
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
