/* eslint-disable no-console */
import React from 'react';
/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/react';
import 'react-select/dist/react-select.css';

import { withInfo } from '@storybook/addon-info';
import { withKnobs, number, selectV2, boolean } from '@storybook/addon-knobs';
import { Sandbox } from '../src';

const mapboxToken = 'pk.eyJ1IjoidGhlbWVuZG96YWxpbmUiLCJhIjoiY2o1aXdoem1vMWtpNDJ3bnpqaGF1bnlhNSJ9.sjTrNKLW9daDBIGvP3_W0w';
class SandboxStory extends React.Component {
  constructor() {
    super();
    this.state = {
      data: {
        packages: {},
        foundations: {},
        slides: {},
      },
      hasFetched: false,
    };
  }
  componentDidMount() {
    fetch('https://sandbox.civicpdx.org/civic-sandbox').then(res => res).then(res => res.json()).then(data => this.setState({ data: data.body, hasFetched: true }));
  }
  render() {
    console.log(this.state);
    return this.state.hasFetched ? (
      <Sandbox data={this.state.data} mapboxToken={mapboxToken} selectedPackage="Evictions" />
    ) : null;
  }
}

export default () => storiesOf('Sandbox', module)
.add('sandbox', () => (<SandboxStory />));
