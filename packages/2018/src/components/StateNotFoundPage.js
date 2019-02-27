import React from 'react';
import { Link } from 'react-router';

const capitalize = str => str.length && str.split(' ')
  .reduce((full, word) => `${full} ${word[0].toUpperCase() + word.substring(1)}`, '');

const StateNotFoundPage = ({ params }) => (
  <div>
    <h1>There are no stories for {capitalize(params.state)}</h1>
    <p>Do you want to check out <Link to="/cities/portland">the Portland, OR collection?</Link></p>
  </div>
);

StateNotFoundPage.displayName = 'StateNotFoundPage';

export default StateNotFoundPage;
