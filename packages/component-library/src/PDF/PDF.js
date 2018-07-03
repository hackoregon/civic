import React from 'react';

const PDF = ({ url }) => (
  <object data={url} type="application/pdf" width="600" height="500">
    <a href={url}>{url}</a>
  </object>
);

PDF.displayName = 'PDF';

PDF.propTypes = {
  url: React.PropTypes.string,
};

export default PDF;
