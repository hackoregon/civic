import { Howl } from "howler";
import { basketball, phone } from "./items";
// SFX
import badChoice from "../../assets/audio/bad_choice_short.mp3";
import goodChoice from "../../assets/audio/good_choice_short.mp3";
import startRecord from "../../assets/audio/Start_Record.mp3";
import badBasketball from "../../assets/audio/bad-basketball.mp3";
import badPhone from "../../assets/audio/bad-phone.mp3";
// Themes
import attractorSong from "../../assets/audio/PWolf-happysong1wfadeinout.mp3";
import neutralMood from "../../assets/audio/neutral-mood.mp3";
import kitSong from "../../assets/audio/HappyTheme1fadeinout.mp3";
import earthquakeSong from "../../assets/audio/PWolfEarthquakesound15secmp3.mp3";
// Voice
import letsPrepareBoyVoice from "../../assets/audio/kit_screen/boy_lets_prepare_for_an_earthquake.mp3";
import letsPrepareGirlVoice from "../../assets/audio/kit_screen/girl_lets_prepare_for_an_earthquake.mp3";
import earthquakeBoyVoice from "../../assets/audio/earthquake_screen/boy_earthquake.mp3";
import earthquakeGirlVoice from "../../assets/audio/earthquake_screen/girl_earthquake.mp3";

// SFX
const BAD_CHOICE = "BAD_CHOICE";
const GOOD_CHOICE = "GOOD_CHOICE";
const START_RECORD = "START_RECORD";
// Themes
const THEME_ATTRACTOR = "THEME_ATTRACTOR";
const THEME_NEUTRAL = "THEME_NEUTRAL";
const THEME_KIT = "THEME_KIT";
const THEME_EARTHQUAKE = "THEME_EARTHQUAKE";
// Voice
const LETS_PREPARE_BOY = "LETS_PREPARE_BOY";
const LETS_PREPARE_GIRL = "LETS_PREPARE_GIRL";
const EARTHQUAKE_BOY = "EARTHQUAKE_BOY";
const EARTHQUAKE_GIRL = "EARTHQUAKE_GIRL";

const defaultHowl = {
  autoplay: false,
  loop: false,
  volume: 1
};

// SFX
const badChoiceSFX = new Howl({
  ...defaultHowl,
  src: [badChoice]
});

const goodChoiceSFX = new Howl({
  ...defaultHowl,
  src: [goodChoice],
  volume: 0.35
});

const startRecordSFX = new Howl({
  ...defaultHowl,
  src: [startRecord]
});

const badPhoneSFX = new Howl({
  ...defaultHowl,
  src: [badPhone]
});

const badBasketballSFX = new Howl({
  ...defaultHowl,
  src: [badBasketball]
});

// Themes
const attractorHowl = (() =>
  new Howl({
    src: [attractorSong],
    autoplay: false,
    loop: true,
    volume: 0.25,
    onfade: () => {
      attractorHowl.stop();
    }
  }))();

const neutralHowl = (() =>
  new Howl({
    src: [neutralMood],
    autoplay: false,
    loop: true,
    volume: 0.25,
    onfade: () => {
      neutralHowl.stop();
    }
  }))();

const kitHowl = (() =>
  new Howl({
    src: [kitSong],
    autoplay: false,
    loop: true,
    volume: 0.25,
    onfade: () => {
      kitHowl.stop();
    }
  }))();

const earthquakeHowl = (() =>
  new Howl({
    src: [earthquakeSong],
    autoplay: false,
    loop: true,
    volume: 0.25,
    onfade: () => {
      earthquakeHowl.stop();
    }
  }))();

// Voice
const letsPrepareGirl = new Howl({
  ...defaultHowl,
  src: [letsPrepareGirlVoice]
});

const letsPrepareBoy = new Howl({
  ...defaultHowl,
  src: [letsPrepareBoyVoice]
});

const earthquakeGirl = new Howl({
  ...defaultHowl,
  src: [earthquakeGirlVoice]
});

const earthquakeBoy = new Howl({
  ...defaultHowl,
  src: [earthquakeBoyVoice]
});

const SFX = {
  // SFX
  GOOD_CHOICE: goodChoiceSFX,
  BAD_CHOICE: badChoiceSFX,
  START_RECORD: startRecordSFX,
  [phone]: badPhoneSFX,
  [basketball]: badBasketballSFX,
  // Themes
  THEME_ATTRACTOR: attractorHowl,
  THEME_NEUTRAL: neutralHowl,
  THEME_KIT: kitHowl,
  THEME_EARTHQUAKE: earthquakeHowl,
  // Voice
  LETS_PREPARE_GIRL: letsPrepareGirl,
  LETS_PREPARE_BOY: letsPrepareBoy,
  EARTHQUAKE_GIRL: earthquakeGirl,
  EARTHQUAKE_BOY: earthquakeBoy
};

export const TYPES = {
  // SFX
  BAD_CHOICE,
  GOOD_CHOICE,
  START_RECORD,
  [phone]: phone,
  [basketball]: basketball,
  // Themes
  THEME_ATTRACTOR,
  THEME_NEUTRAL,
  THEME_KIT,
  THEME_EARTHQUAKE,
  // Voice
  LETS_PREPARE_GIRL,
  LETS_PREPARE_BOY,
  EARTHQUAKE_GIRL,
  EARTHQUAKE_BOY
};

export default SFX;
