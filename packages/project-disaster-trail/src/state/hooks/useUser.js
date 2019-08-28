import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  setPoints as _setPoints,
  addPoints as _addPoints,
  getPoints as _getPoints
} from "../user";

const useUser = () => {
  const dispatch = useDispatch();

  const points = useSelector(state => _getPoints(state));

  const setPoints = useCallback(_points => dispatch(_setPoints(_points)), [
    dispatch
  ]);

  const addPoints = useCallback(_points => dispatch(_addPoints(_points)), [
    dispatch
  ]);

  return {
    points,
    setPoints,
    addPoints
  };
};

export default useUser;
