/* TODO: Fix linting errors */
/* eslint-disable */

import React from "react";
import { rangeRight } from "lodash";
import { Dropdown } from "@hackoregon/ui-core";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];

const createMonths = (minDate, maxDate) => {
  const minMonth = minDate.slice(0, 3);
  const maxMonth = maxDate.slice(0, 3);
  const minYear = minDate.slice(-4);
  const maxYear = maxDate.slice(-4);
  const years = rangeRight(+minYear, +maxYear + 1);
  const minMonths = months.slice(months.indexOf(minMonth));
  const maxMonths = months.slice(0, months.indexOf(maxMonth) + 1);

  const monthOptions = years
    .map((year, index, arr) => {
      let monthYears;
      if (index === 0) {
        monthYears = maxMonths.map(month => month + year).reverse();
      } else if (index === arr.length - 1) {
        monthYears = minMonths.map(month => month + year).reverse();
      } else {
        monthYears = months.map(month => month + year).reverse();
      }
      return monthYears;
    })
    .reduce((a, b) => a.concat(b), []);

  return monthOptions;
};

const dateHelper = (meta = {}) => {
  let dates = [];
  if (meta.dates && meta.dates.date_granularity !== null) {
    if (meta.dates.date_granularity.toLowerCase() === "year") {
      dates = rangeRight(+meta.dates.min_date, +meta.dates.max_date + 1).map(
        String
      );
    }
    if (meta.dates.date_granularity.toLowerCase() === "decade") {
      dates = rangeRight(
        +meta.dates.min_date,
        +meta.dates.max_date + 1,
        10
      ).map(String);
    }
    if (meta.dates.date_granularity.toLowerCase() === "month") {
      dates = createMonths(meta.dates.min_date, meta.dates.max_date);
    }
    return dates.map(date => ({
      label: date,
      value: date
    }));
  }
  return [
    meta.dates
      ? {
          label: meta.dates.default_date_filter,
          value: meta.dates.default_date_filter
        }
      : {}
  ];
};

class DateDropdown extends React.Component {
  constructor(props) {
    super();
    this.state = {
      date: props.selectedSlideData.slide_meta
        ? props.selectedSlideData.slide_meta.dates.default_date_filter
        : ""
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = date => {
    this.setState({ date });
    this.props.fetchSlideByDate(this.props.slide, date, this.props.type);
  };

  render() {
    const options = dateHelper(this.props.selectedSlideData.slide_meta);
    return (
      <Dropdown
        value={this.state.date}
        options={options}
        simpleValue
        onChange={this.handleChange}
        placeholder="Please select a date"
      />
    );
  }
}

export default DateDropdown;
