import React, { Component, PropTypes } from 'react';
import copy from 'copy-to-clipboard';
import StoryLink from './StoryLink';
import { ICONS } from '../styleConstants';

export default class StoryFooter extends Component {

  static defaultProps = {
    cardId: 'some-card-id',
    collectionId: 'some-collection-id',
  }

  static propTypes = {
    cardId: PropTypes.string,
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
    copy(`${window.location.origin}/${this.props.collectionId}/${this.props.cardId}`);
    this.switchState(3000);
    this.setState({ copied: true });
  }

  render() {
    require('./StoryFooter.css');

    const shareTxt = this.state.copied ? 'Link copied!' : 'Share card';
    return (
      <div className={'Actions'}>
        <StoryLink className={'Context'} route={`/${this.props.collectionId}/${this.props.cardId}`} icon={ICONS.eye}>View card</StoryLink>
        <StoryLink className={'Share'} action={this.handleCopy} icon={ICONS.link}>{shareTxt}</StoryLink>
      </div>
    );
  }

}
