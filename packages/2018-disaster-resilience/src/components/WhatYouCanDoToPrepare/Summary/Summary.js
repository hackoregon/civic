import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import QRMap from "../QR";

const summaryFormat = {
  margin: "15px 0px 15px 0px"
};

class Summary extends Component {
  constructor(props) {
    super(props);
  }

  getRecommendations() {
    const resultsCopy = this.props.quizResults;
    const noAnswers = Object.keys(resultsCopy)
      .filter(quizNum => resultsCopy[quizNum] === "no")
      .slice(0, 3);
    return QRMap.filter(QR => noAnswers.indexOf(`${QR.questionId}`) > -1);
  }

  quizResult() {
    const quizzes = Object.keys(this.props.quizResults);
    return quizzes.reduce((score, quiz) => {
      if (this.props.quizResults[quiz] === "yes") {
        score += 1;
      }
      return score;
    }, 0);
  }

  downloadPDF(e) {
    e.preventDefault();
    e.stopPropagation();

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
          <a href="" onClick={e => this.downloadPDF(e)}>
            Download
          </a>{" "}
          a full list of recommendations in PDF format and keep it close at
          hand. For more information about disaster preparedness and building
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
          Dan Saltzman
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
  quizResults: PropTypes.objectOf(PropTypes.string)
};

const mapStateToProps = ({ form }) => ({ quizResults: form.Quiz.values });

export default connect(
  mapStateToProps,
  null
)(Summary);
