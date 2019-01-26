import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, selectV2, number, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { HexOverlay } from '../src';
import DeckGLOverlay from '../src/HexOverlay/hex-deckgl-overlay';
import MapGL from 'react-map-gl';
import { BaseMap } from '../src';
import { checkA11y } from '@storybook/addon-a11y';
import { MapTooltip } from '../src';
import * as d3 from 'd3';

class LoadData extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      error: null,
    };
  }

  componentDidMount() {
    let cmp = this;
    d3.json(this.props.url, (error, data) => {
      if (error) { return this.setState({error: error})}
      cmp.setState({data: data});
    });
  }
  render() {
    if (this.state.data === null) { return null }
    return this.props.children(this.state.data);
  }
}

const displayName = HexOverlay.displayName || 'HexOverlay';

const mapboxToken = 'pk.eyJ1IjoidGhlbWVuZG96YWxpbmUiLCJhIjoiY2o1aXdoem1vMWtpNDJ3bnpqaGF1bnlhNSJ9.sjTrNKLW9daDBIGvP3_W0w';

const optionsStyle = {
  'Lè Shine': 'mapbox://styles/themendozaline/cjg6296ub04ot2sqv9izku3qq',
  'Label Maker': 'mapbox://styles/themendozaline/cjg627xuw08mk2spjsb8jmho7',
  'Moonlight': 'mapbox://styles/themendozaline/cjgq6r2lg00072rmqj1wocgdq',
  'Navigation Guidance Night': 'mapbox://styles/themendozaline/cj6y6f5m006ar2sobpimm7ay7',
  'North Star': 'mapbox://styles/themendozaline/cj5oyewyy0fg22spetiv0hap0',
  'Odyssey': 'mapbox://styles/themendozaline/cjgq6rklb000d2so1b8myaait',
  'Scenic': 'mapbox://styles/themendozaline/cj8rrlv4tbtgs2rqnyhckuqva',
}

const coverageOptions = {
  range: true,
  min: 0,
  max: 1,
  step: 0.05,
};

const opacityOptions = {
  range: true,
  min: 0,
  max: 1,
  step: 0.05,
};

const radiusOptions = {
  range: true,
  min: 1,
  max: 1000,
  step: 0.1,
}

const elevationOptions = {
  range: true,
  min: 1,
  max: 50,
  step: 1,
};

const colorRange = [
  [1, 152, 189],
  [73, 227, 206],
  [216, 254, 181],
  [254, 237, 177],
  [254, 173, 84],
  [209, 55, 78]
];

const lightSettings = {
  lightsPosition: [-0.144528, 49.739968, 8000, -3.807751, 54.104682, 8000],
  ambientRatio: 0.4,
  diffuseRatio: 0.6,
  specularRatio: 0.2,
  lightsStrength: [0.8, 0.0, 0.8, 0.0],
  numberOfLights: 2
};

export default () => storiesOf('Maps/Hex Overlay', module)
  .addDecorator(checkA11y)
  .addDecorator(withKnobs)
  .add('With tooltip', () => (
    <LoadData url='https://gist.githubusercontent.com/jasonleonhard/0ff6238d0a26ff5fd029225538734f81/raw/549a4bb2cc3a343d78b8a4486d30fd959ab908df/gistfile1.txt'>
      {
        data => {
          if (data.features === null) { return null }

          const optionsStyle = {
            'Lè Shine': 'mapbox://styles/themendozaline/cjg6296ub04ot2sqv9izku3qq',
            'Label Maker': 'mapbox://styles/themendozaline/cjg627xuw08mk2spjsb8jmho7',
            'Moonlight': 'mapbox://styles/themendozaline/cjgq6r2lg00072rmqj1wocgdq',
            'Navigation Guidance Night': 'mapbox://styles/themendozaline/cj6y6f5m006ar2sobpimm7ay7',
            'North Star': 'mapbox://styles/themendozaline/cj5oyewyy0fg22spetiv0hap0',
            'Odyssey': 'mapbox://styles/themendozaline/cjgq6rklb000d2so1b8myaait',
            'Scenic': 'mapbox://styles/themendozaline/cj8rrlv4tbtgs2rqnyhckuqva',
          }

          const strokeWidthOptions = {
             range: true,
             min: 0,
             max: 100,
             step: 1,
          };

          const opacityOptions = {
             range: true,
             min: 0,
             max: 1,
             step: 0.05,
          };

          const elevationOptions = {
             range: true,
             min: 1,
             max: 50,
             step: 1,
          };

          const coverage = number('Coverage:', 0.8, coverageOptions);
          const opacity = number('Opacity:', 0.8, opacityOptions);
          const radius = number('Radius', 500, radiusOptions);
          const elevation = number('Elevation:', 10, elevationOptions);
          const extruded = boolean('Extruded:', true);
          const filled = boolean('Filled:', true);
          const wireframe = boolean('Wireframe:', true);

          const mapboxStyle = selectV2('Mapbox Style', optionsStyle, optionsStyle['Label Maker']);

          return (
            <BaseMap
              mapboxToken={mapboxToken}
              mapboxStyle={mapboxStyle}
            >
              <HexOverlay
                data={data.features}
                opacity={opacity}
                coverage={coverage}
                radius={radius}
                elevation={elevation}
                colorRange={colorRange}
                lightSettings={lightSettings}
                filled={filled}
                wireframe={wireframe}
              >
                <MapTooltip isHex={true} />
                <LoadData/>
              </HexOverlay>
            </BaseMap>
          );
      }}
    </LoadData>
  ));

  /*
  TODO: hard coded mapboxToken for ease for now: best practice to use env vars from .env named REACT_APP_...
  const MAPBOX_TOKEN = process.env.MapboxAccessToken; // eslint-disable-line

  TODO: knobs start by showing unuseful info that upon click disapears, ideally it would never appear

  TODO: while implimenting a d3 fetch to remove the enormous json file aka
    import data from '../src/HexOverlay/bikeParkingAreaPoints.json';
  I noticed the following console error on hover
      request.js:117 GET http://localhost:6006/undefined 404 (Not Found)
  */
