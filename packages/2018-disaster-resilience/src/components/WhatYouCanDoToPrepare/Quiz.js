import React, { Component } from 'react';
import { Button } from '@hackoregon/component-library';
import { Questions, Recommendations } from './Questions'

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
        <div>{this.getQuestion()}</div>

        <form>
          <div className="radio">
            <label>
              <input
                type="radio"
                value="yes"
                checked={this.state.answer === 'yes'}
                onChange={e => this.selectAnswer(e)}
              />
              Yes
            </label>
          </div>
          <div className="radio">
            <label>
              <input
                type="radio"
                value="no"
                checked={this.state.answer === 'no'}
                onChange={e => this.selectAnswer(e)}
              />
              No
            </label>
          </div>
        </form>

        <div>{this.getRecommendation()}</div>

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
