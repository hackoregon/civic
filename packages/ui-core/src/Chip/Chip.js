/* eslint-disable import/prefer-default-export */
// eslint-disable-next-line import/no-extraneous-dependencies
import React from "react";
import PropTypes from "prop-types";
import MaterialChip from "@material-ui/core/Chip";
import { makeStyles } from "@material-ui/styles";
import Label from "@material-ui/icons/Label";
import { BrandColors } from "@hackoregon/ui-themes";

const { secondary } = BrandColors;

const useStyles = makeStyles({
  tag: props => {
    const style = {};
    if (props.color) {
      style.color = props.color;
    } else {
      style.color = secondary.hex;
    }
    return style;
  },
  chip: {
    margin: "3px"
  }
});

export function Chip({ tag, color, clickable, onClick, onDelete, size }) {
  const classes = useStyles({ color });
  return (
    <MaterialChip
      label={`#${tag}`}
      icon={<Label className={classes.tag} />}
      size={size}
      clickable={clickable}
      className={classes.chip}
      onClick={onClick}
      onDelete={onDelete}
    />
  );
}

Chip.propTypes = {
  tag: PropTypes.string,
  color: PropTypes.string,
  clickable: PropTypes.bool,
  onClick: PropTypes.func,
  onDelete: PropTypes.func,
  size: PropTypes.oneOf(["small", "medium"])
};

Chip.defaultProps = {
  size: "small",
  clickable: false
};

Chip.displayName = Chip;
