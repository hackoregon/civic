import React, { Component } from 'react';
import PropTypes from 'prop-types';
import copy from 'copy-to-clipboard';
import StoryLink from './StoryLink';
import { ICONS } from '../styleConstants';
import './StoryFooter.css';

const MS_TO_SWITCH_TEXT = 3000; // 3 seconds

export default class StoryFooter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      copied: false,
    };
    this.setToFalse = this.setToFalse.bind(this);
    this.switchState = this.switchState.bind(this);
    this.handleCopy = this.handleCopy.bind(this);
  }

  setToFalse() {
    this.setState({ copied: false });
  }

  switchState(ms) {
    setTimeout(this.setToFalse, ms);
  }

  handleCopy() {
    const { collectionId, cardId } = this.props;
    // NOTE: we need to make sure this will work on all browsers
    copy(`${window.location.origin}/${collectionId}/${cardId}`);
    this.switchState(MS_TO_SWITCH_TEXT);
    this.setState({ copied: true });
  }

  render() {
    const { collectionId, cardId } = this.props;
    const shareTxt = this.state.copied ? 'Link copied!' : 'Share card'; // if copied, show Link copied, otherwise, show Share card
    const shareIcon = this.state.copied ? ICONS.check : ICONS.link;
    return (
      <div className={'Actions'}>
        <StoryLink
          className={'Context'}
          route={`/${collectionId}/${cardId}`}
          icon={ICONS.eye}
        >
          View card
        </StoryLink>
        <StoryLink
          className={'Share'}
          action={this.handleCopy}
          icon={shareIcon}
        >
          {shareTxt}
        </StoryLink>
      </div>
    );
  }
}

StoryFooter.defaultProps = {
  cardId: 'some-card-id',
  collectionId: 'some-collection-id',
};

StoryFooter.propTypes = {
  cardId: PropTypes.string,
  collectionId: PropTypes.string,
};
