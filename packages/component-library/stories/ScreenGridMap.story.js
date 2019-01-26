import React from 'react';
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/react';
import { withKnobs, number, selectV2 } from '@storybook/addon-knobs';
import { checkA11y } from '@storybook/addon-a11y';
import { BaseMap } from '../src';
import { ScreenGridMap } from '../src';
import * as d3 from 'd3';

const displayName = ScreenGridMap.displayName || 'ScreenGridMap';

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

const mapboxToken = 'pk.eyJ1IjoiaGFja29yZWdvbiIsImEiOiJjamk0MGZhc2cwNDl4M3FsdHAwaG54a3BnIn0.Fq1KA0IUwpeKQlFIoaEn_Q';

export default () => storiesOf('Maps/Screen Grid Map', module)
  .addDecorator(withKnobs)
  .addDecorator(checkA11y)
  .add('Simple usage', () => (
    <LoadData url='https://opendata.arcgis.com/datasets/a990260e73de4c4e8c7e2c47fe172835_50.geojson'>
      {
        data => {
          if (data.features === null) { return null }

          const optionsStyle = {
            'Hack Oregon Light': 'mapbox://styles/hackoregon/cjiazbo185eib2srytwzleplg',
            'Hack Oregon Dark': 'mapbox://styles/hackoregon/cjie02elo1vyw2rohd24kbtbd',
            'Scenic': 'mapbox://styles/themendozaline/cj8rrlv4tbtgs2rqnyhckuqva',
            'Navigation Guidance Night': 'mapbox://styles/themendozaline/cj6y6f5m006ar2sobpimm7ay7',
            'Lè Shine': 'mapbox://styles/themendozaline/cjg6296ub04ot2sqv9izku3qq',
            'North Star': 'mapbox://styles/themendozaline/cj5oyewyy0fg22spetiv0hap0',
            'Odyssey': 'mapbox://styles/themendozaline/cjgq6rklb000d2so1b8myaait',
          };
          const mapboxStyle = selectV2('Mapbox Style', optionsStyle, optionsStyle['Hack Oregon Light']);

          const opacityOptions = {
            range: true,
            min: 0,
            max: 1,
            step: 0.05,
          };
          const opacity = number('Opacity:', 0.8, opacityOptions);

          const colorSchemeOptions = {
            'Thermal': '[[255,237,160],[254,217,118],[254,178,76],[253,141,60],[252,78,42],[227,26,28],[189,0,38],[128,0,38]]',
            'Planet': '[[231,225,239],[212,185,218],[201,148,199],[223,101,176],[231,41,138],[206,18,86],[152,0,67],[103,0,31]]',
            'Space': '[[224,236,244],[191,211,230],[158,188,218],[140,150,198],[140,107,177],[136,65,157],[129,15,124],[77,0,75]]',
            'Earth': '[[236,226,240],[208,209,230],[166,189,219],[103,169,207],[54,144,192],[2,129,138],[1,108,89],[1,70,54]]',
            'Ocean': '[[237,248,177],[199,233,180],[127,205,187],[65,182,196],[29,145,192],[34,94,168],[37,52,148],[8,29,88]]',
          };
          const colorScheme = selectV2('Color Scheme:', colorSchemeOptions, colorSchemeOptions['Planet']);
          const colorSchemeArray = JSON.parse(colorScheme);

          const cellSizeOptions = {
            range: true,
            min: 1,
            max: 100,
            step: 1,
          };
          const cellSize = number('Cell Size:', 15, cellSizeOptions);

          return (
            <BaseMap
              mapboxToken={mapboxToken}
              mapboxStyle={mapboxStyle}
            >
              <ScreenGridMap
                data={data.features}
                getPosition={f => f.geometry.coordinates}
                opacity={opacity}
                colorRange={colorSchemeArray}
                cellSizePixels={cellSize}
              />
            </BaseMap>
          );
      }}
    </LoadData>
  ));
