import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  getChapters,
  getActiveChapter,
  setActiveChapter as _setActiveChapter
} from "../chapters";

const useChapters = () => {
  const dispatch = useDispatch();

  const chapters = useSelector(state => getChapters(state));
  const activeChapter = useSelector(state => getActiveChapter(state));
  const setActiveChapter = useCallback(
    id => dispatch(_setActiveChapter(id)),
    []
  );

  return {
    chapters,
    activeChapter
  };
};

export default useChapters;
