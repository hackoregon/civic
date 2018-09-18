import React from 'react';
import { css } from 'emotion';
import { ICONS } from '@hackoregon/component-library/src/styleConstants';

const govLinks = item =>
  item.links[0].link &&
  item.links.map(
    link =>
      link.link_name && (
        <ul key={link.name}>
          <li>
            {link.link_name}
            {' ('}
            <a href={link.link}>
              <i className={ICONS.link} />
            </a>
            {')'}
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
      `}
    >
      <h3>Category: {data.category}</h3>
      <p>{data.description}</p>
      <h3>Implementing governments</h3>
      <ul>
        {Object.keys(data.govData).map(gov => (
          <li key={gov}>
            <strong>{gov}</strong>
            <ul>
              {data.govData[gov].map(
                item =>
                  item.description && (
                    <li key={item.description}>
                      {item.name && `${item.name}: `}
                      {`${item.description} `}
                      {govLinks(item)}
                    </li>
                  )
              )}
            </ul>
          </li>
        ))}
      </ul>
      {policyLinks(data)}
    </div>
  );
}

export default SelectedPolicy;
