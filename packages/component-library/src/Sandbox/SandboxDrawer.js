import React from "react";
import { css } from "emotion";
import Dropdown from "../Dropdown/Dropdown";
import SandboxDateSelector from "./SandboxDateSelector";

const title = css(`
border-top: 1px solid #ddd;
padding: .3rem .5rem;
background: #eee;
text-transform: capitalize;
font-weight: bold;
`);

const SandboxDrawer = ({
  data,
  onChange,
  selectedSlide,
  selectedPackage,
  toggleDrawer,
  drawerVisible,
  defaultSlides,
  slideData,
  fetchSlideByDate,
  foundationData,
  defaultFoundation
}) => {
  const options = data.packages[selectedPackage].slides.map(slide => ({
    value: slide,
    label: data.slides[slide].name
  }));
  return (
    <div
      className={css(`
    flex-grow: 0;
    width: 20%;
    position:relative;
  `)}
    >
      <div onClick={toggleDrawer}>
        <div
          className={css(`
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: .2rem;
          text-transform: uppercase;
          font-size: .8rem;
          cursor: pointer;
        `)}
        >
          <span>data overlays</span>{" "}
          <span className={css("font-size: 1.2rem; color: rgb(237,73,91);")}>
            {drawerVisible ? "<" : ">"}
          </span>
        </div>
      </div>
      {drawerVisible && (
        <div
          className={css(`
        position: absolute;
        display: block;
        width: 250px;
        z-index: 100;
        right: 0;
        top: 80px;
        right: 15px;
        background: white;

        .Select.is-open { position: relative; z-index: 1000; }
        .Select-menu-outer {
          z-index: 9999;
        }
      `)}
        >
          <div className={css("position: relative; z-index: 5000;")}>
            <Dropdown
              value={selectedSlide.join(",")}
              options={options}
              onChange={onChange}
              multi
              simpleValue
            />
          </div>
          {foundationData && (
            <div>
              <div className={title}>{defaultFoundation.name}</div>
              <div
                className={css(`
              padding: .5rem;
              font-size: .75rem;
              color: #333;
              position: relative;
              z-index: 10
              `)}
              >
                Date info driven by dropdown
                <SandboxDateSelector
                  slide={defaultFoundation}
                  selectedSlideData={foundationData}
                  fetchSlideByDate={fetchSlideByDate}
                  type="foundation"
                />
              </div>
            </div>
          )}

          {defaultSlides.map((slide, index) => {
            let selectedSlideData = {};
            if (slideData.length) {
              selectedSlideData = slideData.find(sData => {
                return sData[slide.name];
              })[slide.name];
            }
            return (
              <div>
                <div className={title}>{slide.name}</div>
                <div
                  className={css(`
                  padding: .5rem;
                  font-size: .75rem;
                  color: #333;
                  position: relative;
                  z-index: ${5 - index}
                  `)}
                >
                  Date info driven by dropdown
                  <SandboxDateSelector
                    selectedSlideData={selectedSlideData}
                    slide={slide}
                    fetchSlideByDate={fetchSlideByDate}
                    type="slide"
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SandboxDrawer;
