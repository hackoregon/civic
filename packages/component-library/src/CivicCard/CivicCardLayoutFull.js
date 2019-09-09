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

import PullQuote from "../PullQuote/PullQuote";
import Placeholder from "../Placeholder/Placeholder";
import Chip from "../Chip/Chip";
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
  width: 50%;
  filter: grayscale(100%);
  cursor: pointer;
`;

const demoAuthorPhotos = [
  "https://civicsoftwarefoundation.org/static/human-grid-test-4c90bfc3f316f5d4e104320cb98c43c8.png",
  "https://civicsoftwarefoundation.org/static/human-grid-test2-ea1849501456af341647068243fc72bb.png"
];

function CivicCardLayoutFull({ isLoading, data, cardMeta }) {
  const [shareButtonText, setShareButtonText] = useState("Share");
  const [shareButtonOpen, setShareButtonOpen] = useState(false);
  const shareButtonAnchorRef = useRef(null);

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
    <Fragment>
      <article>
        {cardMeta.title && (
          <div css={[sectionMarginSmall, sectionMaxWidthSmall]}>
            <header>
              <h1 id="title">{cardMeta.title}</h1>
              <ButtonGroup
                variant="contained"
                color="primary"
                ref={shareButtonAnchorRef}
                aria-label="split button"
              >
                <Button onClick={handleShareButtonToggle}>
                  {shareButtonText}
                </Button>
                <Button
                  color="primary"
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
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin:
                        placement === "bottom" ? "center top" : "center bottom"
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
        {(cardMeta.metadata || cardMeta.metadataQA) && (
          <Fragment>
            <hr css={[sectionMarginSmall, sectionMaxWidthSmall]} />
            <section
              css={[sectionMarginSmall, sectionMaxWidthSmall]}
              id="metadata"
            >
              <h2>About this data</h2>
              {cardMeta.metadata}
              {_.has(cardMeta, "metadataQA") && (
                <CollapsableSection
                  items={cardMeta.metadataQA.map(item => (
                    <MetadataQuestion item={item} key={generate()} />
                  ))}
                  collapseAfter={5}
                />
              )}
            </section>
          </Fragment>
        )}
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
                items={cardMeta.resources.map(item => (
                  <Resource section={item} key={generate()} />
                ))}
                collapseAfter={7}
              />
            </section>
          </Fragment>
        )}
        {((cardMeta.authors && cardMeta.authors === "demo") ||
          (cardMeta.authors && cardMeta.authors.length > 0)) && (
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
          </Fragment>
        )}
        <hr css={[sectionMarginSmall, sectionMaxWidthSmall]} />
        <section css={[sectionMarginSmall, sectionMaxWidthSmall]} id="improve">
          <h2>Help make this better</h2>
          <p>
            CIVIC is an open platform, so you can help make this better! Whether
            you noticed a typo, want to suggest an improvement for our data
            visualization, or have context to add about the dataset, we want you
            to contribute.
          </p>
          <ul>
            <li>
              <a href="https://civicsoftwarefoundation.org/#volunteers">
                Get Started!
              </a>
            </li>
          </ul>
        </section>
      </article>
      <hr css={[sectionMarginSmall, sectionMaxWidthSmall]} />
      <section css={[sectionMarginSmall, sectionMaxWidthSmall]} id="explore">
        <h2>Explore related data</h2>
        <Placeholder>
          <h3>
            <a href="https://civicsoftwarefoundation.org/#cities">
              See your data here!
            </a>
          </h3>
        </Placeholder>
      </section>
    </Fragment>
  );
}

CivicCardLayoutFull.propTypes = {
  isLoading: PropTypes.bool,
  data: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.array]),
  cardMeta: cardMetaTypes
};

export default CivicCardLayoutFull;
