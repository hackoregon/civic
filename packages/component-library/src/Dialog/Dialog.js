/** @jsx jsx */
import { jsx } from "@emotion/core";
import PropTypes from "prop-types";
import MaterialDialogTitle from "@material-ui/core/DialogTitle";
import MaterialDialog from "@material-ui/core/Dialog";
import { generate } from "shortid";
import { ThemeProvider } from "@material-ui/styles";
import { MaterialTheme } from "../_Themes/index";

const titleId = generate();

const Dialog = ({ title, open, onClose, children }) => (
  <ThemeProvider theme={MaterialTheme}>
    <MaterialDialog onClose={onClose} aria-labelledby={titleId} open={open}>
      {title && <MaterialDialogTitle id={titleId}>{title}</MaterialDialogTitle>}
      {children}
    </MaterialDialog>
  </ThemeProvider>
);

Dialog.propTypes = {
  title: PropTypes.string,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.node
};

Dialog.displayName = "Dialog";

export default Dialog;
