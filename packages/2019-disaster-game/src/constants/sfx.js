import { Howl } from "howler";

import badChoice from "../../assets/audio/Bad_Choice.mp3";
import goodChoice from "../../assets/audio/good_choice_short.mp3";
import startRecord from "../../assets/audio/Start_Record.mp3";

const BAD_CHOICE = "BAD_CHOICE";
const GOOD_CHOICE = "GOOD_CHOICE";
const START_RECORD = "START_RECORD";

const badChoiceSFX = new Howl({
  src: [badChoice],
  autoplay: false,
  loop: false,
  volume: 0.35
});

const goodChoiceSFX = new Howl({
  src: [goodChoice],
  autoplay: false,
  loop: false,
  volume: 0.35
});

const startRecordSFX = new Howl({
  src: [startRecord],
  autoplay: false,
  loop: false,
  volume: 1
});

const SFX = {
  GOOD_CHOICE: goodChoiceSFX,
  BAD_CHOICE: badChoiceSFX,
  START_RECORD: startRecordSFX
};

export const TYPES = {
  BAD_CHOICE,
  GOOD_CHOICE,
  START_RECORD
};

export default SFX;
