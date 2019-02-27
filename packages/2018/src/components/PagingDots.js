import React from 'react';

const civicCategoricalColor1 = "#DC4556";
const civicCategoricalColor2 = "#19B7AA";
const civicCategoricalColor3 = "#1E62BD";
const civicCategoricalColor4 = "#721D7C";
const civicCategoricalColor5 = "#FFB226";

const colors = [
  civicCategoricalColor1,
  civicCategoricalColor2,
  civicCategoricalColor3,
  civicCategoricalColor4,
  civicCategoricalColor5,
];

export default class PagingDots extends React.Component {
  getIndexes(count, inc) {
    const arr = [];
    for (let i = 0; i < count; i += inc) {
      arr.push(i);
    }
    return arr;
  }

  getListStyles() {
    return {
      position: 'relative',
      margin: 0,
      top: 26,
      padding: 0
    };
  }

  getListItemStyles() {
    return {
      listStyleType: 'none',
      display: 'inline-block'
    };
  }

  getButtonStyles(index, active) {
    return {
      border: 0,
      background: 'transparent',
      color: colors[index],
      cursor: 'pointer',
      padding: 10,
      outline: 0,
      fontSize: 24,
      opacity: active ? 1 : 0.5,
    };
  }

  render() {
    const indexes = this.getIndexes(
      this.props.slideCount,
      this.props.slidesToScroll
    );
    return (
      <ul style={this.getListStyles()}>
        {indexes.map(index => {
          return (
            <li style={this.getListItemStyles()} key={index}>
              <button
                style={this.getButtonStyles(index, this.props.currentSlide === index)}
                onClick={this.props.goToSlide.bind(null, index)}
              >
                &bull;
              </button>
            </li>
          );
        })}
      </ul>
    );
  }
}
