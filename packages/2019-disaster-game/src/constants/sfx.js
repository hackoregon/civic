import { Howl } from "howler";
import { basketball, phone } from "./items";
// SFX
import badChoice from "../../assets/audio/bad_choice_short.mp3";
import goodChoice from "../../assets/audio/good_choice_short.mp3";
import startRecord from "../../assets/audio/Start_Record.mp3";
import badBasketball from "../../assets/audio/bad-basketball.mp3";
import badPhone from "../../assets/audio/bad-phone.mp3";
import badgeEarned from "../../assets/audio/badge-earned.mp3";
// Themes
import attractorSong from "../../assets/audio/PWolf-happysong1wfadeinout.mp3";
import neutralMood from "../../assets/audio/neutral-mood.mp3";
import kitSong from "../../assets/audio/HappyTheme1fadeinout.mp3";
import earthquakeSong from "../../assets/audio/PWolfEarthquakesound15secmp3.mp3";
import tasksSong from "../../assets/audio/HappyTheme2fadeinout.mp3";
import summarySong from "../../assets/audio/summary_screen/summary_song.mp3";
// Voice
import letsPrepareBoyVoice from "../../assets/audio/kit_screen/boy_lets_prepare_for_an_earthquake.mp3";
import letsPrepareGirlVoice from "../../assets/audio/kit_screen/girl_lets_prepare_for_an_earthquake.mp3";
import earthquakeBoyVoice from "../../assets/audio/earthquake_screen/boy_earthquake.mp3";
import earthquakeGirlVoice from "../../assets/audio/earthquake_screen/girl_earthquake.mp3";
import tasksVoteInstructionVoice from "../../assets/audio/task_screen/boy/who_should_we_help_next.mp3";
import tasksMotivateVoice from "../../assets/audio/task_screen/boy/lets_go_do_it_enthusiastic.mp3";
import summaryMotivationalVoice from "../../assets/audio/summary_screen/8_boy_you_did_great.mp3";
import summaryPlanVoice from "../../assets/audio/summary_screen/makePlan.mp3";
import summaryCommunityVoice from "../../assets/audio/summary_screen/meetNeighbors.mp3";
import summaryKitVoice from "../../assets/audio/summary_screen/buildKit.mp3";
// Tasks
/* BOY VOICE AUDIO */
// Task instruction audio
import rubbleInstructionBoyVoice from "../../assets/audio/task_screen/boy/rubble.mp3";
import dustInstructionBoyVoice from "../../assets/audio/task_screen/boy/dust.mp3";
import hungerInstructionBoyVoice from "../../assets/audio/task_screen/boy/hunger.mp3";
import holeInstructionBoyVoice from "../../assets/audio/task_screen/boy/hole.mp3";
import coldInstructionBoyVoice from "../../assets/audio/task_screen/boy/cold.mp3";
import lostPetInstructionBoyVoice from "../../assets/audio/task_screen/boy/lost_pet.mp3";
import injuryInstructionBoyVoice from "../../assets/audio/task_screen/boy/injury.mp3";
import fireInstructionBoyVoice from "../../assets/audio/task_screen/boy/fire.mp3";
// Task question audio
import defaultQuestionBoyVoice from "../../assets/audio/task_screen/boy/how_can_i_help.mp3";
import dustQuestionBoyVoice from "../../assets/audio/task_screen/boy/question_dust.mp3";
import rubbleQuestionBoyVoice from "../../assets/audio/task_screen/boy/question_rubble.mp3";
import coldQuestionBoyVoice from "../../assets/audio/task_screen/boy/question_cold.mp3";
/* GIRL VOICE AUDIO */
// Task instruction audio
import dustInstructionGirlVoice from "../../assets/audio/task_screen/girl/dust.mp3";
import hungerInstructionGirlVoice from "../../assets/audio/task_screen/girl/hunger.mp3";
import thirstInstructionGirlVoice from "../../assets/audio/task_screen/girl/thirst.mp3";
// Task question audio
import defaultQuestionGirlVoice from "../../assets/audio/task_screen/girl/how_can_i_help.mp3";
import rubbleQuestionGirlVoice from "../../assets/audio/task_screen/girl/rubble.mp3";

