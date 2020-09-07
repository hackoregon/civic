/* eslint-disable import/prefer-default-export */
/** @jsx jsx */
import { jsx } from "@emotion/core";
import PropTypes from "prop-types";
import MaterialDialogTitle from "@material-ui/core/DialogTitle";
import MaterialDialog from "@material-ui/core/Dialog";
import { generate } from "shortid";
import { ThemeProvider } from "@material-ui/styles";
import { MaterialTheme } from "@hackoregon/ui-themes";

const titleId = generate();

/**
 * A Dialog component that uses MaterialUI under the hood
 */
export const Dialog = ({ title, showTitle, open, onClose, children }) => (
  <ThemeProvider theme={MaterialTheme}>
    <MaterialDialog onClose={onClose} aria-labelledby={titleId} open={open}>
      {title && showTitle && (
        <MaterialDialogTitle id={titleId}>{title}</MaterialDialogTitle>
      )}
      {children}
    </MaterialDialog>
  </ThemeProvider>
);

Dialog.propTypes = {
  /** A title is used by screen readers */
  title: PropTypes.string.isRequired,
  showTitle: PropTypes.bool,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.node
};

Dialog.defaultProps = {
  showTitle: true
};

Dialog.displayName = "Dialog";
