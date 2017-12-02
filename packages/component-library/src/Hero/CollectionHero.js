import React from 'react';
import Hero from './Hero';
import Tag from '../Tag/Tag';
import Share from '../Share/ShareCollection';

const CollectionHero = props => (
  <Hero>
    <Tag name={props.featuredTag} />
    <h1>{props.title}</h1>
    <Share collectionId={props.collectionId} />
  </Hero>
);

export default CollectionHero;
