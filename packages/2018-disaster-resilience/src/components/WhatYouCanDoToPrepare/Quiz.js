import React, { Component } from 'react';
import { Button } from '@hackoregon/component-library';
import QRMap from './QR';
import Question from './Question';
import Recommendation from './Recommendation';
import Answer from './Answer';
import Footer from './Footer';

class Quiz extends Component {

  constructor(props) {
    super(props);
    this.state = {
      questionId: 1,
      answer: '',
      score: 0,
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

    if (this.state.questionId > 1 && this.state.questionId <= this.totalQuestions) {
      this.setState({ questionId: this.state.questionId - 1 });
    }
  }

  selectAnswer(e) {
    const answer = e.target.value;
    this.setState({ answer });
  }

  render() {
    const QR = QRMap.find(d => d.questionId === this.state.questionId);
    const question = QR.question;
    const recommendation = QR.recommendation;

    return (
      <section>
        <Question question={question} questionId={this.state.questionId} />
        <Answer answer={this.state.answer} selectAnswer={e => this.selectAnswer(e)} />
        <Recommendation recommendation={recommendation} />
        <Footer back={e => this.back(e)} next={e => this.next(e)} />
      </section>
    );
  }
}

export default Quiz;
