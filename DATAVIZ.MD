# Civic Data Visualization Guidelines

## Overview
Civic is a data platform. Our data visualizations demonstrate the power of the Civic platform. Our platform shows the viability of an open-systems, open-source approach to public data. These guidelines outline our approach to data visualization.

## Principles
### Our data visualizations should
* show the value of data in the hands of the community
* be legible, clean, and professional
* be aware of bias
* be accessible

### Embrace imperfection
> Data-driven doesn’t mean unmistakably true because data and the tools that collect it are human-made. Data is not pure fact, but evidence that filters reality in a very subjective way. It has the unique power to abstract our world and help us understand it, according to relevant factors that are different or constantly changing. *[IBM data visualization guidelines](https://www.ibm.com/design/language/experience/data-visualization)*

### Be aware of bias
A data visualization provides a lens and is a perspective on reality. Bias cannot be eliminated. There is no such thing as an unbiased data visualization. However, by being aware of bias, you can present the most accurate and useful perspectives on reality through your visualization. Societally, what is perceived as biased is based on the perspective of the observer. What data is collected, how data is collected, how data is calculated, how data is categorized, how data is contextualized, what data is presented, how data is visualized, etc... all inform bias.

### Show meaningful relationships
Data visualizations that show relationships imply meaning in those relationships. Don’t make spurious relationship between disparate data. You may have heard the phrase “correlation does not imply causation”. Data visualizations that show correlation without context imply causation.

### Data density - impress but don't overwhelm
Our data density should aim to impress but not overwhelm. Data visualizations should be dense with information and detail - humans are capable of absorbing a lot of visual information very quickly. However, it is easy to overwhelm by showing too many different types of relationships at one time.

## Chart types
The Civic platform uses a reusable component library. Basic component should be used where possible, and new reusable components should be built instead of creating one-off visualizations.
### Line chart
Line Charts track changes or trends over time and show the relationship between one or more variables. When showing variables over time, you should choose a Line Chart over a Bar Chart when the rate of change is more relevant than the relative magnitudes.
### Bar chart
* Vertical Bar Charts are used to compare quantities of different categories or to show values over time. When showing variables over time, you should choose a Bar Chart over a Line Chart when the rate of change is more relevant than the relative magnitudes. If comparing quantities of more than 5 categories, use a Horizontal Bar Chart instead.
* Horizontal Bar Charts are used to compare quantities of different categories (especially 6 or more)
### Scatterplot
More info to follow
### Pie/doughnut
More info to follow
### Data table
More info to follow
### Maps
More info to follow

## Details

### Titles
All data visualizations should have a short, but descriptive title. It may make sense to have a title as part of a card or as part of the actual visualization.

### Labels
* Labels should be consise and descriptive
* If possible, label elements directly instead of a legend
* Use bold text only for emphasis
* Avoid type rotation

### Annotation
* Annotation should be used to explain outliers and provide additional context

### Tooltips
* Our basic charts use tooltips to enable close examination of individual data points

### Colors
More info to follow

### Showing quantities
Civic uses a number formatter to ensure consistent formatting accross the platform.
* Commas
 * Always use commas for thousands separator
* Numbers and decimal places
    * Use units that will result in showing a maximum of 6 digits
        * Fewer digits is better
    * Lean towards showing 0-1 decimal places. 
        * Should reflect the precision of the data
        * Show whole dollars or dollars and cents (e.g. $123 or $1.23)
    * Examples
        * $7.3 million, not $7,300,000
        * 24%, not 23.79%
        * $535,000
* Show units (e.g. dollar sign, percent)

### Responsiveness
Our data visualizations should look good on a phone and on a desktop computer. Generally, our approach to responsiveness is to scale everything - text and chart elements together. This approach may evolve.

### Legends
If possible, elements should be directly labeled rather than using a legend. 

### Proper scaling
Domain and scaling for axes should be set for each data visualization to ensure readability.

### Accessibility
We support accesibility for all visual disabilities by providing alternatives to visual information, using text and tabular versions of the visualization. 

>**Low vision**
>For people who are blind, include text descriptions of any meaningful images that can be read by assistive technology (screen readers). A person with low vision is still able to perceive visual insights with the help of accessibility features and considerations.
Provide the opportunity to increase the size of elements and focus on particular areas by zooming and magnifying.
Follow the WCAG 2.0 Level AA guidelines for contrast — high contrast is crucial to improve legibility. Body text should have a contrast ratio of at least 4.5:1 (and large text should be at least 3:1) against its background color.
Include textual content to provide alternatives to visual information (especially color).
Use captions and always provide a table version of the visualization.
Allow keyboard alternatives for navigating graphical user interfaces.

>**Color blind**
>The two most common forms of color blindness are deuteranomaly and deuteranopia — which together account for about 6% of men, and protanomaly and protanopia, which account for another 2%. Tritanopia is very rare, and affects less than 0.001% of men.

>For those affected the two most difficult colors to distinguish are green and red. Stressing the contrast between dark and light values is a good way to make the colors recognizable. While hue and saturation have minimal effect on legibility, brightness differences are far more perceptible.

>Easily distinguishable formats (like bar charts or treemaps) or markers (as used in scatter plots or maps) can supplement color to express information. Those work perfectly, even in black and white, and reduce problems for people with color blindness.
Remember, the best way to support accessibility for all visual disabilities is to provide alternatives to visual information (especially color), using text and tabular versions of the visualization. 

>*[IBM data visualization guidelines](https://www.ibm.com/design/language/experience/data-visualization)*

### Interaction
Interaction should have a clear purpose.

### Small multiples
The pattern of filtering small multiples is one of our preferred design patterns.
