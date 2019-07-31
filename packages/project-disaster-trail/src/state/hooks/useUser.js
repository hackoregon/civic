import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  setPoints as _setPoints,
  addPoints as _addPoints,
  getPoints
} from "../chapters";

const useUser = () => {
  const dispatch = useDispatch();

  const points = useSelector(state => _getPoints(state));

  const setPoints = useCallback(points => dispatch(_setPoints(points)), []);

  const addPoints = useCallback(points => dispatch(_addPoints(points)), []);

  return {
    points,
    setPoints,
    addPoints
  };
};

export default useUser;
