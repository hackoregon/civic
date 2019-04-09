import { css, keyframes } from 'emotion';

import housingHero from './assets/collection-hero-housing.jpg';
import budgetHero from './assets/collection-hero-budget.jpg';
import transportationHero from './assets/collection-hero-transportation.jpg';
import emergencyResponseHero from './assets/collection-hero-emergency-response.jpg';
import homelessnessHero from './assets/collection-hero-homelessness.jpg';

console.log(housingHero);

const animControls = '9s step-start infinite running';

const colorSlideshow = keyframes`
  0%     { background-color:rgb(34,15,37); }
  16.0%  { background-color:rgb(34,15,37); }
  33.0%  { background-color:rgb(117,87,141); }
  50.0%  { background-color:rgb(215,27,97); }
  66.0%  { background-color:rgb(63,118,172); }
  83.0%  { background-color:rgb(50,159,151); }
  100.0% { background-color:rgb(34,15,37); }
`;

const step1 = keyframes`
  0%     { opacity:1; color: rgb(117,87,141); }
  16.0%  { opacity:1; color: rgb(117,87,141); }
  33.0%  { opacity:0; }
  100.0% { opacity:0; }
`;

const step2 = keyframes`
  0%     {opacity:0;}
  16.0%  {opacity:0;}
  33.0%  {opacity:1; color: rgb(250,208,99);}
  50.0%  {opacity:0;}
  100.0% {opacity:0;}
`;

const step3 = keyframes`
  0%     {opacity:0;}
  33.0%  {opacity:0;}
  50.0%  {opacity:1; color: rgb(63,118,172);}
  66.0%  {opacity:0;}
  100.0% {opacity:0;}
`;

const step4 = keyframes`
  0%     {opacity:0;}
  50.0%  {opacity:0;}
  66.0%  {opacity:1; color: rgb(232,115,37);}
  83.0%  {opacity:0;}
  100.0% {opacity:0;}
`;

const step5 = keyframes`
  0%     {opacity:0;}
  66.0%  {opacity:0;}
  83.0%  {opacity:1; color: rgb(117,87,141);}
  100.0% {opacity:0;}
`;

const step6 = keyframes`
  0%     {opacity:0;}
  83.0%  {opacity:0;}
  100.0% {opacity:1; color: rgb(238,74,92);}
`;

const styles = {
  Page: css`
    &.Hero {
      height: 35vh;
    }

    & .Container {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;

      & .Content {
        margin: 40px auto;
        max-width: 1200px;
        width: 100%;
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
      }
    }

    & p {
      max-width: 720px;

      &.large {
        font-size: 1.5em;
        line-height: 1.4;
      }
    }

    & ul {
      list-style: none;
      margin: 0;
      padding: 0;

      & li {
        list-style: none;
        margin: 10px 0;
        padding: 0;
        color: rgb(114, 99, 113);

        & h3,
        & h4 {
          color: black;
        }
      }
    }

    & a {
      border-bottom: none;
      text-decoration: none;
    }
  `,
  Hero: css`
    display: flex;
    background-color: rgba(34, 15, 37, 1);
    height: 50vh;
    min-height: 420px;
    width: 100%;
    margin: 0;
    padding: 0;
    background-size: cover;
    background-position: center center;
    z-index: -100;
    align-items: center;
    justify-content: center;

    & > .Container {
      width: 100%;
      max-width: 800px;

      & > .Content {
        position: relative;
        padding: 0px;
      }
    }

    @media screen and (max-width: 1200px) {
      & > .Container > .Content {
        width: calc(100% - 50px);
        padding: 25px;
      }
    }
  `,
  Content: css`
    & > h1 {
      font-size: 3em;
      line-height: 1.25em;
      color: rgba(255, 255, 255, 1);
      font-weight: 100;
    }
  `,
  row: css`
    flex-direction: row;
    width: 100%;
  `,
  column: css`
    flex-direction: column;
    width: calc(33% - 15px);
    padding: 0 15px 0 0;
  `,
  Platform: css`
    &.Hero {
      height: 100vh;
      animation: ${colorSlideshow} ${animControls};
      background-color: rgb(34, 15, 37);

      & .Content {
        width: 100%;
        height: 50vh;
        min-height: 420px;

        & h1 {
          position: absolute;
          text-transform: uppercase;
          font-size: 5em;

          &.step1 {
            animation: ${step1} ${animControls};
          }
          &.step2 {
            animation: ${step2} ${animControls};
          }
          &.step3 {
            animation: ${step3} ${animControls};
          }
          &.step4 {
            animation: ${step4} ${animControls};
          }
          &.step5 {
            animation: ${step5} ${animControls};
          }
          &.step6 {
            animation: ${step6} ${animControls};
          }
        }
      }

      & .Explore {
        font-family: 'Rubik', sans-serif;
        width: 100%;
        margin: 0 auto;
        font-weight: 500;
        text-align: left;
        text-transform: uppercase;
        font-size: 1.5em;
        color: rgba(255, 255, 255, 0.5);
        position: relative;
      }
    }

    &.column {
      width: calc(33% - 15px);
    }
  `,
  Collection: css`
    &.Hero {
      & h1 {
        margin-top: 50px;
      }

      &.Housing { background-image: url('${housingHero}'); }
      &.Budget { background-image: url('${budgetHero}'); }
      &.Transportation { background-image: url('${transportationHero}'); }
      &.EmergencyResponse { background-image: url('${emergencyResponseHero}'); }
      &.Homelessness { background-image: url('${homelessnessHero}'); }
    }

    &.column h3 {
      padding-bottom: 1px;
      border-bottom: 2px solid rgb(34, 15, 37);
    }
  `,
  Tag: css`
    border: 2px solid rgba(255, 255, 255, 0.85);
    padding: 10px;
    font-family: 'Rubik', sans-serif;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.85);
    font-size: 1.25em;
    letter-spacing: 0.025em;
    pointer-events: none;
  `,
  Link: css`
    border-bottom: 2px solid rgba(255, 255, 255, 0.85);
    transition: all 0.2s step-start;
    color: rgba(255, 255, 255, 0.85);
    padding: 6px 6px 6px 6px;
    font-family: 'Rubik', sans-serif;
    font-weight: 500;

    & i {
      margin-left: 12px;
    }

    &:hover {
      border-color: rgba(255, 255, 255, 1);
      color: rgba(255, 255, 255, 1);
    }

    &:focus {
      outline: none;
    }
  `,
};

export default styles;
