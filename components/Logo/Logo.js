import React from 'react';

if (typeof require.ensure !== 'function') require.ensure = (d,c) => c(require);

const Logo = () => {
  const svg = require.ensure([], require => require('../../assets/civic-logo.svg'));
  
  return (
    <div>
    {svg}
    </div>
  );
  
}
  
export default Logo;