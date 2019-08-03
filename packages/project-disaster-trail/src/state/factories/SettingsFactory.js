import * as SCREENS from "../../constants/screens";
import * as MODES from "../../constants/modes";

class SETTINGS_FACTORY {}

// perform any dynamic data transformation here
// so the constants are static.
SETTINGS_FACTORY.getInitialSettings = () => {
  const screen = SCREENS.getScreen();
  const mode = MODES.INSTALLATION;

  // mobile first
  const initialState = {
    orbCount: 10,
    orbSize: 40,
    period: 1,
    minVelocityX: -0.5,
    maxVelocityX: -2,
    minVelocityY: 0,
    maxVelocityY: 0,
    mode
  };

  // Different settings for desktop
  if (screen === SCREENS.LG) {
    initialState.orbCount = 20;
    initialState.orbSize = 50;
    initialState.minVelocityX = -2;
    initialState.maxVelocityX = -0.2;
    initialState.minVelocityY = 0;
    initialState.maxVelocityY = 0;
    initialState.period = 1;
  }

  // settings for large touch display
  if (screen === SCREENS.XL) {
    initialState.orbCount = 40;
    initialState.orbSize = 100;
    initialState.period = 5;
    initialState.minVelocityX = -15;
    initialState.maxVelocityX = -3;
    initialState.minVelocityY = 0;
    initialState.maxVelocityY = 0;
  }

  return initialState;
};

export default SETTINGS_FACTORY;
