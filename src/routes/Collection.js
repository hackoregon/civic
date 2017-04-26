import React from 'react';
// import LeafletMap from '@hackoregon/component-library/lib/LeafletMap/LeafletMap';
import CollectionHero from '@hackoregon/component-library/lib/Hero/CollectionHero';
import isClient from '@hackoregon/component-library/lib/utils/isClient';

const currentProjects = {
  housing: {
    title: 'Housing',
    featuredTag: 'housing prices',
  },
  emergency_response: {
    title: 'Emergency Response',
    featuredTag: 'er visits',
  },
};

const boundsMapProps = {
  width: 400,
  height: 300,
  bounds: [
    [45.654527, -122.464291],
    [45.431897, -122.836892],
  ],
};
// const portland = [45.54362, -122.676482];

const Collection = (props) => {
  const key = props.params.id;
  // console.log('is it fun yet', isClient);
  if (isClient) require('@hackoregon/component-library/assets/leaflet.css');
  return (
    <div>
      <CollectionHero
        collectionId={key}
        title={currentProjects[key].title}
        featuredTag={currentProjects[key].featuredTag}
      />

    </div>
  );
};
export default Collection;
