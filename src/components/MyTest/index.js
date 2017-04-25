import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
// import styles from './styles.css'; // eslint-disable-line no-unused-vars
import StickySlider from './StickySlider';

const style = { width: 600, margin: 50 };
const marks = {
  1: {
    label: <strong>2007</strong>,
  },
  2: '2008',
  3: '2009',
  4: '2010',
  5: '2011',
  6: '2012',
  7: '2013',
  8: '2014',
  9: '2015',
  10: {
    label: <strong>2016</strong>,
  },
};

const myTest = () => {
  return (
    <StickySlider
      min={1}
      max={10}
      value={4}
      step={1}
      marks={marks}
      style={style}
    />
  );
};

const mapDispatchToProps = dispatch => ({
  loadData: () => fetchPopulationData(dispatch),
});

const mapStateToProps = state => ({
  gender: gender(state),
});

export default connect(
  mapStateToProps, mapDispatchToProps,
)(myTest);
