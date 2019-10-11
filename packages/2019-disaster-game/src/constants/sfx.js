import { Howl } from "howler";
import { basketball, phone } from "./items";

import badChoice from "../../assets/audio/Bad_Choice.mp3";
import goodChoice from "../../assets/audio/Good_Choice.mp3";
import startRecord from "../../assets/audio/Start_Record.mp3";
import badBasketball from "../../assets/audio/bad-basketball.mp3";
import badPhone from "../../assets/audio/bad-phone.mp3";

const BAD_CHOICE = "BAD_CHOICE";
const GOOD_CHOICE = "GOOD_CHOICE";
const START_RECORD = "START_RECORD";

const badChoiceSFX = new Howl({
  src: [badChoice],
  autoplay: false,
  loop: false
});

const goodChoiceSFX = new Howl({
  src: [goodChoice],
  autoplay: false,
  loop: false
});

const startRecordSFX = new Howl({
  src: [startRecord],
  autoplay: false,
  loop: false
});

const badPhoneSFX = new Howl({
  src: [badPhone],
  autoplay: false,
  loop: false
});

const badBasketballSFX = new Howl({
  src: [badBasketball],
  autoplay: false,
  loop: false
});

const SFX = {
  GOOD_CHOICE: goodChoiceSFX,
  BAD_CHOICE: badChoiceSFX,
  START_RECORD: startRecordSFX,
  [phone]: badPhoneSFX,
  [basketball]: badBasketballSFX
};

export const TYPES = {
  BAD_CHOICE,
  GOOD_CHOICE,
  START_RECORD,
  [phone]: phone,
  [basketball]: basketball
};

export default SFX;
