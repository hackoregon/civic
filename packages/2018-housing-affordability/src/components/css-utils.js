import { css } from 'emotion';

export const loader = css`
  background: #eee;
  padding: 30px;
`;

export const error = css`
  background: #fee;
  color: #c00;
  padding: 30px;
`;

export const inputClass = css`
  width: 100%;
`;

export const emphasis = css`
  color: #000;
`;

export const gradientLabel = css`
  ${emphasis}
  position: relative;
  bottom: -10px;
  @media (max-width: 640px) {
    bottom: -5px;
  }
`;
