import React from 'react';
import { css } from 'emotion';
import { Dropdown } from '../../src';
import SandboxDateSelector from './SandboxDateSelector';

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
}) => {
  const options = data.packages[selectedPackage].slides.map(slide => ({
    value: slide,
    label: data.slides[slide].name,
  }));
  return (
    <div style={{ flexGrow: 0 }}>
      <div onClick={toggleDrawer}>
        {drawerVisible ? 'data overlays arrow left' : 'data overlays arrow right'}
      </div>
      {drawerVisible && <div
        className={css(`
        position: absolute;
        display: block;
        height: 100vh;
        width: 20%;
        z-index: 100;
        right: 0;
        top: 60px;
        background: white;
      `)}
      >
        <Dropdown
          value={selectedSlide.join(',')}
          options={options}
          onChange={onChange}
          multi
          simpleValue
        />
        {defaultSlides.map((slide) => {
          let selectedSlideData = {};
          if (slideData.length) {
            selectedSlideData = slideData.find((sData) => {
              return sData[slide.name];
            })[slide.name];
          }
          return (
            <div>
              <div className={css('background: gray;')}>{slide.name}</div>
              {selectedSlideData.slide_meta.dates.date_granularity ? <div>
                Date info driven by dropdown
                <SandboxDateSelector selectedSlideData={selectedSlideData} slide={slide} fetchSlideByDate={fetchSlideByDate} />
              </div> :
              <div>Default date data (Date granularity = null)</div>
              }
            </div>);
        }) }
      </div>
      }
    </div>
  );
};

export default SandboxDrawer;
