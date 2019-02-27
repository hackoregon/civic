import React from 'react';

import { CivicStoryCard } from '@hackoregon/component-library';
import Quiz from './Quiz/Quiz';
import Summary from './Summary/Summary';

export class WhatYouCanDoToPrepare extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      quizFinished: false,
    };
  }

  done(e) {
    e.preventDefault();
    e.stopPropagation();

    this.setState({ quizFinished: true });
  }

  renderSection() {
    return !this.state.quizFinished ? (
      <Quiz done={e => this.done(e)} />
    ) : (
      <Summary quizFinished={this.state.quizFinished} />
    );
  }

  render() {
    return (
      <CivicStoryCard
        title="What You Can Do to Prepare for an Earthquake"
        slug="what-you-can-do-to-prepare-for-an-earthquake"
      >
        {this.renderSection()}
      </CivicStoryCard>
    );
  }
}

WhatYouCanDoToPrepare.displayName = 'WhatYouCanDoToPrepare';

// Connect this to the redux store when necessary
export default WhatYouCanDoToPrepare;
