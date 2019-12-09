/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */

/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { Fragment } from "react";
import { ButtonNew } from "@hackoregon/component-library";
import LayerCreateForm from "./LayerCreateForm";
import "@hackoregon/component-library/assets/global.styles.css";
import Collapsable from "./CustomCollapsable";

import iconMapSrc from "../../assets/icon_map.png";
import pathMapSrc from "../../assets/path_map.png";
import scatterplotMapSrc from "../../assets/scatterplot_map.png";
import screenGridMapSrc from "../../assets/screen_grid_map.png";
import smallPolygonMapSrc from "../../assets/small_polygon_map.png";
import choroplethMapSrc from "../../assets/choropleth_map.png";

const formTitle = css`
  font-size: 35px;
  letter-spacing: -2px;
  margin: 10px 0px;
  font-family: "Rubik", "Helvetica Neue", Helvetica, sans-serif;
`;

const body = css`
  font-family: "Roboto Condensed", "Helvetica Neue", Helvetica, sans-serif;
`;

const buttonContainer = css`
  text-align: center;
`;

const sectionHeader = css`
  font-size: 20px;
  letter-spacing: -0.5px;
  margin: 80px 0px 10px 0px;
  font-weight: bold;
  font-family: "Rubik", "Helvetica Neue", Helvetica, sans-serif;
`;

const imgCss = css`
  width: 400px;
`;

const mapSection = css`
  align-items: center;
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  font-size: 16px;
  letter-spacing: -0.5px;
  padding-bottom: 30px;
  font-family: "Roboto Condensed", "Helvetica Neue", Helvetica, sans-serif;
`;

const container = css`
  position: absolute;
  top: 50px;
  left: 25px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  width: 575px;
  background: rgba(243, 242, 243, 0.9);
  color: rgb(85, 85, 85);
  border: 1px solid #ddd;
  border-radius: 2px;
  box-shadow: 5px 5px 15px -3px rgba(0, 0, 0, 0.2);
  @media (max-width: 900px) {
    width: 90%;
    bottom: 30px;
    left: 8%;
  }
`;

function LayerCreateComponent() {
  // const [formToggled, setFormToggled] = useState('all');

  // function handleClick(mapTypeSelected) {
  //   setFormToggled(mapTypeSelected);
  //   console.log('handleClick')
  // }

  function handleEmailButtonClick() {
    window.location.href =
      "mailto:sandbox-grp@civicsoftwarefoundation.org?subject=Data Ingestion Form";
  }

  return (
    <div css={container}>
      <LayerCreateForm
        onSubmit={values => {
          console.log(values);
        }}
        initialValues={{
          email: ""
        }}
      >
        {({ formSections }) => (
          <Fragment>
            <p css={formTitle}>Create a New CIVIC Sandbox Layer</p>
            <p css={body}>
              Let CIVIC Sandbox tell the story of your data. This form will help
              you upload your dataset and choose the best way to display it.
              Currently we support GeoJSON datasets.
            </p>
            <div css={buttonContainer}>
              <ButtonNew
                label="Questions? Click here to email us!"
                onClick={handleEmailButtonClick}
              />
            </div>
            <p css={sectionHeader}>
              First, let&#39;s get the basics out of the way:
            </p>
            {formSections.baseData}
            <p css={sectionHeader}>Okay, tell us more about the data itself:</p>
            {formSections.dataDetails}
            <p css={sectionHeader}>
              Next, let&#39;s choose the best type of map for your data:
            </p>
            <div css={mapSection}>
              <img src={pathMapSrc} css={imgCss} alt="path map" />
              Path map: these maps are good for xxx
              <Collapsable description="form section for path map">
                <Collapsable.Section hidden>
                  {formSections.pathMapType}
                </Collapsable.Section>
              </Collapsable>
            </div>
            <div css={mapSection}>
              <img src={screenGridMapSrc} css={imgCss} alt="screen grid map" />
              Screen Grid map: these maps are good for xxx
              <Collapsable description="form section for screen grid map">
                <Collapsable.Section hidden>
                  {formSections.pathMapType}
                </Collapsable.Section>
              </Collapsable>
            </div>
            <div css={mapSection}>
              <img src={choroplethMapSrc} css={imgCss} alt="choropleth map" />
              Choropleth map: these maps are good for xxx
              <Collapsable description="form section for choropleth map">
                <Collapsable.Section hidden>
                  {formSections.pathMapType}
                </Collapsable.Section>
              </Collapsable>
            </div>
            <div css={mapSection}>
              <img src={scatterplotMapSrc} css={imgCss} alt="scatterplot map" />
              Scatterplot map: these maps are good for xxx
              <Collapsable description="form section for scatterplot map">
                <Collapsable.Section hidden>
                  {formSections.pathMapType}
                </Collapsable.Section>
              </Collapsable>
            </div>
            <div css={mapSection}>
              <img
                src={smallPolygonMapSrc}
                css={imgCss}
                alt="small polygon map"
              />
              Small Polygon map: these maps are good for xxx
              <Collapsable description="form section for small polygon map">
                <Collapsable.Section hidden>
                  {formSections.pathMapType}
                </Collapsable.Section>
              </Collapsable>
            </div>
            <div css={mapSection}>
              <img src={iconMapSrc} css={imgCss} alt="icon map" />
              Icon map: these maps are good for xxx
              <Collapsable description="form section for icon map">
                <Collapsable.Section hidden>
                  {formSections.pathMapType}
                </Collapsable.Section>
              </Collapsable>
            </div>
          </Fragment>
        )}
      </LayerCreateForm>
    </div>
  );
}

LayerCreateComponent.displayName = "LayerCreateComponent";

export default LayerCreateComponent;
