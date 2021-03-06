// eslint-disable-next-line import/no-extraneous-dependencies
import React from "react";
import PropTypes from "prop-types";
import MaterialChip from "@material-ui/core/Chip";
import { makeStyles } from "@material-ui/styles";
import Label from "@material-ui/icons/Label";
import { BrandColors } from "..";

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

function Chip({ tag, color, clickable }) {
  const classes = useStyles({ color });
  return (
    <MaterialChip
      label={`#${tag}`}
      icon={<Label className={classes.tag} />}
      size="small"
      clickable={clickable}
      className={classes.chip}
    />
  );
}

Chip.propTypes = {
  tag: PropTypes.string,
  color: PropTypes.string,
  clickable: PropTypes.bool
};

export default Chip;
