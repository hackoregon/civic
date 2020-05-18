import PropTypes from "prop-types";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";

const pdfClass = css`
  width: 100%;
  height: 700px;
`;

const PDF = ({ url }) => (
  <object css={pdfClass} data={url} type="application/pdf">
    <a href={url}>{url}</a>
  </object>
);

PDF.displayName = "PDF";

PDF.propTypes = {
  url: PropTypes.string
};

PDF.defaultProps = {
  url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
};

export default PDF;
