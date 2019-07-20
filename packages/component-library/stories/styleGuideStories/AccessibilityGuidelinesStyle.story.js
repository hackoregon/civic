import React from "react";
import { storybookStyles } from "../storyStyles";

const AccessibilityGuidelines = () => (
  <div style={storybookStyles.main}>
    <h1>Accessibility</h1>
    <p>
      The CIVIC platform aims to be radically inclusive. Towards that aim, we
      start by incorporating best practices in web accessibility, and build
      tools that allow us to participate and contribute in ways that truly
      appreciate our different abilities and perspectives.
    </p>
    <p>
      The CIVIC platform will meet all criteria specified in{" "}
      <a
        href="https://www.w3.org/TR/WCAG21/"
        target="_blank"
        rel="noopener noreferrer"
      >
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
      <a
        href="https://www.w3.org/WAI/WCAG21/quickref/"
        target="_blank"
        rel="noopener noreferrer"
      >
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
      <a
        href="https://webaim.org/articles/contrast/"
        target="_blank"
        rel="noopener noreferrer"
      >
        : WebAIM Contrast and Color Accessibility
      </a>
      .
    </p>
    <h4>Forms</h4>
    <p>
      See{" "}
      <a
        href="https://www.w3.org/WAI/tutorials/forms/"
        target="_blank"
        rel="noopener noreferrer"
      >
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
    <h5>Low vision</h5>
    <p>
      For people who are blind, include text descriptions of any meaningful
      images that can be read by assistive technology (screen readers). A person
      with low vision is still able to perceive visual insights with the help of
      accessibility features and considerations. Provide the opportunity to
      increase the size of elements and focus on particular areas by zooming and
      magnifying. Follow the WCAG 2.0 Level AA guidelines for contrast — high
      contrast is crucial to improve legibility. Body text should have a
      contrast ratio of at least 4.5:1 (and large text should be at least 3:1)
      against its background color. Include textual content to provide
      alternatives to visual information (especially color). Use captions and
      always provide a table version of the visualization. Allow keyboard
      alternatives for navigating graphical user interfaces.
    </p>
    <h5>Color blind</h5>
    <p>
      The two most common forms of color blindness are deuteranomaly and
      deuteranopia — which together account for about 6% of men, and protanomaly
      and protanopia, which account for another 2%. Tritanopia is very rare, and
      affects less than 0.001% of men. For those affected the two most difficult
      colors to distinguish are green and red. Stressing the contrast between
      dark and light values is a good way to make the colors recognizable. While
      hue and saturation have minimal effect on legibility, brightness
      differences are far more perceptible.
    </p>
    <p>
      Easily distinguishable formats (like bar charts or treemaps) or markers
      (as used in scatter plots or maps) can supplement color to express
      information. Those work perfectly, even in black and white, and reduce
      problems for people with color blindness. Remember, the best way to
      support accessibility for all visual disabilities is to provide
      alternatives to visual information (especially color), using text and
      tabular versions of the visualization. IBM data visualization guidelines.
    </p>
    <p>
      Two good references for meeting accessibility requirements in data
      visualizations:{" "}
      <a
        href="https://accessibility.digital.gov/visual-design/data-visualizations/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Data Visualizations
      </a>
      ,{" "}
      <a
        href="https://www.ibm.com/design/language/"
        target="_blank"
        rel="noopener noreferrer"
      >
        IBM Data Visualization Guidelines
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
      <a
        href="https://www.w3.org/Consortium/"
        target="_blank"
        rel="noopener noreferrer"
      >
        W3C (World Wide Web Consortium)
      </a>{" "}
      develops web standards; they are led by the Web inventor Tim Berners-Lee.
      One of their initiatives is the{" "}
      <a
        href="http://www.w3.org/WAI/"
        target="_blank"
        rel="noopener noreferrer"
      >
        WAI (Web Accessibility Initiative)
      </a>
      , to improve accessibility of the Web for people with disabilities.
    </p>
    <p>
      The WAI is made up of several working groups and Special Interest groups.
      The most important working group is the{" "}
      <a
        href="http://www.w3.org/WAI/GL/"
        target="_blank"
        rel="noopener noreferrer"
      >
        WCAG WG (Web Content Accessibility Guidelines Working Group)
      </a>
      . This group published{" "}
      <a
        href="https://www.w3.org/TR/WCAG21/"
        target="_blank"
        rel="noopener noreferrer"
      >
        WCAG 2.1
      </a>
      ; their web site has many useful resources and materials.
    </p>
    <p>
      Another organization that does a good job of explaining accessibility and
      the guidelines is{" "}
      <a href="http://webaim.org" target="_blank" rel="noopener noreferrer">
        WebAIM
      </a>
      .
    </p>
  </div>
);

export default AccessibilityGuidelines;
