import React from "react";
import PropTypes from "prop-types";
import MaterialTextField from "@material-ui/core/TextField";

const TextField = ({
  id,
  name,
  label,
  type,
  helperText,
  error,
  value,
  onChange,
  onBlur,
  isRequired
}) => (
  <MaterialTextField
    required={isRequired}
    id={id}
    name={name}
    label={label}
    type={type}
    helperText={helperText}
    error={error}
    value={value}
    onChange={onChange}
    onBlur={onBlur}
    fullWidth
  />
);

TextField.propTypes = {
  id: PropTypes.string,
  isRequired: PropTypes.bool,
  name: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  helperText: PropTypes.string,
  error: PropTypes.bool,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func
};

export default TextField;
