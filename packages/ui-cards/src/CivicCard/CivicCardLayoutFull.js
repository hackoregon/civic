/* eslint-disable import/prefer-default-export */
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { Fragment, useState, useRef } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { generate } from "shortid";
import copy from "copy-to-clipboard";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { ThemeProvider } from "@material-ui/styles";
import { MaterialTheme } from "@hackoregon/ui-themes";
import { ButtonNew, PullQuote, Chip } from "@hackoregon/ui-core";

import MetaDataQAData from "../../assets/metadataQA.json";
import MetaDataQAQuestions from "../../assets/metadataQAQuestions.json";
import authorsSrc from "../../assets/authors.png";
import cardMetaTypes from "./cardMetaTypes";

import {
  Resource,
  MetadataQuestion,
  CollapsableSection
} from "./LayoutComponents";

const sectionMarginSmall = css`
  display: block;
  margin: 12px auto;
`;

const sectionMaxWidthSmall = css`
  max-width: 700px;
`;

const sectionMarginMedium = css`
  display: block;
  margin: 64px auto;
`;

const sectionMaxWidthMedium = css`
  max-width: 900px;
`;

const authorPhoto = css`
  width: 100%;
  filter: grayscale(100%);
  cursor: pointer;
`;

const headerStyle = css`
  display: grid;
  padding-bottom: 20px;
`;

const titleStyle = css`
  margin: 30px 0 20px;
`;

const centerSelf = css`
  justify-self: center;
`;

const buttonImproveContainer = css`
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 200px 200px;
  justify-content: center;
  justify-items: center;
`;

const hiddenVisually = css`
  border: 0;
  clip: rect(0, 0, 0, 0);
  height: 1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`;

