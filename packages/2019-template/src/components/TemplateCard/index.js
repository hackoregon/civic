import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { CivicStoryCard, LineChart } from "@hackoregon/component-library";

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

const TemplateCardFull = {
  title: "(Story Card #1, Issue #000) Template Card Title",
  slug: "template-card-slug",
  introText: (
    <p>
      Sed ut perspiciatis, unde omnis iste natus error sit voluptatem
      accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab
      illo inventore veritatis et quasi architecto beatae vitae dicta sunt,
      explicabo.
    </p>
  ),
  visualization: TemplateCardVisualization,
  shareText: "The future of story cards is now! Find out more at this link",
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
    const { isLoading, templateData } = this.props;

    return (
      <CivicStoryCard
        title={TemplateCardFull.title}
        slug={TemplateCardFull.slug}
      >
        <React.Fragment>
          {TemplateCardFull.introText}
          {TemplateCardFull.selector}
          <TemplateCardFull.visualization
            isLoading={isLoading}
            templateData={templateData}
          />
        </React.Fragment>
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
