import React from "react";
import { css } from "emotion";
import Dropdown from "../Dropdown/Dropdown";
import SandboxDateSelector from "./SandboxDateSelector";

const menuOpen = css(`
  flex-grow: 0;
  width: 25%;
  position: absolute;
  right: 0;
  z-index: 5;
  top: 4.5%;
  transition: 0.5s;
`);

const menuClosed = css(`
  flex-grow: 0;
  width: 5%;
  position: absolute;
  right: 0;
  z-index: 5;
  top: 4.5%;
  transition: 0.5s;
`);

const SandboxDrawer = ({
  data,
  onChangeCheckbox,
  selectedSlide,
  selectedPackage,
  toggleDrawer,
  drawerVisible,
  defaultSlides,
  slideData,
  fetchSlideByDate,
  foundationData,
  defaultFoundation,
  allSlides,
  updatePackage,
  selectedFoundation,
  updateFoundation
}) => {
  return (
    <div
      className={drawerVisible ? menuOpen : menuClosed}
    >
      {/* TOGGLE BUTTON  */}
      <div onClick={toggleDrawer}>
        <div className={css(`
          display: flex;
          align-items: center;
          justify-content: space-between;
          text-transform: uppercase;
          font-size: 1rem;
          cursor: pointer;
          background: #EE495C;
          color: #F3F2F3;
          height: auto;
        `)}>
          <strong className={css(`
            font-size: 1.1rem;
            color: #F3F2F3;
            padding: 5px 0 5px 5px;
            line-height: 1.5;
          `)}>
            {drawerVisible ? "Close Menu" : "Open Menu"}
          </strong>
        </div>
      </div>
      {/* SIDE MENU */}
      {drawerVisible && (
        <div className={css(`
          position: absolute;
          display: block;
          width: 100%;
          z-index: 100;
          background: #EEE;
          height: 72vh;
          overflow-y: auto;
          background: #F3F2F3;
          .Select.is-open { position: relative; z-index: 1000; }
          .Select-menu-outer { z-index: 9999; }
        `)}>
          {/* DATA COLLECTION SELECTOR */}
          <div className={css(`
            position: relative;
            z-index: 900;
          `)}
          >
            <h2 className={css(`
              color: #555;
              text-transform: uppercase;
              margin: 0 10px;
            `)}>
              Data Collections
            </h2>
            <Dropdown
              value={selectedPackage}
              options={Object.keys(data.packages).map(p => ({
                value: p,
                label: p,
              }))}
              onChange={updatePackage}
              simpleValue
            />
          </div>
          {/* BASE LAYER SELECTOR */}
          <div className={css(`
            position: relative;
            z-index: 400;
          `)}>
            <h2 className={css(`
              color: #555;
              text-transform: uppercase;
              margin: 0 10px;
            `)}>
              Base Layers
            </h2>
            <Dropdown
              value={selectedFoundation}
              options={data.packages[selectedPackage].foundations.map(
                foundation => ({
                  value: foundation,
                  label: data.foundations[foundation].name,
                })
              )}
              onChange={updateFoundation}
              simpleValue
            />
          </div>
          {/* BASE LAYER YEAR SELCTOR */}
          {foundationData && (
            <div>
              <div className={css(`
                border-top: 1px solid #ddd;
                padding: .3rem .5rem;
                text-transform: capitalize;
                font-weight: bold;
              `)}>
                {"Year"}
              </div>
              <div className={css(`
                padding: .5rem;
                font-size: .75rem;
                color: #333;
                position: relative;
                z-index: 300;
              `)}>
                <SandboxDateSelector
                  slide={defaultFoundation}
                  selectedSlideData={foundationData}
                  fetchSlideByDate={fetchSlideByDate}
                  type="foundation"
                />
              </div>
            </div>
          )}
          {/* SLIDE CHECKBOX INPUTS */}
          <div className={css(`
            position: relative;
            z-index: 200;
          `)}>
            <h2 className={css(`
              color: #555;
              text-transform: uppercase;
              margin: 0 10px;
            `)}>
              Slide Layers
            </h2>
          </div>
          {allSlides.map((slide, index) => {
            const selectedSlideData = !!slideData.find(slideDatum => slideDatum[slide.label])
              ? slideData.find(slideDatum => slideDatum[slide.label])[slide.label]
              : {};
            const defaultGray = [238, 238, 238, 255];
            const backgroundSlideColor = slide.color;
            const formatBackgroundColor = arr => arr.reduce((acc,cur,i) => i < 3 ? acc + cur +"," : acc +"1)", "rgba(");
            const slideBackGroundColor = formatBackgroundColor(backgroundSlideColor);
            const blackTextColor = "rgba(0,0,0,1)";
            const whiteTextColor = "rgba(255,255,255,1)";
            const textColor = slideBackGroundColor === defaultGray ? blackTextColor : whiteTextColor;
            return (
              <div key={"slide-selector" + index}>
                <div className={css(`
                  border-top: 1px solid #ddd;
                  padding: .3rem .5rem;
                  text-transform: capitalize;
                  font-weight: bold;
                  background: ${slideBackGroundColor};
                  color:${textColor}
                `)}>
                  <input
                    type="checkbox"
                    name={slide.slideNumber}
                    checked={slide.checked}
                    onChange={onChangeCheckbox}
                    className="input-checkbox"
                  />
                  {`${slide.label} - Polygon`}
                </div>
                {selectedSlideData.slide_data && (
                  <div className={css(`
                    padding: .5rem;
                    font-size: .75rem;
                    color: #333;
                    position: relative;
                    z-index: ${10 - index}
                  `)}>
                    <SandboxDateSelector
                      selectedSlideData={selectedSlideData}
                      slide={slide}
                      fetchSlideByDate={fetchSlideByDate}
                      type="slide"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SandboxDrawer;
