import "@hackoregon/component-library/assets/global.styles.css";
import "rc-slider/assets/index.css";
import "react-select/dist/react-select.css";

import React from "react";
import styled from "styled-components";
import CardCollection from "../CardCollection";

const Container = styled.div`
  min-height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  font-family: Arial, sans-serif;
`;

function App() {
  return (
    <Container>
      <CardCollection />
    </Container>
  );
}

App.displayName = "App";

export default App;