// SFX
const BAD_CHOICE = "BAD_CHOICE";
const GOOD_CHOICE = "GOOD_CHOICE";
const START_RECORD = "START_RECORD";
const BADGE_EARNED_SFX = "BADGE_EARNED_SFX";
// Themes
const THEME_ATTRACTOR = "THEME_ATTRACTOR";
const THEME_NEUTRAL = "THEME_NEUTRAL";
const THEME_KIT = "THEME_KIT";
const THEME_EARTHQUAKE = "THEME_EARTHQUAKE";
const THEME_TASKS = "THEME_TASKS";
const THEME_SUMMARY = "THEME_SUMMARY";
// Voice
const LETS_PREPARE_BOY = "LETS_PREPARE_BOY";
const LETS_PREPARE_GIRL = "LETS_PREPARE_GIRL";
const EARTHQUAKE_BOY = "EARTHQUAKE_BOY";
const EARTHQUAKE_GIRL = "EARTHQUAKE_GIRL";
const TASKS_VOTE_INSTRUCTION = "TASKS_VOTE_INSTRUCTION";
const TASKS_MOTIVATE = "TASKS_MOTIVATE";
const SUMMARY_MOTIVATION = "SUMMARY_MOTIVATION";
const SUMMARY_PLAN = "SUMMARY_PLAN";
const SUMMARY_COMMUNITY = "SUMMARY_COMMUNITY";
const SUMMARY_KIT = "SUMMARY_KIT";
// Tasks
const rubbleInstructionBoy = "rubbleInstructionBoy";
const dustInstructionBoy = "dustInstructionBoy";
const hungerInstructionBoy = "hungerInstructionBoy";
const holeInstructionBoy = "holeInstructionBoy";
const coldInstructionBoy = "coldInstructionBoy";
const lostPetInstructionBoy = "lostPetInstructionBoy";
const injuryInstructionBoy = "injuryInstructionBoy";
const fireInstructionBoy = "fireInstructionBoy";
const defaultQuestionBoy = "defaultQuestionBoy";
const dustQuestionBoy = "dustQuestionBoy";
const rubbleQuestionBoy = "rubbleQuestionBoy";
const coldQuestionBoy = "coldQuestionBoy";
const dustInstructionGirl = "dustInstructionGirl";
const hungerInstructionGirl = "hungerInstructionGirl";
const thirstInstructionGirl = "thirstInstructionGirl";
const defaultQuestionGirl = "defaultQuestionGirl";
const rubbleQuestionGirl = "rubbleQuestionGirl";

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

