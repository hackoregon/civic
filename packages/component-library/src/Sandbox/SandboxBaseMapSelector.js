import React from "react";
import { css } from "emotion";

const baseMapMenu = css(`
  position: absolute;
  background: #fff;
  padding: 10px;
  bottom: 0;
  right: 0;
  z-index: 4;
  font-family: "Roboto Condensed",, sans-serif;
`);

class SandboxBaseMapSelector extends React.Component {
  constructor(props) {
    super();
    this.state = {
      baseMapStyle: "light"
    };
    this.handleBaseMapStyleChange = this.handleBaseMapStyleChange.bind(this);
  }

  handleBaseMapStyleChange = baseMapStyleChangeEvent => {
    console.log(baseMapStyleChangeEvent.target.value);
    this.setState({
      baseMapStyle: baseMapStyleChangeEvent.target.value
    });
  };

  render() {
    return (
      <>
        <div className={baseMapMenu}>
          <form>
            <radiogroup>
              <input
                checked={this.state.baseMapStyle === "light"}
                id="styles/hackoregon/cjiazbo185eib2srytwzleplg"
                type="radio"
                value="light"
                onChange={this.handleBaseMapStyleChange}
              />
              <label for="light">Light</label>
              <input
                checked={this.state.baseMapStyle === "dark"}
                id="mapbox://styles/mapbox/dark-v10"
                type="radio"
                value="dark"
                onChange={this.handleBaseMapStyleChange}
              />
              <label for="dark">Dark</label>
            </radiogroup>
          </form>
        </div>
      </>
    );
  }
}

export default SandboxBaseMapSelector;
