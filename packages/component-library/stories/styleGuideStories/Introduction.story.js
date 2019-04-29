import React from "react";
import { storybookStyles } from "../storyStyles";

/*
  TODO
        Add links to Button story example.
*/

const Introduction = () => (
  <div style={storybookStyles.main}>
    <h1>Introduction to CIVIC&apos;s Storybook</h1>
    <p>Our Storybook shows how to use the CIVIC platform.</p>
    <p>It has a style guide and the platform components.</p>
    <p>Contributions to the CIVIC platform are welcome.</p>
    <h2>Development</h2>
    <p>
      Component stories are in the /stories directory. They show a state of one
      or more UI components. (Basically a story is like a visual test case.)
    </p>
    <p>See these sample stories for a component called Button.</p>
    <p>
      You can add your own components as stories. You can also edit those
      components and see changes right away. Try editing the Button component.
    </p>
    <p>
      Our Storybook is iterative and will be updated as the CIVIC Platform
      continues to grow. Please reach out to us in the SLACK #team_design
      channel with any questions about usage or suggestions for improving the
      stories.
    </p>
  </div>
);

export default Introduction;
