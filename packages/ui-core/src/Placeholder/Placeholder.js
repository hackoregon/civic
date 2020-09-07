/* eslint-disable import/prefer-default-export */
import PropTypes from "prop-types";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";

const placeholderClass = css`
  text-align: center;
  border-radius: 15px;
  border: 3px dashed #ccc;
  color: #666;
  padding: 3em;
  font-size: 18px;

  & h1,
  & h2 {
    font-size: 2em;
    font-weight: bold;
  }
`;

const DefaultText = () => (
  <div>
    <h1>Content Placeholder</h1>
    <p>Stuff coming soon!</p>
  </div>
);

const IssueText = ({ issue, entity, repo }) => (
  <div>
    <h1>In Progress</h1>
    <a href={`https://github.com/${entity}/${repo}/issues/${issue}`}>
      View progress on GitHub
    </a>
  </div>
);

IssueText.propTypes = {
  issue: PropTypes.number,
  entity: PropTypes.string,
  repo: PropTypes.string
};

export const Placeholder = ({ issue, entity, repo, children }) => (
  <div css={placeholderClass}>
    {issue ? (
      <IssueText issue={issue} entity={entity} repo={repo} />
    ) : (
      children || <DefaultText />
    )}
  </div>
);

Placeholder.displayName = "Placeholder";
Placeholder.propTypes = {
  children: PropTypes.node,
  /** GitHub issue or pr number */
  issue: PropTypes.number,
  /** GitHub organization or user */
  entity: PropTypes.string,
  /** GitHub repo name */
  repo: PropTypes.string
};

Placeholder.defaultProps = {
  entity: "hackoregon",
  repo: "civic"
};
