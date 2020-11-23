/* eslint-disable import/prefer-default-export */
/** @jsx jsx */
import { jsx } from "@emotion/core";
import tw from "twin.macro";

/*
 * The tw macro isn't fully up to date with Tailwind 2 yet
 * (https://github.com/ben-rogerson/twin.macro/issues/190)
 */

const base = tw`relative flex justify-center w-64 min-w-full px-4 py-2 text-sm font-bold leading-5 text-white border border-transparent rounded-md `;
const styles = {
  base,
  button: tw`
    bg-red-600
    hover:bg-red-500
    active:bg-red-700
    transition duration-150 ease-in-out
  `
};

export const TailwindEmotionButton = () => (
  <div css={tw`grid items-center justify-center h-screen`}>
    <button type="button" css={[styles.base, styles.button]}>
      Emotion + Tailwind
    </button>
  </div>
);

TailwindEmotionButton.displayName = "TailwindEmotionButton";
