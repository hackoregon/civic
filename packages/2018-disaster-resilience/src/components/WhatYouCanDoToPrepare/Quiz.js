import React, { Component } from 'react';
import { Button } from '@hackoregon/component-library';
import { Questions, Recommendations } from './Questions'
import Question from './Question'
import Recommendation from './Recommendation'
import Answer from './Answer'

class Quiz extends Component {

  constructor(props) {
    super(props);
    this.state = {
      step: 0,
      answer: '',
      score: 0,
    };

    this.Pages = Questions.length;
  }

  next(e) {
    e.preventDefault();
    e.stopPropagation();

    if (this.state.step < this.Pages - 1) {
      this.setState({ step: this.state.step + 1 });
    }
  }

  back(e) {
    e.preventDefault();
    e.stopPropagation();

    if (this.state.step > 0 && this.state.step <= this.Pages) {
      this.setState({ step: this.state.step - 1 });
    }
  }

  selectAnswer(e) {
    const answer = e.target.value;
    this.setState({ answer });
  }

  getQuestion() {
    return Questions[this.state.step].question;
  }

  getRecommendation() {
    return Recommendations[this.state.step].recommendation;
  }

  render() {
    return (
      <div>
        <Question question={this.getQuestion()}/>
        <Answer answer={this.state.answer} selectAnswer={(e) => this.selectAnswer(e)}/>
        <Recommendation recommendation={this.getRecommendation()}/>

        <Button onClick={e => this.back(e)}>
          Back
        </Button>
        <Button onClick={e => this.next(e)}>
          Next
        </Button>
      </div>
    );
  }
}

export default Quiz;
