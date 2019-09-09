import { createReducer } from "redux-starter-kit";
// import { Howl, Howler } from "howler";

import { actionTypes as ChapterActionTypes } from "./chapters";

const initialState = {};

// CONSTANTS
export const actionTypes = {};

export const sfx = createReducer(initialState, {
  [ChapterActionTypes.SET_ACTIVE_CHAPTER]: () => {}
});

export default sfx;

/*
var sound = new Howl({
  src: ['sound.webm', 'sound.mp3', 'sound.wav'],
  autoplay: true,
  loop: true,
  volume: 0.5,
  onend: function() {
    console.log('Finished!');
  }
});
*/
