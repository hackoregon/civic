import React from 'react';

import { CivicStoryCard } from '@hackoregon/component-library';
import Quiz from './Quiz/Quiz';

export class WhatYouCanDoToPrepare extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      quizFinished: false,
    };
  }


  componentDidMount() {
    // initialize data here
      // load question
  }

  done(e) {
    e.preventDefault();
    e.stopPropagation();

    this.setState({ quizFinished: true });
  }

  render() {
    return (
      <CivicStoryCard
        title="What You Can Do to Prepare for an Earthquake"
        slug="what-you-can-do-to-prepare-for-an-earthquake"
      >
        <Quiz done={e => this.done(e)} />
      </CivicStoryCard>
    );
  }
}

WhatYouCanDoToPrepare.displayName = 'WhatYouCanDoToPrepare';

// Connect this to the redux store when necessary
export default WhatYouCanDoToPrepare;
