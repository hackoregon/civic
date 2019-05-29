import React from "react";
import PropTypes from "prop-types";
import { css } from "emotion";

const govLinks = item =>
  item.links[0].link &&
  item.links.map(
    link =>
      link.link_name && (
        <ul key={link.link_name}>
          <li>
            <a href={link.link}>{link.link_name}</a>
          </li>
        </ul>
      )
  );

const policyLinks = data =>
  data.links[0].link && (
    <div>
      <h3>More information:</h3>
      <ul>
        {data.links.map(
          item =>
            item.link && (
              <li key={item.link}>
                <a href={item.link}>{item.link_name}</a>
              </li>
            )
        )}
      </ul>
    </div>
  );

function SelectedPolicy({ data }) {
  return (
    <div
      className={css`
        width: 100%;
        border-bottom: 1px solid #f3f3f3;
      `}
    >
      <h3>Category: {data.category}</h3>
      <p>{data.description}</p>
      <h3>Implementing governments:</h3>
      <ul>
        {Object.keys(data.govData).map(gov => (
          <li key={gov}>
            <p style={{ margin: 0, color: "#001732" }}>
              <strong>{gov}</strong>
            </p>
          </li>
        ))}
      </ul>
      <h3>More information by government:</h3>
      <ul>
        {Object.keys(data.govData).map(
          gov =>
            data.govData[gov][0].description && (
              <li key={`${gov}extra`}>
                <p style={{ margin: 0, color: "#001732" }}>
                  <strong>{gov}</strong>
                </p>
                <ul>
                  {data.govData[gov].map(
                    item =>
                      item.description && (
                        <li key={item.description}>
                          <p style={{ margin: 0 }}>
                            <i>{item.name && `${item.name}: `}</i>
                            {`${item.description} `}
                          </p>
                          {govLinks(item)}
                        </li>
                      )
                  )}
                </ul>
              </li>
            )
        )}
      </ul>
      {policyLinks(data)}
    </div>
  );
}

SelectedPolicy.propTypes = {
  data: PropTypes.shape({})
};

export default SelectedPolicy;
