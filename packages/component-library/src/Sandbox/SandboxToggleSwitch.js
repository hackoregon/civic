import React from 'react';
import { css } from 'emotion';

const toggleStyle = css`
  display: flex;
  align-items: center;
  .switch {
    position: relative;
    width: 50px;
    height: 25px;
    outline: none;
  }
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: .4s;
    transition: .4s;
    border-radius: 35px;
  }
  .slider:before {
    position: absolute;
    content: '';
    height: 25px;
    width: 25px;
    left: 4px;
    bottom: 0px;
    background-color: white;
    -webkit-transition: .4s;
    transition: .4s;
    border-radius: 50%;
  }
  input:checked + .slider {
    background-color: darkOrange;
  }
  input:checked + .slider:before {
    -webkit-transform: translateX(18px);
    -ms-transform: translateX(18px);
    transform: translateX(18px);
  }
`;

const SandboxToggleSwitch = (props) => {
  const {
    name,
    checked,
    onChange,
    label
  } = props;
  // console.log(props);
  return (
    <div className={toggleStyle}>
      <label className='switch'>
        <input
          type='checkbox'
          name={name}
          value={checked}
          checked={checked}
          onChange={onChange}
        />
        <div className='slider'></div>
      </label>
      <div style={{'paddingLeft': '2.5%'}}>
        {`${label} - Polygon`}
      </div>
    </div>
  );
};

export default SandboxToggleSwitch;
