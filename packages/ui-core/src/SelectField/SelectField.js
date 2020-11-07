/* eslint-disable react/prop-types */
/* eslint-disable import/prefer-default-export */
import React from "react"; // eslint-disable-line no-unused-vars
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { isEmpty } from "lodash";
import { generate } from "shortid";

/**
 *
 * If a simple array, ['OR','WA','CA'], is passed to options.values
 * then the value and label will be set the same. To specify a differnt
 * label and value use the following format.
 *
 *  usStates:{
 *   option: {
 *     values: [
 *       {value: "OR", label: "Oregon State"},
 *       {value: 'WA', label: 'Washington State'},
 *     ],
 *   }
 *  }
 *  usCities:{
 *   option: {
 *     limitByField: "usaState",       //Dynamic options based on the usStates field
 *     limitByValues:{
 *       "OR":["portland", "salem"],  //When 'OR' is selected in state show these options
 *       "WA":["vancouver", "seattle"]
 *
 *     }
 *     values: [
 *       {value: "portland", label: "Portland"},
 *       {value: "vancouver", label: "Vancouver"},
 *       {value: "seatte", label: "Seattle"},
 *       {value: "salem", label: "Salem"},
 *     ],
 *   }
 *  }
 *
 */

const useStyles = makeStyles(() => ({
  root: {
    display: "block !important",
    padding: "5px !important"
  }
}));

export const SelectField = ({ id, label, options, formik, isRequired }) => {
  const classes = useStyles();
  let optionValues = options.values;

  if (options.values && !options.values[0].value) {
    optionValues = options.values.map(x => ({ value: x, label: x }));
  }
  if (
    options.limitByField &&
    options.limitByValues &&
    !isEmpty(formik.values[options.limitByField])
  ) {
    const includeValues =
      options.limitByValues[formik.values[options.limitByField]];
    optionValues = optionValues.filter(
      x => includeValues.indexOf(x.value) !== -1
    );
    // Default to empty string if value is not in list
    if (
      !optionValues.some(e => e.value === formik.values[id]) &&
      formik.values[id] !== ""
    ) {
      // eslint-disable-next-line no-param-reassign
      formik.values[id] = "";
    }
  }
  return (
    <TextField
      required={isRequired}
      select
      SelectProps={{
        native: true
      }}
      InputLabelProps={{ shrink: true }}
      id={id}
      label={label}
      helperText={formik.touched[id] ? formik.errors[id] : ""}
      error={formik.touched[id] && Boolean(formik.errors[id])}
      value={formik.values[id] || ""}
      onChange={formik.handleChange}
      onBlur={() => {
        // eslint-disable-next-line no-param-reassign
        formik.touched[id] = true;
        formik.handleBlur(id);
      }}
      inputProps={{
        name: id,
        id
      }}
      fullWidth
    >
      <option value="" key="" disabled>
        Select option
      </option>
      {optionValues.map(option => (
        <option value={option.value} key={generate()} className={classes.root}>
          {option.label}
        </option>
      ))}
    </TextField>
  );
};
SelectField.propTypes = {
  id: PropTypes.string,
  isRequired: PropTypes.bool,
  label: PropTypes.string,
  options: PropTypes.shape({
    limitByField: PropTypes.string,
    // eslint-disable-next-line consistent-return
    limitByValues(props, propName) {
      if (props.limitByField !== undefined && props[propName] === undefined) {
        return new Error(
          "limitByValues array is required when limitByField is set"
        );
      }
    },
    values: PropTypes.array
  }),
  formik: PropTypes.shape({})
};

SelectField.displayName = "SelectField";
