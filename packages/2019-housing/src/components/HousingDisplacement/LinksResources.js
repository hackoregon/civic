/** @jsx jsx */
import { jsx } from "@emotion/core";
import { CollapsableSection } from "@hackoregon/component-library/dist/CivicCard/LayoutComponents";
import { Fragment } from "react";
import { PropTypes } from "prop-types";
// eslint-disable-next-line import/no-extraneous-dependencies
import { generate } from "shortid";
import AccordianContentContainer from "./AccordianContentContainer";
import DataTabs from "./DataTabs";

const resources = [
  {
    heading: "Organizations",
    items: [
      {
        link:
          "http://kingneighborhood.org/wp-content/uploads/2015/03/BLEEDING-ALBINA_-A-HISTORY-OF-COMMUNITY-DISINVESTMENT-1940%E2%80%932000.pdf",
        description:
          "Gibson, Karen. (2007). Bleeding Albina: A History of Community Disinvestment, 1940-2000."
      },
      {
        link: "http://racebox.org/",
        description:
          "RaceBox - see how race and ethnicity has been asked on the Decennial census since 1790"
      },
      {
        link:
          "https://www.pewsocialtrends.org/interactives/multiracial-timeline/",
        description:
          "Pew Research Center - see a historical timeline of race categories defined by the census since 1790"
      },
      {
        link: "https://www.census.gov/topics/population/race/about.html",
        description: "Official Census race category definitions"
      },
      { link: "https://www.hackoregon.org", description: "Hack Oregon" },
      {
        link: "https://www.civicsoftwarefoundation.org",
        description: "Civic Software Foundation"
      },
      { link: "https://www.civicplatform.org", description: "Civic Platform" }
    ]
  }
];

function Resource({ section }) {
  return (
    <Fragment>
      <h3>{section.heading}</h3>
      <ul>
        {section.items.map(item => (
          <li key={generate()}>
            <a href={item.link}>{item.description}</a>
          </li>
        ))}
      </ul>
    </Fragment>
  );
}

Resource.propTypes = {
  section: PropTypes.shape({
    heading: PropTypes.string,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        link: PropTypes.string,
        description: PropTypes.string
      })
    )
  })
};

const ContentCard = () => (
  <CollapsableSection
    description="resources"
    items={resources.map(item => (
      <Resource section={item} key={generate()} />
    ))}
    collapseAfter={7}
  />
);

const ContentA = () => (
  <CollapsableSection
    description="resources"
    items={resources.map(item => (
      <Resource section={item} key={generate()} />
    ))}
    collapseAfter={7}
  />
);

const ContentB = () => (
  <CollapsableSection
    description="resources"
    items={resources.map(item => (
      <Resource section={item} key={generate()} />
    ))}
    collapseAfter={7}
  />
);

const LinksResources = () => (
  <AccordianContentContainer>
    <DataTabs Storycard={ContentCard} DatasetA={ContentA} DatasetB={ContentB} />
  </AccordianContentContainer>
);

export default LinksResources;
