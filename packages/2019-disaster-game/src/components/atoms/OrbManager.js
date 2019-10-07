/* eslint-disable import/no-named-as-default */
import React, {
  useLayoutEffect,
  useState,
  memo,
  useRef,
  useCallback
} from "react";
import { connect } from "react-redux";
import { map, find as _find, filter } from "lodash";
import styled from "@emotion/styled";

import { palette } from "../../constants/style";
import { TYPES as SFX_TYPES } from "../../constants/sfx";
import { MOVING_MAP } from "../../constants/actions";
import useBounds from "../../state/hooks/useBounds";
import usePrevious from "../../state/hooks/usePrevious";
import useAnimationFrame from "../../state/hooks/useAnimationFrame";
import { getTaskPhase } from "../../state/tasks";
import { playSFX as _playSFX } from "../../state/sfx";

import Orb from "./Orb";
import {
  completedOrbHandler,
  createRandomLayout,
  incompleteOrbHandler
} from "./OrbManagerHelpers";

const ORB_CONFIG = {
  period: 1,
  orbCount: 50,
  orbSize: 120,
  maxVelocityY: 0,
  minVelocityX: 0.5,
  minVelocityY: 0,
  maxVelocityX: 2,
  verticalBuffer: 90
};

/**
 * OrbManager is responsible for moving Orbs
 *
 * @param {*} { orbCount=2 } how many orbModels should be rendered?
 * @param {*} { velocityX=2 } how fast does the orb move horizontally
 * @param {*} { velocityY=0 } how fast does the orb move vertically
 * @param {*} { period=2 } how much vertical modulation per frame should the orb move? Higher number = more 'wobbly'
 * @returns
 */
