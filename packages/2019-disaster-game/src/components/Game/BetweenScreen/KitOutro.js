/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { memo, useEffect, useState, useCallback } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";

import { goToNextChapter } from "../../../state/chapters";
import Timer from "../../../utils/timer";
import { palette } from "../../../constants/style";
import { dustMask, protectiveGear } from "../../../constants/items";
import { getPlayerKit, getItems, addItemToPlayerKit } from "../../../state/kit";
import KitRow from "../KitScreen/Kit";

const contentWrapper = css`
  height: 100vh;
  width: 100vw;
  z-index: 10;
  display: grid;
  justify-items: center;
  align-items: center;
`;

const contentTitle = css`
  font-family: "Luckiest Guy", sans-serif;
  font-size: 16rem;
  color: ${palette.salmon};
  text-align: center;
  margin: 0;
`;

const kitStyle = css`
  margin: 0 auto;
  width: min-content;
  max-width: 100vw;

  * > .kit-item {
    margin: 0 20px;
  }
`;

const messageContainer = css`
  text-align: center;
  margin-top: 50px;
  opacity: 0;
  transition: opacity 1s;
`;

const showMessageContainter = css`
  opacity: 1;
`;

const messageStyle = css`
  font-family: "Boogaloo", sans-serif;
  font-size: 10rem;
  color: ${palette.salmon};
  margin: 0;
`;

const forgottenItem = css`
  color: ${palette.purple};
  font-weight: 500;
  text-decoration: underline;
`;

const buildMessage = (noDustMask, noProtectiveGear, missingBoth) => (
  <p css={messageStyle}>
    Don&apos;t forget{" "}
    {noDustMask ? (
      <span>
        a <span css={forgottenItem}>dust mask</span>
      </span>
    ) : (
      ""
    )}
    {missingBoth ? " and " : ""}
    {noProtectiveGear ? <span css={forgottenItem}>protective gear</span> : ""}!
  </p>
);

const KitOutro = ({
  playerKit,
  allPossibleItems,
  addItemToKit,
  endChapter
}) => {
  const customContent = {};
  const dustMaskKey = dustMask;
  const protectiveGearKey = protectiveGear;
  const noDustMask = !playerKit[dustMaskKey];
  const noProtectiveGear = !playerKit[protectiveGearKey];
  const missingBoth = noDustMask && noProtectiveGear;

  const [augmentKitTimer] = useState(new Timer());
  const [endChapterTimer] = useState(new Timer());
  const [augmentMessage] = useState(
    buildMessage(noDustMask, noProtectiveGear, missingBoth)
  );
  const [addingToKit, setAddingToKit] = useState(false);

  // eslint-disable-next-line array-callback-return
  Object.keys(playerKit).map(key => {
    if (allPossibleItems[key]) {
      customContent[key] = allPossibleItems[key];
    }
  });

  const augmentKit = useCallback(() => {
    if (noDustMask) {
      const dustMaskDataShape = allPossibleItems[dustMaskKey];
      addItemToKit(dustMaskDataShape);
    }
    if (noProtectiveGear) {
      const dustMaskDataShape = allPossibleItems[protectiveGearKey];
      addItemToKit(dustMaskDataShape);
    }
  }, [
    addItemToKit,
    allPossibleItems,
    dustMaskKey,
    noDustMask,
    noProtectiveGear,
    protectiveGearKey
  ]);

  const startEndChapterTimer = useCallback(() => {
    endChapterTimer.setDuration(7);
    endChapterTimer.addCompleteCallback(() => {
      endChapter();
    });
    endChapterTimer.start();
  }, [endChapter, endChapterTimer]);

  useEffect(() => {
    augmentKitTimer.setDuration(7);
    augmentKitTimer.addCompleteCallback(() => {
      if (noDustMask || noProtectiveGear) {
        augmentKit();
        setAddingToKit(true);
        startEndChapterTimer();
      } else {
        endChapter();
      }
    });
    augmentKitTimer.start();
    return () => {
      augmentKitTimer.stop();
      endChapterTimer.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div css={contentWrapper}>
      <div>
        <p css={contentTitle}>YOU MADE THIS KIT</p>
        <KitRow customContent={customContent} customStyle={kitStyle} />
        <div
          css={css`
            ${messageContainer};
            ${addingToKit ? showMessageContainter : ""}
          `}
        >
          {augmentMessage}
        </div>
      </div>
    </div>
  );
};

KitOutro.propTypes = {
  playerKit: PropTypes.shape({}),
  allPossibleItems: PropTypes.shape({}),
  addItemToKit: PropTypes.func,
  endChapter: PropTypes.func
};

const mapStateToProps = state => ({
  playerKit: getPlayerKit(state),
  allPossibleItems: getItems(state)
});

const mapDispatchToProps = dispatch => ({
  addItemToKit: bindActionCreators(addItemToPlayerKit, dispatch),
  endChapter: bindActionCreators(goToNextChapter, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(memo(KitOutro));
