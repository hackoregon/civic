/** @jsx jsx */
import { css, jsx, keyframes } from "@emotion/core";
import { memo, Fragment, useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import {
  playAudio as _playAudio,
  stopAudio as _stopAudio
} from "../../../state/sfx";
import {
  goToNextChapter,
  getActiveChapterDuration
} from "../../../state/chapters";
import { getKitCreationItems, getPlayerKit } from "../../../state/kit";
import { addBadge } from "../../../state/user";
import usePrevious from "../../../state/hooks/usePrevious";
import { TYPES as SFX_TYPES } from "../../../constants/sfx";
import { palette } from "../../../constants/style";
import Timer from "../../../utils/timer";
import NewBadge from "../../atoms/NewBadge";
import RestartModal from "../../atoms/RestartModal";
import MatchLockInterface from "../../atoms/MatchLockInterface";
import { MapStyle } from "../index";
import Kit from "./Kit";

const slide = keyframes`
  0% {
    transform: translateX(-25%);
  }
  100% {
    transform: translateX(25%);
  }
`;

const bg = css`
  animation: ${slide} 6s ease-in-out infinite alternate;
  background-image: linear-gradient(
    -60deg,
    ${palette.lightLime} 50%,
    ${palette.lemon} 50%
  );
  bottom: 0;
  left: -50%;
  opacity: 0.5;
  position: fixed;
  right: -50%;
  top: 0;
`;

const bg2 = css`
  animation-direction: alternate-reverse;
  animation-duration: 8s;
`;

const bg3 = css`
  animation-duration: 10s;
`;

const KitScreen = ({
  possibleItems,
  playerKit,
  addPreparerBadge,
  endChapter,
  chapterDuration,
  restartGame,
  playAudio,
  stopAudio
}) => {
  const [chapterTimer] = useState(new Timer());
  const [restartTimer] = useState(new Timer());
  const [displayBadge, setDisplayBadge] = useState(false);
  const [showRestart, setShowRestart] = useState(false);
  const prevPlayerKit = usePrevious(playerKit);
  const prevShowRestart = usePrevious(showRestart);

  // start a timer for the _entire_ chapter
  useEffect(() => {
    chapterTimer.setDuration(chapterDuration);
    chapterTimer.addCompleteCallback(() => endChapter());
    chapterTimer.start();
    return () => {
      chapterTimer.stop();
    };
  }, [chapterDuration, chapterTimer, endChapter]);

  useEffect(() => {
    const playerKitChanged =
      prevPlayerKit &&
      Object.keys(prevPlayerKit).length !== Object.keys(playerKit).length;
    // minus the 2 bad items
    const allItemsChosen =
      Object.keys(playerKit).length === Object.keys(possibleItems).length - 2;

    if (playerKitChanged && allItemsChosen) {
      chapterTimer.reset();
      addPreparerBadge("prepared", "preparerBadge");
      setDisplayBadge(true);
      chapterTimer.setDuration(8);
      chapterTimer.addCompleteCallback(() => endChapter());
      chapterTimer.start();
    }
  }, [
    addPreparerBadge,
    chapterTimer,
    endChapter,
    playerKit,
    possibleItems,
    prevPlayerKit
  ]);

  const startRestartTimer = useCallback(() => {
    restartTimer.setDuration(10);
    restartTimer.addCompleteCallback(() => {
      restartGame();
    });
    restartTimer.start();
  }, [restartGame, restartTimer]);

  useEffect(() => {
    if (showRestart && prevShowRestart !== showRestart) {
      startRestartTimer();
    }
  }, [prevShowRestart, showRestart, startRestartTimer]);

  // Clean up only on dismount
  useEffect(() => {
    playAudio(SFX_TYPES.THEME_KIT);

    return () => {
      restartTimer.reset();
      stopAudio(SFX_TYPES.THEME_KIT);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const noInteractionCallback = () => {
    setShowRestart(true);
  };

  const cancelRestart = () => {
    restartTimer.reset();
    setShowRestart(false);
  };

  return (
    <Fragment>
      {displayBadge && <NewBadge type="prepared" />}
      {showRestart && (
        <RestartModal cancelRestart={cancelRestart} restartGame={restartGame} />
      )}
      <MapStyle>
        <div css={bg} />
        <div css={[bg, bg2]} />
        <div css={[bg, bg3]} />
        <Kit />
        {/* somehow adding this comment fixes the production build -- it's related to @babel/plugin-transform-react-constant-elements */}
      </MapStyle>
      <MatchLockInterface
        activeScreen="kit"
        interfaceMessage="What do we need?"
        noInteractionCallback={noInteractionCallback}
        noInteractionDuration={14}
      />
    </Fragment>
  );
};

KitScreen.propTypes = {
  possibleItems: PropTypes.arrayOf(
    PropTypes.shape({
      imageSVG: PropTypes.string,
      good: PropTypes.bool,
      onSelection: PropTypes.func,
      weighting: PropTypes.number
    })
  ),
  endChapter: PropTypes.func,
  chapterDuration: PropTypes.number,
  playerKit: PropTypes.shape({}),
  addPreparerBadge: PropTypes.func,
  restartGame: PropTypes.func,
  playAudio: PropTypes.func,
  stopAudio: PropTypes.func
};

const mapStateToProps = state => ({
  possibleItems: getKitCreationItems(state),
  chapterDuration: getActiveChapterDuration(state),
  playerKit: getPlayerKit(state)
});

const mapDispatchToProps = dispatch => ({
  addPreparerBadge: bindActionCreators(addBadge, dispatch),
  endChapter: bindActionCreators(goToNextChapter, dispatch),
  playAudio: bindActionCreators(_playAudio, dispatch),
  stopAudio: bindActionCreators(_stopAudio, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(memo(KitScreen));
