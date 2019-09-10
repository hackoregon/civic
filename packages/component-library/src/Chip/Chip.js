// eslint-disable-next-line import/no-extraneous-dependencies
import React from "react";
import PropTypes from "prop-types";
import MaterialChip from "@material-ui/core/Chip";
import { makeStyles } from "@material-ui/styles";
import Label from "@material-ui/icons/Label";

const useStyles = makeStyles({
  tag: props => ({
    color: props.color
  })
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