const badgeEarnedSFX = new Howl({
  ...defaultHowl,
  src: [badgeEarned],
  volume: 0.25
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

const tasksHowl = (() =>
  new Howl({
    src: [tasksSong],
    autoplay: false,
    loop: true,
    volume: 0.25,
    onfade: () => {
      tasksHowl.stop();
    }
  }))();

const summaryHowl = (() =>
  new Howl({
    src: [summarySong],
    autoplay: false,
    loop: true,
    volume: 0.25,
    onfade: () => {
      summaryHowl.stop();
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

const tasksVoteInstruction = new Howl({
  ...defaultHowl,
  src: [tasksVoteInstructionVoice]
});

const tasksMotivate = new Howl({
  ...defaultHowl,
  src: [tasksMotivateVoice]
});

const summaryMotivation = new Howl({
  ...defaultHowl,
  src: [summaryMotivationalVoice]
});

const summaryPlan = new Howl({
  ...defaultHowl,
  src: [summaryPlanVoice]
});

const summaryCommunity = new Howl({
  ...defaultHowl,
  src: [summaryCommunityVoice]
});

const summaryKit = new Howl({
  ...defaultHowl,
  src: [summaryKitVoice]
});

// Tasks
const rubbleInstructionBoyHowl = new Howl({
  ...defaultHowl,
  src: [rubbleInstructionBoyVoice]
});

const dustInstructionBoyHowl = new Howl({
  ...defaultHowl,
  src: [dustInstructionBoyVoice]
});

const hungerInstructionBoyHowl = new Howl({
  ...defaultHowl,
  src: [hungerInstructionBoyVoice]
});

const holeInstructionBoyHowl = new Howl({
  ...defaultHowl,
  src: [holeInstructionBoyVoice]
});

const coldInstructionBoyHowl = new Howl({
  ...defaultHowl,
  src: [coldInstructionBoyVoice]
});

const lostPetInstructionBoyHowl = new Howl({
  ...defaultHowl,
  src: [lostPetInstructionBoyVoice]
});

const injuryInstructionBoyHowl = new Howl({
  ...defaultHowl,
  src: [injuryInstructionBoyVoice]
});

const fireInstructionBoyHowl = new Howl({
  ...defaultHowl,
  src: [fireInstructionBoyVoice]
});

const defaultQuestionBoyHowl = new Howl({
  ...defaultHowl,
  src: [defaultQuestionBoyVoice]
});

const dustQuestionBoyHowl = new Howl({
  ...defaultHowl,
  src: [dustQuestionBoyVoice]
});

const rubbleQuestionBoyHowl = new Howl({
  ...defaultHowl,
  src: [rubbleQuestionBoyVoice]
});

const coldQuestionBoyHowl = new Howl({
  ...defaultHowl,
  src: [coldQuestionBoyVoice]
});

const hungerInstructionGirlHowl = new Howl({
  ...defaultHowl,
  src: [hungerInstructionGirlVoice]
});

const dustInstructionGirlHowl = new Howl({
  ...defaultHowl,
  src: [dustInstructionGirlVoice]
});

const thirstInstructionGirlHowl = new Howl({
  ...defaultHowl,
  src: [thirstInstructionGirlVoice]
});

const defaultQuestionGirlHowl = new Howl({
  ...defaultHowl,
  src: [defaultQuestionGirlVoice]
});

const rubbleQuestionGirlHowl = new Howl({
  ...defaultHowl,
  src: [rubbleQuestionGirlVoice]
});

export const tasksAudio = {
  rubbleInstructionBoy: rubbleInstructionBoyHowl,
  dustInstructionBoy: dustInstructionBoyHowl,
  hungerInstructionBoy: hungerInstructionBoyHowl,
  holeInstructionBoy: holeInstructionBoyHowl,
  coldInstructionBoy: coldInstructionBoyHowl,
  lostPetInstructionBoy: lostPetInstructionBoyHowl,
  injuryInstructionBoy: injuryInstructionBoyHowl,
  fireInstructionBoy: fireInstructionBoyHowl,
  defaultQuestionBoy: defaultQuestionBoyHowl,
  dustQuestionBoy: dustQuestionBoyHowl,
  rubbleQuestionBoy: rubbleQuestionBoyHowl,
  coldQuestionBoy: coldQuestionBoyHowl,
  dustInstructionGirl: dustInstructionGirlHowl,
  hungerInstructionGirl: hungerInstructionGirlHowl,
  thirstInstructionGirl: thirstInstructionGirlHowl,
  defaultQuestionGirl: defaultQuestionGirlHowl,
  rubbleQuestionGirl: rubbleQuestionGirlHowl
};

const SFX = {
  // SFX
  GOOD_CHOICE: goodChoiceSFX,
  BAD_CHOICE: badChoiceSFX,
  START_RECORD: startRecordSFX,
  [phone]: badPhoneSFX,
  [basketball]: badBasketballSFX,
  BADGE_EARNED_SFX: badgeEarnedSFX,
  // Themes
  THEME_ATTRACTOR: attractorHowl,
  THEME_NEUTRAL: neutralHowl,
  THEME_KIT: kitHowl,
  THEME_EARTHQUAKE: earthquakeHowl,
  THEME_TASKS: tasksHowl,
  THEME_SUMMARY: summaryHowl,
  // Voice
  LETS_PREPARE_GIRL: letsPrepareGirl,
  LETS_PREPARE_BOY: letsPrepareBoy,
  EARTHQUAKE_GIRL: earthquakeGirl,
  EARTHQUAKE_BOY: earthquakeBoy,
  TASKS_VOTE_INSTRUCTION: tasksVoteInstruction,
  TASKS_MOTIVATE: tasksMotivate,
  SUMMARY_MOTIVATION: summaryMotivation,
  SUMMARY_PLAN: summaryPlan,
  SUMMARY_COMMUNITY: summaryCommunity,
  SUMMARY_KIT: summaryKit,
  // Tasks
  ...tasksAudio
};

export const TYPES = {
  // SFX
  BAD_CHOICE,
  GOOD_CHOICE,
  START_RECORD,
  [phone]: phone,
  [basketball]: basketball,
  BADGE_EARNED_SFX,
  // Themes
  THEME_ATTRACTOR,
  THEME_NEUTRAL,
  THEME_KIT,
  THEME_EARTHQUAKE,
  THEME_TASKS,
  THEME_SUMMARY,
  // Voice
  LETS_PREPARE_GIRL,
  LETS_PREPARE_BOY,
  EARTHQUAKE_GIRL,
  EARTHQUAKE_BOY,
  TASKS_VOTE_INSTRUCTION,
  TASKS_MOTIVATE,
  SUMMARY_MOTIVATION,
  SUMMARY_PLAN,
  SUMMARY_COMMUNITY,
  SUMMARY_KIT,
  // Tasks
  rubbleInstructionBoy,
  dustInstructionBoy,
  hungerInstructionBoy,
  holeInstructionBoy,
  coldInstructionBoy,
  lostPetInstructionBoy,
  injuryInstructionBoy,
  fireInstructionBoy,
  defaultQuestionBoy,
  dustQuestionBoy,
  rubbleQuestionBoy,
  coldQuestionBoy,
  dustInstructionGirl,
  hungerInstructionGirl,
  thirstInstructionGirl,
  defaultQuestionGirl,
  rubbleQuestionGirl
};

export default SFX;
