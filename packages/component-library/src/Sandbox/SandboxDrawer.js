import React from 'react';
import { css } from 'emotion';
import Dropdown from '../Dropdown/Dropdown';
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
  foundationData,
  defaultFoundation,
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
        {foundationData && <div>
          <div className={css('background: gray;')}>{defaultFoundation.name}</div>
          <div>
            Date info driven by dropdown
            <SandboxDateSelector slide={defaultFoundation} selectedSlideData={foundationData} fetchSlideByDate={fetchSlideByDate} type="foundation" />
          </div>
        </div>
        }

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
              <div>
                Date info driven by dropdown
                <SandboxDateSelector selectedSlideData={selectedSlideData} slide={slide} fetchSlideByDate={fetchSlideByDate} type="slide" />
              </div>
            </div>);
        }) }
      </div>
      }
    </div>
  );
};

export default SandboxDrawer;
