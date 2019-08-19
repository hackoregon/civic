import React, { Children } from "react";
import PropTypes from "prop-types";
import { css } from "emotion";

const toggleStyle = css`
  padding: 10px;
  border-bottom: none;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
  display: block;
  text-align: center;
  font-family: "Rubik", sans-serif;
  font-weight: 500;
  font-size: 1em;
`;

class Collapsable extends React.Component {
  constructor(props) {
    super(props);

    this.state = { expanded: false };

    this.onToggle = this.onToggle.bind(this);
  }

  onToggle() {
    const { expanded } = this.state;
    this.setState({ expanded: !expanded });
  }

  renderToggle() {
    const { expanded } = this.state;
    const cta = expanded ? "Less" : "More";
    const arrow = expanded ? "up" : "down";

    return (
      // eslint-disable-next-line
      <a className={toggleStyle} onClick={this.onToggle}>
        {cta}
        <span style={{ display: "block" }} className={`fa fa-arrow-${arrow}`} />
      </a>
    );
  }

  render() {
    const { expanded } = this.state;
    const children = [];
    let showToggle;
    let toggle;

    // eslint-disable-next-line react/destructuring-assignment
    Children.forEach(this.props.children, child => {
      if (child.props.hidden) {
        showToggle = true;

        if (expanded) {
          children.push(child);
        }
      } else {
        children.push(child);
      }
    });

    if (showToggle) {
      toggle = this.renderToggle();
    }

    return (
      <div>
        {children}
        {toggle}
      </div>
    );
  }
}

const Section = ({ children }) => children;

Collapsable.Section = Section;

Collapsable.propTypes = {
  children: PropTypes.node
};

export default Collapsable;
