import React, { Children } from 'react';

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
    const cta = (this.state.expanded ? 'Show less' : 'Show more');

    return (
      <a onClick={ this.onToggle }>{ cta }</a>
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

Collapsable.Section = Section

export default Collapsable;
