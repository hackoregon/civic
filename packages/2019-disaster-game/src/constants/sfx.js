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
// Voice
import letsPrepareBoyVoice from "../../assets/audio/kit_screen/boy_lets_prepare_for_an_earthquake.mp3";
import letsPrepareGirlVoice from "../../assets/audio/kit_screen/girl_lets_prepare_for_an_earthquake.mp3";

// SFX
const BAD_CHOICE = "BAD_CHOICE";
const GOOD_CHOICE = "GOOD_CHOICE";
const START_RECORD = "START_RECORD";
// Themes
const THEME_ATTRACTOR = "THEME_ATTRACTOR";
const THEME_NEUTRAL = "THEME_NEUTRAL";
const THEME_KIT = "THEME_KIT";
// Voice
const LETS_PREPARE_BOY = "LETS_PREPARE_BOY";
const LETS_PREPARE_GIRL = "LETS_PREPARE_GIRL";

// SFX
const badChoiceSFX = new Howl({
  src: [badChoice],
  autoplay: false,
  loop: false,
  volume: 1
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

// Voice
const letsPrepareGirl = new Howl({
  src: [letsPrepareGirlVoice],
  autoplay: false,
  loop: false,
  volume: 1
});

const letsPrepareBoy = new Howl({
  src: [letsPrepareBoyVoice],
  autoplay: false,
  loop: false,
  volume: 1
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
  // Voice
  LETS_PREPARE_GIRL: letsPrepareGirl,
  LETS_PREPARE_BOY: letsPrepareBoy
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
  // Voice
  LETS_PREPARE_GIRL,
  LETS_PREPARE_BOY
};

export default SFX;
