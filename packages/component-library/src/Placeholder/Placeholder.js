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

const IssueText = ({ issue }) => (
  <div>
    <h1>Card In Progress</h1>
    <a href={`https://github.com/hackoregon/civic/issues/${issue}`}>
      View progress on GitHub
    </a>
  </div>
);

const Placeholder = ({ issue, children }) => (
  <div css={placeholderClass}>
    {issue ? <IssueText issue={issue} /> : children || <DefaultText />}
  </div>
);

Placeholder.displayName = "Placeholder";
Placeholder.propTypes = {
  children: PropTypes.node,
  issue: PropTypes.string
};

IssueText.propTypes = {
  issue: PropTypes.string
};

export default Placeholder;
