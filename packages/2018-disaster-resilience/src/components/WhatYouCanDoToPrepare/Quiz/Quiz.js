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
    e.preventDefault();
    e.stopPropagation();

    if (this.state.questionId < this.totalQuestions) {
      this.setState({ questionId: this.state.questionId + 1 });
    }
  }

  back(e) {
    e.preventDefault();
    e.stopPropagation();

    if (
      this.state.questionId > 1 &&
      this.state.questionId <= this.totalQuestions
    ) {
      this.setState({ questionId: this.state.questionId - 1 });
    }
  }

  render() {
    return (
      <QuestionForm
        next={e => this.next(e)}
        back={e => this.back(e)}
        questionId={this.state.questionId}
        done={this.props.done}
      />
    );
  }
}

Quiz.propTypes = {
  done: PropTypes.func.isRequired
};

export default Quiz;
