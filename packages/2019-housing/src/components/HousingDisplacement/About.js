/* eslint-disable import/no-extraneous-dependencies */
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import StorageIcon from "@material-ui/icons/Storage";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import { BrandColors, Collapsable, Logo } from "@hackoregon/component-library";
import { string } from "prop-types";
import AccordianContentContainer from "./AccordianContentContainer";

const useProjectStyles = makeStyles({
  card: {
    "&:hover": {
      boxShadow:
        "0px 2px 6px 0px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 4px 2px -1px rgba(0,0,0,0.12)"
    }
  }
});

const datasets = [
  { title: "Dataset A", link: "https://www.civicdatalibrary.org/" },
  { title: "Dataset B", link: "https://www.civicdatalibrary.org/" }
];

const Dataset = ({ title, link }) => {
  const classes = useProjectStyles();

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      css={css`
        margin: 0 1rem;
        width: 1000px;
      `}
    >
      <Card className={classes.card}>
        <CardContent>
          <Collapsable>
            <Collapsable.Section>
              <div
                css={css`
                  display: flex;
                  justify-content: space-between;
                  background-color: ${BrandColors.tertiary.hex};
                  margin: -1rem;
                `}
              >
                <div
                  css={css`
                    display: flex;
                  `}
                >
                  <StorageIcon
                    color="secondary"
                    fontSize="small"
                    css={css`
                      margin: 1.25rem 1rem 0 1rem;
                    `}
                  />
                  <h4
                    css={css`
                      color: ${BrandColors.background.hex};
                    `}
                  >
                    {title}
                  </h4>
                </div>
                <h4
                  css={css`
                    color: ${BrandColors.background.hex};
                    margin-right: 1rem;
                  `}
                >
                  <div
                    css={css`
                      display: inline;
                      img {
                        height: 1.25rem !important;
                        margin-right: 0.5px;
                      }
                    `}
                  >
                    <Logo type="standardLogoInverted" />
                  </div>{" "}
                  Context
                </h4>
              </div>
            </Collapsable.Section>

            <Collapsable.Section>
              <h5>Description</h5>
              <p>
                The description of the dataset is simple summary readable by any
                community member. It should be precise, clear, and not too long.
              </p>
            </Collapsable.Section>
          </Collapsable>
        </CardContent>
      </Card>
    </a>
  );
};

Dataset.propTypes = {
  title: string,
  link: string
};

const About = () => (
  <AccordianContentContainer>
    <h3>Datasets used</h3>
    <div
      css={css`
        display: flex;
      `}
    >
      {datasets.map(dataset => (
        <Dataset title={dataset.title} />
      ))}
    </div>
  </AccordianContentContainer>
);

export default About;
