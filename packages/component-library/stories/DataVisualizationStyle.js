import React from 'react';  
import PropTypes from 'prop-types';
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

export default class DataVisualizationStyle extends React.Component {

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
        <h1>UX Style Guide</h1>
        <h2>Data Visualization</h2>
        <p>Placeholder for Data Visualization style guidelines.</p>
      </div>
    );
  }

}
