import React from "react";
import { storybookStyles } from "../storyStyles";

const DataVisualizationStyle = () => (
  <div style={storybookStyles.main}>
    <h1>Data Visualization</h1>
    <p>Our data visualizations demonstrate the power of the Civic platform.</p>
    <h2>Purpose</h2>
    <p>
      Civic is a data platform. Our data visualizations demonstrate the power of
      the Civic platform. Our platform shows the viability of an open-systems,
      open-source approach to public data. These guidelines outline our approach
      to data visualization.
    </p>
    <h2>Principles</h2>
    <p>Our data visualizations should:</p>
    <ul>
      <li>show the value of data in the hands of the community</li>
      <li>be legible, clean, and professional</li>
      <li>be aware of bias</li>
      <li>be accessible</li>
    </ul>
    <h4>Embrace imperfection</h4>
    <p>
      Data-driven doesn’t mean unmistakably true because data and the tools that
      collect it are human-made. Data is not pure fact, but evidence that
      filters reality in a very subjective way. It has the unique power to
      abstract our world and help us understand it, according to relevant
      factors that are different or constantly changing. See{" "}
      <a
        href="https://www.ibm.com/design/language/"
        target="_blank"
        rel="noopener noreferrer"
      >
        IBM data visualization guidelines
      </a>
      .
    </p>
    <h4>Be aware of bias</h4>
    <p>
      A data visualization provides a lens and is a perspective on reality. Bias
      cannot be eliminated. There is no such thing as an unbiased data
      visualization. However, by being aware of bias, you can present the most
      accurate and useful perspectives on reality through your visualization.
      Generally, what is perceived as biased is based on the perspective of the
      observer. What data is collected, how data is collected, how data is
      calculated, how data is categorized, how data is contextualized, what data
      is presented, how data is visualized, etc... all inform bias.
    </p>
    <h4>Show meaningful relationships</h4>
    <p>
      Data visualizations that show relationships imply meaning in those
      relationships. Don’t make spurious relationship between disparate data.
      You may have heard the phrase “correlation does not imply causation”. Data
      visualizations that show correlation without context imply causation.
    </p>
    <h4>Data density - impress but don’t overwhelm</h4>
    <p>
      Our data density should aim to impress but not overwhelm. Data
      visualizations should be dense with information and detail - humans are
      capable of absorbing a lot of visual information very quickly. However, it
      is easy to overwhelm by showing too many different types of relationships
      at one time.
    </p>
    <h2>Chart Types</h2>
    <p>
      The Civic platform uses a reusable component library. Basic components
      should be used where possible, and new reusable components should be built
      instead of creating one-off visualizations. The currently library of
      components is documented in the{" "}
      <a
        href="https://hackoregon.github.io/civic/?path=/story/component-lib-charts--charts-style-guide"
        // target="_blank"
        rel="noopener noreferrer"
      >
        CIVIC Storybook, Charts
      </a>
      .
    </p>
    <h4>Bar chart</h4>
    <p>
      Vertical Bar Charts, also referred to as Column Charts, are used to
      compare quantities of different categories or to show values over time.
      When showing variables over time, you should choose a Bar Chart over a
      Line Chart when the rate of change is more relevant than the relative
      magnitudes. If comparing quantities of more than 5 categories, use a
      Horizontal Bar Chart instead.
    </p>

    <h4>Gradient scale</h4>
    <p>More info to follow</p>
    <h4>Horizontal Bar chart</h4>
    <p>
      Horizontal Bar Charts are used to compare quantities of different
      categories (especially 6 or more).
    </p>
    <h4>Line chart</h4>
    <p>
      Line Charts track changes or trends over time and show the relationship
      between one or more variables. When showing variables over time, you
      should choose a Line Chart over a Bar Chart when the rate of change is
      more relevant than the relative magnitudes.
    </p>
    <h4>Pie/doughnut</h4>
    <p>When to use/why to use</p>
    <p>Best practices for how to use it</p>
    <p>More info to follow</p>
    <h4>Scatterplot</h4>
    <p>More info to follow</p>
    <h4>Stacked area chart</h4>
    <p>More info to follow</p>
    <h2>Maps</h2>
    <p>
      Within the Civic reusable component library, a number of map types are
      available.
    </p>
    <h4>Boundary map</h4>
    <p>More info to follow</p>
    <h4>CIVIC Sandbox map</h4>
    <p>More info to follow</p>
    <h4>Heat map</h4>
    <p>More info to follow</p>
    <h4>Hex overlay</h4>
    <p>More info to follow</p>
    <h4>Icon map</h4>
    <p>More info to follow</p>
    <h4>Map overlay</h4>
    <p>More info to follow</p>
    <h4>Path map</h4>
    <p>More info to follow</p>
    <h4>Scatterplot map</h4>
    <p>More info to follow</p>
    <h4>Screen grid map</h4>
    <p>More info to follow</p>

    <h2>Details</h2>
    <h4>Titles</h4>
    <p>
      All data visualizations should have a short, but descriptive title. It may
      make sense to have a title as part of a card or as part of the actual
      visualization.
    </p>
    <h4>Labels</h4>
    <ul>
      <li>Labels should be concise and descriptive</li>
      <li>If possible, label elements directly instead of a legend</li>
      <li>Use bold text only for emphasis</li>
      <li>Avoid type rotation</li>
    </ul>
    <h4>Annotation</h4>
    <p>
      Annotation should be used to explain outliers and provide additional
      context.
    </p>
    <h4>Tooltips</h4>
    <p>
      Our basic charts use tooltips to enable close examination of individual
      data points.
    </p>
    <h4>Colors</h4>
    <p>More info to follow</p>
    <h4>Showing quantities</h4>
    <p>
      Civic uses a number formatter to ensure consistent formatting across the
      platform.
    </p>
    <ul>
      <li>Commas</li>
      <li>Always use commas for thousands separator.</li>
      <li>Numbers and decimal places</li>
      <ul>
        <li>Use units that will result in showing a maximum of 6 digits</li>
        <ul>
          <li>Fewer digits is better</li>
        </ul>
        <li>Lean towards showing 0-1 decimal places</li>
        <ul>
          <li>Should reflect the precision of the data</li>
          <li>Show whole dollars or dollars and cents (e.g. $123 or $1.23)</li>
        </ul>
        <li>Examples</li>
        <ul>
          <li>$7.3 million, not $7,300,000</li>
          <li>24%, not 23.79%</li>
          <li>$535,000</li>
        </ul>
        <li>Show units (e.g. dollar sigh, percent)</li>
      </ul>
    </ul>
    <h4>Responsiveness</h4>
    <p>
      Our data visualizations should look good on a phone and on a desktop
      computer. Generally, our approach to responsiveness is to scale everything
      - text and chart elements together. This approach may evolve.
    </p>
    <h4>Legends</h4>
    <p>
      If possible, elements should be directly labeled rather than using a
      legend.
    </p>
    <h4>Proper scaling</h4>
    <p>
      Domain and scaling for axes should be set for each data visualization to
      ensure readability.
    </p>
    <h4>Accessibility</h4>
    <p>
      We support accessibility for all visual disabilities by providing
      alternatives to visual information, using text and tabular versions of the
      visualization.
    </p>
    <p>
      See{" "}
      <a
        href="https://hackoregon.github.io/civic/?path=/story/design-ux-style-guide--accessibility"
        // target="_blank"
        rel="noopener noreferrer"
      >
        CIVIC Storybook, Accessibility
      </a>
      .
    </p>
    <h4>Interaction</h4>
    <p>Interaction should have a clear purpose.</p>
    <h4>Small multiples</h4>
    <p>
      The pattern of filtering small multiples is one of our preferred design
      patterns.
    </p>
  </div>
);

export default DataVisualizationStyle;
