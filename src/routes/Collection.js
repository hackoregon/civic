import React from 'react';
import CollectionHero from '@hackoregon/component-library/lib/Hero/CollectionHero';

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

const Collection = (props) => {
  const key = props.params.id;
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
