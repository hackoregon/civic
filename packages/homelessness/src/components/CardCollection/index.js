import React from 'react';
import Definition from '../Definition';
import HomelessPopulation from '../HomelessPopulation';
import Migration from '../Migration';
import UnaccompaniedYouth from '../UnaccompaniedYouth';
import Women from '../Women';
import Services211 from '../Services211';

const style = {
  maxWidth: '800px',
  margin: '0 auto',
};

const CardCollection = () => (
  <div style={style}>
    <Definition />
    <HomelessPopulation />
    <Migration />
    <UnaccompaniedYouth />
    <Women />
    <Services211 />
  </div>
);

export default CardCollection;
