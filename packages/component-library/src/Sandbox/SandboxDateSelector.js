import React from 'react';
import { rangeRight } from 'lodash';
import Dropdown from '../Dropdown/Dropdown';

const dateHelper = (meta) => {
  let dates = [];
  if (meta.dates) {
    if (meta.dates.date_granularity.toLowerCase() === 'year') {
      dates = rangeRight(+meta.dates.min_date, +meta.dates.max_date + 1);
    }
    if (meta.dates.date_granularity.toLowerCase() === 'decade') {
      dates = rangeRight(meta.dates.min_date, meta.dates.max_date, 10);
    }
    return dates.map(date => ({
      label: date,
      value: date,
    }));
  }
  return [];
};

class DateDropdown extends React.Component {
  constructor(props) {
    super();
    this.state = {
      date: props.selectedSlideData.slide_meta ? props.selectedSlideData.slide_meta.dates.default_date_filter : '',
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange = (date) => {
    this.setState({ date });
    this.props.fetchSlideByDate(this.props.slide, date);
  }
  render() {
    return (<Dropdown
      value={this.state.date}
      options={dateHelper(this.props.selectedSlideData.slide_meta)}
      simpleValue
      onChange={this.handleChange}
    />);
  }
}

export default DateDropdown;
