import React from 'react';

const PDF = ({ url }) => (
  <object data={url} type="application/pdf" width="600" height="500">
    <embed src={url} width="600px" height="500px">
      <p>This browser does not support PDFs. Please download the PDF to view it:
        <a href={url}>Download PDF</a>.
      </p>
    </embed>
  </object>
);

PDF.displayName = 'PDF';

PDF.propTypes = {
  url: React.PropTypes.string,
};

export default PDF;
