import React from 'react';
import StoryCard from '@hackoregon/component-library/lib/StoryCard/StoryCard';
import LeafletMap from '@hackoregon/component-library/lib/LeafletMap/LeafletMap';
import { Marker, Popup } from 'react-leaflet';

const portland = [45.52, -122.67];

const Map = () => (
  <StoryCard title="Have a Map" collectionId="emergency-response" cardId="er-map">
    <p className="Description">
        Here&apos;s a map!
    </p>
    <LeafletMap>
      <Marker position={portland}>
        <Popup>
          <span>A pretty CSS3 popup.<br />Easily customizable.</span>
        </Popup>
      </Marker>
    </LeafletMap>
  </StoryCard>
  );
