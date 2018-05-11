import React, { PropTypes } from 'react';
// import { storiesOf } from '@storybook/react';
// import { checkA11y } from '@storybook/addon-a11y';

const styles = {
  main: {
    margin: 15,
    maxWidth: 600,
    lineHeight: 1.4,
    fontFamily: '"Helvetica Neue", Helvetica, "Segoe UI", Arial, freesans, sans-serif',
  },

  logo: {
    width: 200,
  },

  link: {
    color: '#1474f3',
    textDecoration: 'none',
    borderBottom: '1px solid #1474f3',
    paddingBottom: 2,
  },

  code: {
    fontSize: 15,
    fontWeight: 600,
    padding: '2px 5px',
    border: '1px solid #eae9e9',
    borderRadius: 4,
    backgroundColor: '#f3f2f2',
    color: '#3a3a3a',
  },
};

export default class Welcome extends React.Component {

  static propTypes = {
    showApp: PropTypes.func,
  }

  constructor() {
    super();
    this.showApp = this.showApp.bind(this);
  }

  showApp(e) {
    e.preventDefault();
    if (this.props.showApp) this.props.showApp();
  }

  render() {
    return (
      <div style={styles.main}>
        <h1>Welcome to Hack Oregon&apos;s Storybook</h1>
        <p>
          This is a UI component dev environment for the component library.
        </p>
        <p>
          Stories are originating from the <code style={styles.code}>/stories</code> directory.
          <br />
          A story is a state of one or more UI components.
          <br />
          (Basically a story is like a visual test case.)
        </p>
        <p>
          See these sample <a style={styles.link} href="#" onClick={this.showApp}>stories</a> for a component called <code style={styles.code}>Button</code>.
        </p>
        <p>
          Just like that, you can add your own components as stories.
          <br />
          You can also edit those components and see changes right away.
          <br />
          (Try editing the <code style={styles.code}>Button</code> component
          located at <code style={styles.code}>src/stories/Button.js</code>.)
        </p>
      </div>
    );
  }
}
//
// storiesOf('Welcome', module)
//   .addDecorator(checkA11y)
//   .add('to Storybook', () => (
//     <Welcome showApp={linkTo('Button')} />
//   ));
