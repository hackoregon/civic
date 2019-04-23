import React from "react";
import { storybookStyles } from "../storyStyles.js";
//import { font-bold } from '../../assets/global.styles.js'

const AccessibilityGuidelines = () => (
  <div style={storybookStyles.main}>
    <h1>Accessibility</h1>
    <p>
      The CIVIC platform will meet all criteria specified in{" "}
      <a href="https://www.w3.org/TR/WCAG21/" target="_blank">
        Web Content Accessibility Guidelines (WCAG) 2.1
      </a>{" "}
      Level A and Level AA.
    </p>
    <h2>What types of disabilities do we need to account for?</h2>
    <h4>Visual</h4>
    <p>Blindness, low vision, and color-blindness.</p>
    <h4>Hearing</h4>
    <p>Deafness and hard-of-hearing.</p>
    <h4>Motor</h4>
    <p>
      Inability to use a mouse, slow response time, and limited fine motor
      control.
    </p>
    <h4>Cognitive</h4>
    <p>
      Learning disabilities, distractibility, and inability to remember or focus
      on large amounts of information.
    </p>

    <h2>What are the principles of the guidelines?</h2>
    <p>
      See{" "}
      <a href="https://www.w3.org/WAI/WCAG21/quickref/" target="_blank">
        How to Meet WCAG
      </a>{" "}
      for a quick reference on meeting the four principles of WCAG.
    </p>
    <h4>Perceivable</h4>
    <p>
      Information and user interface components must be presentable to users in
      ways they can perceive.
    </p>
    <p>
      It must be available to the senses, vision and hearing primarily, either
      through the browser or through assistive technologies, e.g., screen
      readers, screen enlargers, etc.
    </p>
    <h4>Operable</h4>
    <p>User interface components and navigation must be operable.</p>
    <p>
      Users can interact with all controls and interactive elements using either
      the mouse, keyboard, or an assistive device.
    </p>
    <h4>Understandable</h4>
    <p>Content is clear and limits confusion and ambiguity.</p>
    <p>
      Information and the operation of user interface must be understandable.
    </p>
    <h4>Robust</h4>
    <p>
      Content must be robust enough that it can be interpreted reliably by a
      wide variety of user agents, including assistive technologies.
    </p>

    <h2>Implementation Checklist</h2>
    <p>
      Implementation of the accessibility guidelines can be done using this
      order of priority. Considerations when proposing this order are the most
      common disabilities and the most common features in our user interfaces.
    </p>
    <h4>Color Theme</h4>
    <p>
      Meet contrast ratios between text and its background color and between
      colors used to represent distinct information in data visualization.
      WebAIM describes the guidelines and has many examples
      <a href="https://webaim.org/articles/contrast/" target="_blank">
        : WebAIM Contrast and Color Accessibility
      </a>
      .
    </p>
    <h4>Forms</h4>
    <p>
      See{" "}
      <a href="https://www.w3.org/WAI/tutorials/forms/" target="_blank">
        Web Accessibility Tutorials on Forms
      </a>
      . The following sections in the tutorials are especially relevant to the
      CIVIC platform.
    </p>
    <ol type="a">
      <li>Labels</li>
      <li>Groups</li>
      <li>Instructions</li>
      <li>Validating input</li>
      <li>User notifications</li>
      <li>Custom controls</li>
    </ol>
    <p>
      The Forms story has an example of a form that follows our styles and meets
      accessibility requirements.
    </p>
    <h4>Resize Text</h4>
    <p>Allow text to be increased in size and readable.</p>
    <h4>Images</h4>
    <p>Use alternative text with images.</p>

    <h4>Data Visualization</h4>
    <p>
      A good reference for meeting accessibility requirements in data
      visualizations:{" "}
      <a
        href="https://accessibility.digital.gov/visual-design/data-visualizations/"
        target="_blank"
      >
        Data Visualizations
      </a>
      .
    </p>
    <h4>Reading and Navigation Order</h4>
    <p>Logical and intuitive.</p>
    <h4>Keyboard Accessible</h4>
    <p>Navigation to all page elements is available using the keyboard.</p>
    <p>Keyboard commands reference: (placeholder).</p>

    <h2>What are the guidelines and who made them?</h2>
    <p>
      The{" "}
      <a href="https://www.w3.org/Consortium/" target="_blank">
        W3C (World Wide Web Consortium)
      </a>{" "}
      develops web standards; they are led by the Web inventor Tim Berners-Lee.
      One of their initiatives is the{" "}
      <a href="https://www.w3.org/WAI/" target="_blank">
        WAI (Web Accessibility Initiative)
      </a>
      , to improve accessibility of the Web for people with disabilities.
    </p>
    <p>
      The WAI is made up of several working groups and Special Interest groups.
      The most important working group is the{" "}
      <a href="https://www.w3.org/WAI/GL/" target="_blank">
        WCAG WG (Web Content Accessibility Guidelines Working Group)
      </a>
      . This group published{" "}
      <a href="https://www.w3.org/TR/WCAG21/" target="_blank">
        WCAG 2.1
      </a>
      ; their web site has many useful resources and materials.
    </p>
    <p>
      Another organization that does a good job of explaining accessibility and
      the guidelines is{" "}
      <a href="https://webaim.org" target="_blank">
        WebAIM
      </a>
      .
    </p>
  </div>
);

export default AccessibilityGuidelines;