export function CivicCardLayoutFull({ isLoading, data, cardMeta }) {
  const [shareButtonText, setShareButtonText] = useState("Share");
  const [shareButtonOpen, setShareButtonOpen] = useState(false);
  const shareButtonAnchorRef = useRef(null);
  const issueLink = `https://github.com/hackoregon/civic/issues/new?labels=type%3Astory-card&template=story-card-improve.md&title=[FEEDBACK] ${
    cardMeta.slug
  }`;

  const relatedMetadataQA = cardMeta.metadataQA
    ? MetaDataQAData[cardMeta.metadataQA]
    : null;

  function handleShareItemClick(option) {
    const linkLocation = `${_.get(window, "location.origin", "")}/cards/${
      cardMeta.slug
    }`;
    const scrOutput = document.querySelector("#scr-only");

    if (option === "link") {
      copy(linkLocation);
    } else {
      copy(`${linkLocation}/embed`);
    }

    setShareButtonText("Copied!");
    scrOutput.textContent = "Copied";
    setTimeout(() => {
      setShareButtonText("Share");
      scrOutput.textContent = "";
    }, 2000);
    setShareButtonOpen(false);
  }

  function handleShareButtonToggle() {
    setShareButtonOpen(prevOpen => !prevOpen);
  }

  function handleShareButtonClose(event) {
    if (
      shareButtonAnchorRef.current &&
      shareButtonAnchorRef.current.contains(event.target)
    ) {
      return;
    }

    setShareButtonOpen(false);
  }

  const shareButtonOptions = [
    { text: "Link", linkTo: "link" },
    { text: "Embed", linkTo: "embed" }
  ];

  return (
    <ThemeProvider theme={MaterialTheme}>
      <output css={hiddenVisually} id="scr-only" />
      <article>
        {cardMeta.title && (
          <div css={[sectionMarginSmall, sectionMaxWidthSmall]}>
            <header css={headerStyle}>
              <h1 id="title" css={titleStyle}>
                {cardMeta.title}
              </h1>
              <ButtonGroup
                variant="contained"
                color="secondary"
                ref={shareButtonAnchorRef}
                aria-label="split button"
                css={centerSelf}
              >
                <Button onClick={handleShareButtonToggle}>
                  {shareButtonText}
                </Button>
                <Button
                  color="secondary"
                  size="small"
                  aria-owns={shareButtonOpen ? "menu-list-grow" : undefined}
                  aria-haspopup="true"
                  onClick={handleShareButtonToggle}
                >
                  <ArrowDropDownIcon />
                </Button>
              </ButtonGroup>
              <Popper
                open={shareButtonOpen}
                anchorEl={shareButtonAnchorRef.current}
                transition
                disablePortal
                placement="bottom-end"
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin:
                        placement === "bottom" ? "center top" : "right bottom"
                    }}
                  >
                    <Paper id="menu-list-grow">
                      <ClickAwayListener onClickAway={handleShareButtonClose}>
                        <MenuList>
                          {shareButtonOptions.map(option => (
                            <MenuItem
                              key={option.text}
                              onClick={() =>
                                handleShareItemClick(option.linkTo)
                              }
                            >
                              {option.text}
                            </MenuItem>
                          ))}
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </header>
            <hr />
            {cardMeta.tags && cardMeta.tags.length > 0 && (
              <Fragment>
                <section id="tags">
                  {cardMeta.tags.map((tag, index) => (
                    <Chip tag={tag} index={index} key={generate()} />
                  ))}
                </section>
                <hr />
              </Fragment>
            )}
          </div>
        )}
        <section>
          {cardMeta.introText && (
            <div css={[sectionMarginSmall, sectionMaxWidthSmall]}>
              <div id="introText">{cardMeta.introText}</div>
            </div>
          )}
          {cardMeta.visualization && (
            <div
              id="visualization"
              css={[sectionMarginMedium, sectionMaxWidthMedium]}
            >
              {cardMeta.selector}
              <cardMeta.visualization isLoading={isLoading} data={data} />
            </div>
          )}
          {(cardMeta.shareText || cardMeta.additionalText) && (
            <div css={[sectionMarginSmall, sectionMaxWidthSmall]}>
              {cardMeta.shareText && (
                <div id="shareText">
                  <PullQuote quoteText={cardMeta.shareText} />
                </div>
              )}
              {cardMeta.additionalText && (
                <div id="additionalText">{cardMeta.additionalText}</div>
              )}
            </div>
          )}
        </section>
        {cardMeta.analysis && (
          <Fragment>
            <hr css={[sectionMarginSmall, sectionMaxWidthSmall]} />
            <section css={[sectionMarginSmall, sectionMaxWidthSmall]}>
              <div id="analysis">
                <h2>About this analysis</h2>
                {cardMeta.analysis}
              </div>
            </section>
          </Fragment>
        )}

        <Fragment>
          <hr css={[sectionMarginSmall, sectionMaxWidthSmall]} />
          <section
            css={[sectionMarginSmall, sectionMaxWidthSmall]}
            id="metadata"
          >
            <h2>About this data</h2>
            {relatedMetadataQA ? (
              <Fragment>
                {cardMeta.metadata}
                <CollapsableSection
                  description="metadata questions"
                  items={Object.keys(relatedMetadataQA).map(key => (
                    <MetadataQuestion
                      question={MetaDataQAQuestions[key]}
                      answer={relatedMetadataQA[key]}
                      key={generate()}
                    />
                  ))}
                  collapseAfter={5}
                />
              </Fragment>
            ) : (
              <p>
                <em>This dataset is missing context documentation</em>
                <br />
                <br />
                Documenting how and why a dataset was created, what information
                it contains, its limitations, and possible ethical or legal
                concerns is paramount for data that informs decision making. If
                you’re an expert on this dataset, you can{" "}
                <a href="https://forms.gle/rggpgLGRtfaQDm5f7">
                  add documentation
                </a>
                .
              </p>
            )}
          </section>
        </Fragment>
        {cardMeta.resources && (
          <Fragment>
            <hr css={[sectionMarginSmall, sectionMaxWidthSmall]} />
            <section
              css={[sectionMarginSmall, sectionMaxWidthSmall]}
              id="resources"
            >
              <h2>Links and resources</h2>
              <p>
                Interested in learning more? The following links and resources
                are useful in gaining a greater understanding of the context of
                this data visualization.
              </p>
              <CollapsableSection
                description="resources"
                items={cardMeta.resources.map(item => (
                  <Resource section={item} key={generate()} />
                ))}
                collapseAfter={7}
              />
            </section>
          </Fragment>
        )}
        <Fragment>
          <hr css={[sectionMarginSmall, sectionMaxWidthSmall]} />
          <section
            css={[sectionMarginSmall, sectionMaxWidthSmall]}
            id="authors"
          >
            <h2>Who made this?</h2>
            {/* temporary implementation, length > 4 to exclude authors: "demo" */}
            {cardMeta.authors && cardMeta.authors.length > 4 && (
              <Fragment>
                <h3>Primary Authors</h3>
                <ul>
                  {cardMeta.authors.map(author => (
                    <li>{author}</li>
                  ))}
                </ul>
              </Fragment>
            )}
            <h3>2019 Hack Oregon Team</h3>
            <img
              css={authorPhoto}
              src={authorsSrc}
              alt="Pictures of people who worked on this"
            />
          </section>
        </Fragment>
        <hr css={[sectionMarginSmall, sectionMaxWidthSmall]} />
        <section css={[sectionMarginSmall, sectionMaxWidthSmall]} id="improve">
          <h2>Help make this better</h2>
          <p>
            CIVIC is an open platform, so you can help make this better! Whether
            you noticed a typo, want to suggest an improvement for our data
            visualization, or have context to add about the dataset, we want you
            to contribute.
          </p>
          <div css={buttonImproveContainer}>
            <ButtonNew
              href="https://civicsoftwarefoundation.org/#volunteers"
              label="Get Involved!"
            />
            <ButtonNew href={issueLink} label="File an Issue" />
          </div>
        </section>
      </article>
      <hr css={[sectionMarginSmall, sectionMaxWidthSmall]} />
    </ThemeProvider>
  );
}

CivicCardLayoutFull.propTypes = {
  isLoading: PropTypes.bool,
  data: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.array]),
  cardMeta: cardMetaTypes
};

CivicCardLayoutFull.displayName = "CivicCardLayoutFull";
