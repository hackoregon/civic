import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import QRMap from "../QR";

const summaryFormat = {
  margin: "15px 0px 15px 0px"
};

class Summary extends Component {
  getRecommendations() {
    const quizResults = this.props;
    const resultsCopy = quizResults.quizResults;
    const noAnswers = Object.keys(resultsCopy)
      .filter(quizNum => resultsCopy[quizNum] === "no")
      .slice(0, 3);
    return QRMap.filter(QR => noAnswers.indexOf(`${QR.questionId}`) > -1);
  }

  quizResult() {
    const quizResults = this.props;
    const quizzes = quizResults.quizResults;
    return quizzes.reduce((score, quiz) => {
      let currentScore = score;
      if (quiz === "yes") {
        currentScore += 1;
      }
      return currentScore;
    }, 0);
  }

  // eslint-disable-next-line class-methods-use-this
  downloadPDF(e) {
    e.preventDefault();
    e.stopPropagation();

    // eslint-disable-next-line no-console
    console.log("Downloading pdf!!!");
  }

  render() {
    const recommendations = this.getRecommendations();

    return (
      <section>
        <h2>
          Congratulations! You’ve completed {this.quizResult()} of 8 priority
          preparation tasks. Here are some recommendations based on your
          answers:
        </h2>

        <div style={summaryFormat}>
          {recommendations.map((QR, i) => {
            const index = i + 1;
            return <div>{`${index}. ${QR.shortRecommendation}`}</div>;
          })}
        </div>

        <div style={summaryFormat}>
          For more information about disaster preparedness and building
          neighborhood resilence see our resource page.
        </div>

        <div style={summaryFormat}>What else can you do?</div>

        <div style={summaryFormat}>
          Get involved and advocate for better policies and disaster
          preparedness and more funding for agencies like the return Portland
          Bureau of Emergency Managment.
        </div>

        <div style={summaryFormat}>Contact City Council members:</div>

        <div style={summaryFormat}>
          Nick Fish <br />
          Ted Wheeler <br />
          Amanda Fritz <br />
          Chloe Eudaly <br />
          Jo Ann Hardesty
        </div>

        <div style={summaryFormat}>
          Contact the Mayor:
          <br />
          Ted Wheeler
        </div>
      </section>
    );
  }
}

Summary.propTypes = {
  // eslint-disable-next-line react/no-unused-prop-types
  quizResults: PropTypes.objectOf(PropTypes.string)
};

const mapStateToProps = ({ form }) => ({ quizResults: form.Quiz.values });

export default connect(
  mapStateToProps,
  null
)(Summary);
