import React, { Component } from "react";
import PropTypes from "prop-types";
import copy from "copy-to-clipboard";
import { css } from "emotion";
import CivicStoryLink from "./CivicStoryLink";
import { ICONS } from "../styleConstants";

const MS_TO_SWITCH_TEXT = 3000; // 3 seconds

const actionsClass = css`
  background: #eee;
  display: flex;
  justify-content: space-between;
  margin: -3em;
  margin-top: 2em;
  padding: 0 3em;
  @media (max-width: 640px) {
    margin: -3em -2em;
    margin-top: 2em;
  }
`;

const alignRight = css`
  margin-left: 0;
  display: flex;
`;

export default class StoryFooter extends Component {
  static defaultProps = {
    slug: "some-card-id"
  };

  static propTypes = {
    slug: PropTypes.string,
    source: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {
      copied: false
    };
  }

  setToFalse = () => this.setState({ copied: false });

  handleCopy = () => {
    const { slug } = this.props;
    // NOTE: we need to make sure this will work on all browsers
    copy(`${window.location.origin}/cards/${slug}`);
    this.switchState(MS_TO_SWITCH_TEXT);
    this.setState({ copied: true });
  };

  switchState = ms => setTimeout(this.setToFalse, ms);

  render() {
    const { slug, source } = this.props;
    const { copied } = this.state;
    const shareTxt = copied ? "Link copied!" : "Share card"; // if copied, show Link copied, otherwise, show Share card
    const shareIcon = copied ? ICONS.check : ICONS.link;
    const routeOrUndefined =
      `${window.location.origin}/cards/${slug}` === window.location.href
        ? undefined
        : `/cards/${slug}`;

    return (
      <div className={actionsClass}>
        <CivicStoryLink
          link={source}
          route={source ? undefined : `/cards/${slug}`}
          icon={ICONS.info}
        >
          Source
        </CivicStoryLink>
        <div className={alignRight}>
          <CivicStoryLink
            additionalClassName={alignRight}
            route={routeOrUndefined}
            action={this.handleCopy}
            icon={shareIcon}
          >
            {shareTxt}
          </CivicStoryLink>
        </div>
      </div>
    );
  }
}
