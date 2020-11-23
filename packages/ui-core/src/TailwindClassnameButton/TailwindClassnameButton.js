/* eslint-disable import/prefer-default-export */
/** @jsx jsx */
import { jsx } from "@emotion/core";

/* 
  INLINE CLASSNAMES
  Allows autocomplete
  Doesn't require naming
  Need to find appropriate pattern for re-use
*/

export const TailwindClassnameButton = () => (
  <div className="grid items-center justify-center h-screen">
    <button
      type="button"
      className="relative flex justify-center w-64 min-w-full px-4 py-2 text-sm font-bold leading-4 text-white border border-transparent rounded-md bg-red-600 hover:bg-red-500 active:bg-red-700 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
    >
      className + Tailwind
    </button>
  </div>
);

/* 
  ALTERNATE APPROACH – EXTRACTING STYLES INTO CONSTANTS 
  Doesn't allow for autocomplete
  Requires naming
  Does allow for reuse
*/

// const styles = {
//   container: "grid items-center justify-center h-screen",
//   button: "relative flex justify-center w-64 min-w-full px-4 py-2 text-sm font-bold leading-4 text-white border border-transparent rounded-md bg-red-600 hover:bg-red-500 active:bg-red-700 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
// }

// export const TailwindClassnameButton = () => (
//   <div className={styles.container}>
//     <button
//       type="button"
//       className={styles.button}
//     >
//       Emotion + Tailwind
//     </button>
//   </div>
// );

TailwindClassnameButton.displayName = "TailwindClassnameButton";
