/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { ChartContainer } from "@hackoregon/component-library";

const infographicContainer = css`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding-top: 20px;
`;

const infographicItem = css`
  width: 290px;
`;

const infographicImg = css`
  width: 100%;
`;

const TemplateMinimalCardVisualization = () => (
  <ChartContainer title="Critical Infrastructure Rendered Unusable">
    <div css={infographicContainer}>
      <div css={infographicItem}>
        <img
          src="https://s3-us-west-2.amazonaws.com/hacko-cdn/2018-disaster-resilience/CriticalEnergy.svg"
          css={infographicImg}
          alt="Oregon Fuel Reserve in NW Industrial. Condition After Quake: Not Functional. Impact To Region: Statewide Fuel Shortage."
        />
      </div>
      <div css={infographicItem}>
        <img
          src="https://s3-us-west-2.amazonaws.com/hacko-cdn/2018-disaster-resilience/Bridge.svg"
          css={infographicImg}
          alt="Portland Bridges. Condition After Quake: Usable: 2, Unusable: 10. Impact to Region: East-west regions will be mostly cut off from each other."
        />
      </div>
      <div css={infographicItem}>
        <img
          src="https://s3-us-west-2.amazonaws.com/hacko-cdn/2018-disaster-resilience/Airport.svg"
          css={infographicImg}
          alt="PDX Airport. Condition After Quake: Unusable. Impact to Region: Difficulties for aid and resources delivery."
        />
      </div>
    </div>
  </ChartContainer>
);

export default TemplateMinimalCardVisualization;
