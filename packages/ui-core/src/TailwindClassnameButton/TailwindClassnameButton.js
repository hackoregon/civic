/* eslint-disable import/prefer-default-export */
/** @jsx jsx */
import { jsx } from "@emotion/core";

/* 
  INLINE CLASSNAMES
  Allows autocomplete
  Doesn't require naming
  Need to find appropriate pattern for re-use
*/

// export const TailwindClassnameButton = () => (
//   <div className="grid items-center justify-center h-screen">
//     <button
//       type="button"
//       className="relative flex justify-center px-4 py-2 w-64 min-w-full text-white text-sm font-bold leading-4 hover:bg-red-500 bg-red-600 active:bg-red-700 border border-transparent focus:border-transparent rounded-md focus:outline-none transition duration-150 ease-in-out focus:ring-purple focus:ring-2"
//     >
//       className + Tailwind
//     </button>
//   </div>
// );

/* 
  ALTERNATE APPROACH – EXTRACTING STYLES INTO CONSTANTS 
  Doesn't allow for autocomplete
  Requires naming
  Does allow for reuse
*/

const styles = {
  container: "grid items-center justify-center h-screen",
  button:
    "bg-blue text-white py-2 px-4 shadow hover:shadow-hover active:shadow-active uppercase font-sans cursor-pointer"
};

export const TailwindClassnameButton = () => (
  <div className={styles.container}>
    <button type="button" className={styles.button}>
      Button
    </button>
  </div>
);

TailwindClassnameButton.displayName = "TailwindClassnameButton";
