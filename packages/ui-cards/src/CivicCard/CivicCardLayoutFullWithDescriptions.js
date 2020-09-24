/* eslint-disable import/prefer-default-export */
/** @jsx jsx */
import { Fragment, useState, useRef } from "react";
import { jsx, css } from "@emotion/core";
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
import { Chip, ButtonNew, PullQuote } from "@hackoregon/ui-core";
import cardMetaTypes from "./cardMetaTypes";
import cardMetaDescription from "./cardMetaDescriptions";
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
  width: 50%;
  filter: grayscale(100%);
  cursor: pointer;
`;

const cardMetaItem = css`
  border: 1px solid red;
`;

const platformItem = css`
  border: 1px solid blue;
`;

const description = css`
  max-width: 700px;
  margin: auto;
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

const demoAuthorPhotos = [
  "https://civicsoftwarefoundation.org/static/human-grid-test-4c90bfc3f316f5d4e104320cb98c43c8.png",
  "https://civicsoftwarefoundation.org/static/human-grid-test2-ea1849501456af341647068243fc72bb.png"
];

function Desc({ id }) {
  return (
    <div css={description}>
      <b>{_.get(cardMetaDescription, [id, "title"])}</b>
      <code>{` (${id}) `}</code>
      <p>{_.get(cardMetaDescription, [id, "description"])}</p>
    </div>
  );
}

Desc.propTypes = {
  id: PropTypes.string
};

export function CivicCardLayoutFullWithDescriptions({
  isLoading,
  data,
  cardMeta
}) {
  const [shareButtonText, setShareButtonText] = useState("Share");
  const [shareButtonOpen, setShareButtonOpen] = useState(false);
  const shareButtonAnchorRef = useRef(null);
  const issueLink = `https://github.com/hackoregon/civic/issues/new?labels=type%3Astory-card&template=story-card-improve.md&title=[FEEDBACK] ${
    cardMeta.slug
  }`;

  function handleShareItemClick(option) {
    const linkLocation = `${_.get(window, "location.origin", "")}/cards/${
      cardMeta.slug
    }`;

    if (option === "link") {
      copy(linkLocation);
    } else {
      copy(`${linkLocation}/embed`);
    }

    setShareButtonText("Copied!");
    setTimeout(() => {
      setShareButtonText("Share");
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
    <div>
      <ThemeProvider theme={MaterialTheme}>
        <article>
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
            <Desc id="title" />
            <hr />
            <section css={cardMetaItem} id="tags">
              {cardMeta.tags.map((tag, index) => (
                <Chip tag={tag} index={index} key={generate()} />
              ))}
            </section>
            <Desc id="tags" />
            <hr />
          </div>
          <section>
            <div css={[sectionMarginSmall, sectionMaxWidthSmall]}>
              <div css={cardMetaItem} id="introText">
                {cardMeta.introText}
              </div>
              <Desc id="introText" />
            </div>
            <div
              id="visualization"
              css={[sectionMarginMedium, sectionMaxWidthMedium, cardMetaItem]}
            >
              {cardMeta.selector}
              <cardMeta.visualization isLoading={isLoading} data={data} />
            </div>
            <Desc id="visualization" />
            <div css={[sectionMarginSmall, sectionMaxWidthSmall]}>
              <div css={cardMetaItem} id="shareText">
                <PullQuote quoteText={cardMeta.shareText} />
              </div>
              <Desc id="shareText" />
              <div css={cardMetaItem} id="additionalText">
                {cardMeta.additionalText}
              </div>
              <Desc id="additionalText" />
            </div>
          </section>
          <hr css={[sectionMarginSmall, sectionMaxWidthSmall]} />
          <section css={[sectionMarginSmall, sectionMaxWidthSmall]}>
            <div css={cardMetaItem} id="analysis">
              <h2>About this analysis</h2>
              {cardMeta.analysis}
            </div>
          </section>
          <Desc id="analysis" />
          <hr css={[sectionMarginSmall, sectionMaxWidthSmall]} />
          <section
            css={[sectionMarginSmall, sectionMaxWidthSmall, cardMetaItem]}
            id="metadata"
          >
            <h2>About this data</h2>
            {cardMeta.metadata}
            {_.has(cardMeta, "metadataQA") && (
              <CollapsableSection
                description="metadata questions"
                items={cardMeta.metadataQA.map(item => (
                  <MetadataQuestion item={item} key={generate()} />
                ))}
                collapseAfter={5}
              />
            )}
          </section>
          <Desc id="metadataQA" />
          <hr css={[sectionMarginSmall, sectionMaxWidthSmall]} />
          <section
            css={[sectionMarginSmall, sectionMaxWidthSmall, cardMetaItem]}
            id="resources"
          >
            <h2>Links and resources</h2>
            <p>
              Interested in learning more? The following links and resources are
              useful in gaining a greater understanding of the context of this
              data visualization.
            </p>
            <CollapsableSection
              description="resources"
              items={cardMeta.resources.map(item => (
                <Resource section={item} key={generate()} />
              ))}
              collapseAfter={7}
            />
          </section>
          <Desc id="resources" />
          {((cardMeta.authors && cardMeta.authors === "demo") ||
            cardMeta.authors.length > 0) && (
            <Fragment>
              <hr css={[sectionMarginSmall, sectionMaxWidthSmall]} />
              <section
                css={[sectionMarginSmall, sectionMaxWidthSmall]}
                id="authors"
              >
                <h2>Who made this?</h2>
                {cardMeta.authors === "demo"
                  ? demoAuthorPhotos.map(photo => (
                      <img
                        css={authorPhoto}
                        src={photo}
                        alt="Pictures of people who worked on this"
                        key={generate()}
                      />
                    ))
                  : cardMeta.authors.map(authorEmail => (
                      <p key={authorEmail}>
                        <a href={`mailto:${authorEmail}`}>{authorEmail}</a>
                      </p>
                    ))}
              </section>
              <Desc id="authors" />
            </Fragment>
          )}
          <hr css={[sectionMarginSmall, sectionMaxWidthSmall]} />
          <section
            css={[sectionMarginSmall, sectionMaxWidthSmall, platformItem]}
            id="improve"
          >
            <h2>Help make this better</h2>
            <p>
              CIVIC is an open platform, so you can help make this better!
              Whether you noticed a typo, want to suggest an improvement for our
              data visualization, or have context to add about the dataset, we
              want you to contribute.
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
    </div>
  );
}

CivicCardLayoutFullWithDescriptions.propTypes = {
  isLoading: PropTypes.bool,
  data: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.array]),
  cardMeta: cardMetaTypes
};

CivicCardLayoutFullWithDescriptions.displayName =
  "CivicCardLayoutFullWithDescriptions";
