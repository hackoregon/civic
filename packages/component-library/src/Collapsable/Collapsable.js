import React, { Children } from 'react';
import { css } from 'emotion';

const toggleStyle = css`
  padding: 10px;
  border-bottom: none;
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
  display: block;
  text-align: center;
  font-family: 'Rubik', sans-serif;
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
    this.setState({ expanded: !this.state.expanded });
  }

  renderToggle() {
    const cta = (this.state.expanded ? 'Less' : 'More');
    const arrow = (this.state.expanded ? 'up' : 'down');

    return (
      <a className={ toggleStyle } onClick={ this.onToggle }>
       { cta }
       <span
        style={{ display: 'block' }}
        className={ `fa fa-arrow-${arrow}` }>
      </span>
      </a>
    );
  }

  render() {
    const children = [];
    let showToggle;
    let toggle;

    Children.forEach(this.props.children, (child) => {
      if (child.props.hidden) {
        showToggle = true;

        if (this.state.expanded) {
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
        { children }
        { toggle }
      </div>
    );
  }
}

const Section = ({ children }) => children;

Collapsable.Section = Section;

export default Collapsable;
