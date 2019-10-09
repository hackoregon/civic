/* eslint-disable import/no-named-as-default */
import React, {
  useLayoutEffect,
  useEffect,
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
import RadialGauge from "./RadialGauge";

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
  const defaultTouchedOrbsByType = {
    multiTouchType: null,
  };
  const touchedOrbReducer = useCallback(
    (orbsByType, possibleItem) => {
      return {
        ...defaultTouchedOrbsByType,
        ...orbsByType,
        [possibleItem.type]: new Set()
      };
    },
    [defaultTouchedOrbsByType]
  );
  const [touchedOrbsByType, setTouchedOrbsByType] = useState(
    possibleItems.reduce(touchedOrbReducer, {})
  );
  const [completedOrbs, setCompletedOrbs] = useState([]);
  const [orbsZIndex, setOrbsZIndex] = useState([]);
  // tick is used to modulate movement based on an incrementing value
  const [tick, setTick] = useState(0);
  const [multiTouchTimeout, setMultiTouchTimeout] = useState(null);
  const [MultiTouchRadialGauge, setMultiTouchRadialGauge] = useState(null);

  // the boundaries of the OrbManagers area
  const boundsRef = useRef();
  const bounds = useBounds(boundsRef);
  const prevBounds = usePrevious(bounds);
  const prevTaskPhase = usePrevious(taskPhase);
  const prevPossibleItems = usePrevious(possibleItems);
  const prevMultiTouchType = usePrevious(touchedOrbsByType.multiTouchType);

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

      if (possibleItems.length) {
        setTouchedOrbsByType(possibleItems.reduce(touchedOrbReducer, {}));
      } else {
        setTouchedOrbsByType({ ...defaultTouchedOrbsByType });
      }
    }
  }, [
    bounds,
    defaultTouchedOrbsByType,
    hasInitialized,
    possibleItems,
    prevBounds,
    prevPossibleItems,
    prevTaskPhase,
    taskPhase,
    touchedOrbReducer
  ]);

  // Every second, decrease the saved multiTouchDurationLeft
  useEffect(() => {
    const newType = touchedOrbsByType.multiTouchType !== prevMultiTouchType;
    if (touchedOrbsByType.multiTouchType && newType) {
      const curriedRadialGauge = (isActive, size, isMultiTouchType) => {
        return (<RadialGauge
          isActive={isActive}
          size={size}
          duration={1}
          isMultiTouchType={isMultiTouchType}
          multiTouchMultiplier={multiTouchMultiplier}
        />);
      };
      setMultiTouchRadialGauge(curriedRadialGauge)
    }, [multiTouchTimeout, prevMultiTouchType, touchedOrbsByType.multiTouchDurationLeft, touchedOrbsByType.multiTouchType]);

  const onOrbSelectionCallback = useCallback(
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

  useEffect(() => {
    console.log(touchedOrbsByType.multiTouchType);
  }, [touchedOrbsByType.multiTouchType])

  // UPPDATE MULTITOUCH ON TOUCH CHANGE
  const touchChangeUpdateMultiTouch = useCallback(
    (orbModel, addOrb) => {
      const { type, orbId } = orbModel;
      const newTouchedByType = {
        ...touchedOrbsByType,
        [type]: new Set(touchedOrbsByType[type])
      };

      // Add the orb, set to multiTouch if applicable
      if (addOrb) {
        newTouchedByType[type].add(orbId);

        const noCurrentMultiTouch = !touchedOrbsByType.multiTouchType;
        const isMatchLockableType = matchLockableTypes.indexOf(type) > -1;
        const threeOrMoreOfTypeTouched = newTouchedByType[type].size >= 3;

        if (noCurrentMultiTouch && isMatchLockableType && threeOrMoreOfTypeTouched) {
          newTouchedByType.multiTouchType = type;
          newTouchedByType.multiTouchDurationLeft = 1;
          // Tick should auto start
          console.log('TOUCH: new multitouch type on start', type)
        }
      } else { // Do remove orb operations
        newTouchedByType[type].delete(orbId);

        const isCurrentMultiTouch = touchedOrbsByType.multiTouchType === type;
        const threeOrMoreOfTypeTouched = newTouchedByType[type].size >= 3;
        if (isCurrentMultiTouch && !threeOrMoreOfTypeTouched) {
          // Check if there's a different multitouchable type with 3+ entries and set to that, or if none set to null state
          const nextMatchLockableTypes = matchLockableTypes.filter(matchLockableType => newTouchedByType[matchLockableType] && newTouchedByType[matchLockableType].size >= 3);
          if (nextMatchLockableTypes.length > 0) {
            newTouchedByType.multiTouchType = nextMatchLockableTypes[0];
            newTouchedByType.multiTouchDurationLeft = 1;
            // Tick should auto start
            console.log('TOUCH: new multitouch type after stop', nextMatchLockableTypes[0])
          } else {
            newTouchedByType.multiTouchType = null;
            newTouchedByType.multiTouchDurationLeft = null;
          }
        }
      }
      setTouchedOrbsByType(newTouchedByType);
    },
    [matchLockableTypes, touchedOrbsByType]
  );

  const setOrbTouched = useCallback(
    (orbModel, isTouched) => {
      const { orbId } = orbModel;
      if (isTouched) {
        touchChangeUpdateMultiTouch(orbModel, true);
        changeOrbZIndex(orbId);
        return;
      }

      touchChangeUpdateMultiTouch(orbModel, false);
    },
    [changeOrbZIndex, touchChangeUpdateMultiTouch]
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
                onOrbSelection={onOrbSelectionCallback}
                setOrbTouched={setOrbTouched}
                setOrbComplete={setOrbComplete}
                delay={orb.delay}
                isMultiTouchType={isMultiTouchType}
                multiTouchDuration={touchedOrbsByType.multiTouchDurationLeft}
                MultiTouchRadialGauge={MultiTouchRadialGauge}
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
