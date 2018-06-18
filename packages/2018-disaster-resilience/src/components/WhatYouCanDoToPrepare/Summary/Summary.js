import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class Summary extends Component {

  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    console.log('Expect next props', nextProps);
  }

  getProgress() {

  }

  render() {
    return (
      <div>This is the Summary</div>
    );
  }
}

Summary.propTypes = {
  quizResults: PropTypes.arrayOf().isRequired,
};

const mapStateToProps = ({ form }) => ({ quizResults: form.Quiz.values });

export default connect(mapStateToProps, null)(Summary);
