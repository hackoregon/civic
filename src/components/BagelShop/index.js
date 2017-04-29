import React, { Component } from 'react';
import ReactPlayer from 'react-player';

class BagelShop extends Component {
  render() {
    return (
      <ReactPlayer url='https://vimeo.com/215352687' playing loop/>
    );
  }
}

export default BagelShop;
