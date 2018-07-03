import React from 'react';
import { css } from 'emotion';

const pdfClass = css`
  width: 100%;
  height:calc(100vh - 70px);
`;

const PDF = ({ url }) => (
  <object className={pdfClass} data={url} type="application/pdf">
    <a href={url}>{url}</a>
  </object>
);

PDF.displayName = 'PDF';

PDF.propTypes = {
  url: React.PropTypes.string,
};

export default PDF;
