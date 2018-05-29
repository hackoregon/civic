import React, { Component } from 'react';
import PropTypes from 'prop-types';
import copy from 'copy-to-clipboard';
import StoryLink from '../StoryCard/StoryLink';
import { ICONS } from '../styleConstants';

const MS_TO_SWITCH_TEXT = 3000; // 3 seconds

export default class ShareCollection extends Component {

  static defaultProps = {
    collectionId: 'some-collection-id',
  }

  static propTypes = {
    collectionId: PropTypes.string,
  }

  constructor(props) {
    super(props);
    this.state = {
      copied: false,
    };
  }

  setToFalse = () => this.setState({ copied: false });

  switchState = ms => setTimeout(this.setToFalse, ms);

  handleCopy = () => {
    // NOTE: we need to make sure this will work on all browsers
    copy(`${window.location.href}`);
    this.switchState(MS_TO_SWITCH_TEXT);
    this.setState({ copied: true });
  }

  render() {
    const shareTxt = this.state.copied ? 'Link copied!' : 'Share'; // if copied, show Link copied, otherwise, show Share card
    const shareIcon = this.state.copied ? ICONS.check : ICONS.link;
    return (
      <StoryLink className={'Share'} action={this.handleCopy} icon={shareIcon}>{shareTxt}</StoryLink>
    );
  }
}
