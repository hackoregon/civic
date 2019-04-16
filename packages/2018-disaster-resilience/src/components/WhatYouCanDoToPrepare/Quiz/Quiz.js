/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/no-unused-state */
import PropTypes from "prop-types";
import React, { Component } from "react";

import QRMap from "../QR";
import QuestionForm from "./QuestionForm";

class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionId: 1
    };

    this.totalQuestions = QRMap.length;
  }

  next(e) {
    const questionId = this.state;
    e.preventDefault();
    e.stopPropagation();

    if (questionId < this.totalQuestions) {
      this.setState({ questionId: questionId + 1 });
    }
  }

  back(e) {
    const questionId = this.state;
    e.preventDefault();
    e.stopPropagation();

    if (questionId > 1 && questionId <= this.totalQuestions) {
      this.setState({ questionId: questionId - 1 });
    }
  }

  render() {
    const questionId = this.state;
    const done = this.props;

    return (
      <QuestionForm
        next={e => this.next(e)}
        back={e => this.back(e)}
        questionId={questionId}
        done={done}
      />
    );
  }
}

Quiz.propTypes = {
  done: PropTypes.func.isRequired
};

export default Quiz;
