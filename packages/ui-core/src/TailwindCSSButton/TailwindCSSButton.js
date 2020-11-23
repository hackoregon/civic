/* eslint-disable import/prefer-default-export */
/** @jsx jsx */
import { jsx } from "@emotion/core";
import "./TailwindCSSButton.css";

export const TailwindCSSButton = () => (
  <div className="wrapper">
    <button type="button" className="btn">
      CSS + Tailwind
    </button>
  </div>
);

TailwindCSSButton.displayName = "TailwindCSSButton";