const OrbManager = ({
  possibleItems,
  matchLockableTypes,
  onOrbSelection,
  checkItemIsCorrect,
  playSFX,
  taskPhase
} = {}) => {
  const [hasInitialized, setHasInitialized] = useState(false);
  const [orbModels, setOrbModelsState] = useState([]);
  const [touchedOrbsByType, setTouchedOrbsByType] = useState(
    possibleItems.reduce((orbsByType, possibleItem) => {
      return {
        multiTouchType: null,
        multiTouchDurationLeft: null,
        ...orbsByType,
        [possibleItem.type]: new Set()
      };
    }, {})
  );
  const [completedOrbs, setCompletedOrbs] = useState([]);
  const [orbsZIndex, setOrbsZIndex] = useState([]);
  // tick is used to modulate movement based on an incrementing value
  const [tick, setTick] = useState(0);

  // the boundaries of the OrbManagers area
  const boundsRef = useRef();
  const bounds = useBounds(boundsRef);
  const prevBounds = usePrevious(bounds);
  const prevTaskPhase = usePrevious(taskPhase);

  /* Generate new orbModels when the interface bounds change, usually only on load. Most often, generate new orbModels when switching between voting and solving. This catalyzes orb data and placement */
  useLayoutEffect(() => {
    const newTaskPhase = prevTaskPhase !== taskPhase && !!bounds.width;

    const newBounds =
      prevBounds && !prevBounds.width && bounds.width && !hasInitialized;

    if (newBounds || newTaskPhase) {
      const newOrbs = createRandomLayout(possibleItems, bounds, ORB_CONFIG);
      setHasInitialized(true);
      setCompletedOrbs([]);
      setOrbModelsState(newOrbs);
    }
  }, [
    bounds,
    hasInitialized,
    possibleItems,
    prevBounds,
    prevTaskPhase,
    taskPhase
  ]);

  const addOrbScore = useCallback(
    orbId => {
      const theOrb = _find(orbModels, orb => orb.orbId === orbId);
      onOrbSelection(theOrb);
    },
    // update when orbModels.length changes
    // if we udpate when orbModels changes, the addOrbScore will continuously be recreated,
    // and, in turn, causes `Orb` to render continously.
    // eslint-disable-next-line
    [onOrbSelection, orbModels.length]
  );

  /*
    Ensures that the last-touched orb is always on top of the others
    by using an array ordered by time-of-touch
    ie oldest touched is first in array
    newest touched is last in array
    until the oldest is touched again
    then it becomes the newest touched!
  */
  const changeOrbZIndex = useCallback(
    orbId => {
      // create an array that does not contain the new orbId
      const orbsByLastTouched = filter(orbsZIndex, id => id !== orbId);
      // push the new orbId to the end
      orbsByLastTouched.push(orbId);
      setOrbsZIndex(orbsByLastTouched);

      // play orb sound
      playSFX(SFX_TYPES.GOOD_CHOICE);
    },
    [orbsZIndex, playSFX]
  );

  const checkAndUpdateMultiTouch = useCallback(
    type => {
      const threeOrMoreOfTypeTouched = touchedOrbsByType[type].size >= 3;
      const isMatchLockableType = matchLockableTypes.indexOf(type) > -1;
      const typeEligibleForMultiTouch =
        isMatchLockableType && threeOrMoreOfTypeTouched;
      const multiTouchedTypeIsInputType =
        type === touchedOrbsByType.multiTouchType;

      // If type is current multiTouchType and no longer eligible, replace with null
      if (multiTouchedTypeIsInputType && !typeEligibleForMultiTouch) {
        return {
          multiTouchType: null,
          multiTouchDurationLeft: null
        };
        // If there is no multiTouchType and the type is eligible, replace with the type
        // eslint-disable-next-line no-else-return
      } else if (
        !touchedOrbsByType.multiTouchType &&
        typeEligibleForMultiTouch
      ) {
        return {
          multiTouchType: type,
          multiTouchDurationLeft: 1
        };
      }
      // Default: return same multiTouchType
      return {
        multiTouchType: touchedOrbsByType.multiTouchType,
        multiTouchDurationLeft: touchedOrbsByType.multiTouchDurationLeft
      };
    },
    [matchLockableTypes, touchedOrbsByType]
  );

  const setOrbTouched = useCallback(
    (orbModel, isTouched) => {
      const { orbId, type } = orbModel;
      if (isTouched) {
        setTouchedOrbsByType(prevTouchedOrbsByType => ({
          ...prevTouchedOrbsByType,
          [type]: prevTouchedOrbsByType[type].add(orbId),
          ...checkAndUpdateMultiTouch(type)
        }));
        changeOrbZIndex(orbId);
        return;
      }

      setTouchedOrbsByType(prevTouchedOrbsByType => {
        prevTouchedOrbsByType[type].delete(orbId);
        return {
          ...prevTouchedOrbsByType,
          ...checkAndUpdateMultiTouch(type)
        };
      });
    },
    [changeOrbZIndex, checkAndUpdateMultiTouch]
  );

  const setOrbComplete = useCallback(orbId => {
    setCompletedOrbs(prevOrbs => [...prevOrbs, orbId]);
  }, []);

  // `animate` is called every frame
  // eslint-disable-next-line consistent-return
  const animate = () => {
    if (!bounds || !bounds.width || !hasInitialized) return null;

    const tempModels = [];
    const centerY = (bounds.height - ORB_CONFIG.verticalBuffer * 2) / 2;

    // we re-use tempModels by pushing updated data in to it.
    for (let i = 0; i < orbModels.length; i += 1) {
      // get the model
      let currentOrb = { ...orbModels[i] };
      const currentOrbId = currentOrb.orbId;
      const isOrbCompleted = completedOrbs.indexOf(currentOrbId) > -1;

      if (isOrbCompleted) {
        currentOrb = completedOrbHandler(
          checkItemIsCorrect(currentOrb),
          currentOrb
        );
        /* This fixes removing the orb when it has gone off screen, but it makes all the other orbModels animate like they're appearing for the first time */
        // currentOrb.frameRerenders = currentOrb.frameRerenders ? (currentOrb.frameRerenders + 1) : 1;
        // if (currentOrb.frameRerenders === 50) {
        //   i = i - 1;
        //   setOrbModelsState(orbModels.splice(i, 1));
        //   continue;
        // }
      } else {
        currentOrb = incompleteOrbHandler(currentOrb, tick, i, ORB_CONFIG);
      }

      // is it offscreen?
      if (!isOrbCompleted) {
        if (currentOrb.x < -ORB_CONFIG.orbSize) {
          currentOrb.x += bounds.width;
        }

        if (currentOrb.x > bounds.width) {
          currentOrb.x -= bounds.width + ORB_CONFIG.orbSize;
        }

        if (currentOrb.y < -ORB_CONFIG.orbSize) {
          currentOrb.y += bounds.height;
        }

        if (currentOrb.y > bounds.height) {
          // keep the orb within vertical bounds
          if (!isOrbCompleted) {
            if (currentOrb.y < ORB_CONFIG.verticalBuffer)
              currentOrb.y = ORB_CONFIG.verticalBuffer;
            if (
              currentOrb.y >
              bounds.height - ORB_CONFIG.verticalBuffer - ORB_CONFIG.orbSize
            )
              currentOrb.y =
                bounds.height - ORB_CONFIG.verticalBuffer - ORB_CONFIG.orbSize;

            // apply a 'force' that pulls the orbModels vertically towards the center of the screen
            const distanceFromCenter = currentOrb.y - centerY;
            // if the orb is far enough away from the vertical center,
            // the further the orb is from the center,
            // the larger the distance
            // and the greater the 'pull' towards the center
            if (Math.abs(distanceFromCenter) > 80) {
              currentOrb.y += -distanceFromCenter * 0.02;
            }

            currentOrb.y = Math.round(currentOrb.y * 10) / 10;
          }
        }

        // WARNING: landmine
        // if the orb is 'completed'
        // and it is offscreen
        // then it no longer needs to be rendered
        // @techdebt: remove currentOrb from tempModels so it's no longer rendered
      } else if (
        !currentOrb.bypassRender &&
        (currentOrb.y < -ORB_CONFIG.orbSize || currentOrb.y > bounds.height)
      ) {
        currentOrb.bypassRender = true;
      }

      // store the updated model.
      tempModels.push(currentOrb);
    }

    // store all models in state
    setOrbModelsState(tempModels);

    setTick(tick + 1);
  };

  useAnimationFrame(() => animate());

  // by default all orbModels are rendered,
  // until their `bypassRender` property is true
  const renderableOrbs = filter(orbModels, orb => !orb.bypassRender);

  return (
    <OrbsStyle ref={boundsRef}>
      {taskPhase !== MOVING_MAP &&
        map(renderableOrbs, orb => {
          const zIndex = orbsZIndex.indexOf(orb.orbId) + 1;
          const isMultiTouchType =
            touchedOrbsByType.multiTouchType === orb.type;

          return (
            <div
              key={orb.orbId}
              style={{
                position: "absolute",
                transform: `translate(${orb.x}px, ${orb.y}px)`,
                zIndex
              }}
            >
              <Orb
                orbModel={orb}
                imageSVG={orb.imageSVG}
                imgAlt={orb.imgAlt}
                size={ORB_CONFIG.orbSize}
                addOrbScore={addOrbScore}
                setOrbTouched={setOrbTouched}
                setOrbComplete={setOrbComplete}
                delay={orb.delay}
                isMultiTouchType={isMultiTouchType}
                multiTouchDuration={touchedOrbsByType.multiTouchDurationLeft}
              />
            </div>
          );
        })}
    </OrbsStyle>
  );
};

OrbManager.displayName = "OrbManager";

const OrbsStyle = styled.div`
  display: block;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: ${palette.blue};
`;

const mapStateToProps = state => ({
  taskPhase: getTaskPhase(state)
});

// use memo to not re-render OrbManager unless its props change
export default connect(
  mapStateToProps,
  dispatch => ({
    playSFX(id) {
      dispatch(_playSFX(id));
    }
  })
)(memo(OrbManager));
