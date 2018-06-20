import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import QRMap from '../QR';

class Summary extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  getRecommendations() {
    const resultsCopy = this.props.quizResults;
    const noAnswers = Object.keys(resultsCopy).filter(quizNum => resultsCopy[quizNum] === 'no').slice(0, 3);
    return QRMap.filter(QR => noAnswers.indexOf(`${QR.questionId}`) > -1);
  }

  quizResult() {
    const quizzes = Object.keys(this.props.quizResults);
    return quizzes.reduce((score, quiz) => {
      if (this.props.quizResults[quiz] === 'yes') {
        score += 1;
      }
      return score;
    }, 0);
  }


  render() {
    const recommendations = this.getRecommendations();

    return (
      <div>
        <h2>
        Congratulations! You’ve completed {this.quizResult()} of 8
        priority preparation tasks. Here are some recommendations based on your answers:
        </h2>

        <div>
          {recommendations.map((QR, i) => {
            const index = i + 1;
            return (
              <div>
                {`${index}. ${QR.recommendation}`}
              </div>
            );
          })}
        </div>

      </div>
    );
  }
}

Summary.propTypes = {
  quizResults: PropTypes.objectOf(PropTypes.string),
};

const mapStateToProps = ({ form }) => ({ quizResults: form.Quiz.values });

export default connect(mapStateToProps, null)(Summary);
