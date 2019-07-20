import CHAPTERS from "../../constants/chapters";

class CHAPTER_FACTORY {}

// perform any dynamic data transformation here
// so the constants are static.
CHAPTER_FACTORY.createChapter = ({ index }) => {
  const data = {
    ...CHAPTERS[index]
  };

  return data;
};

export default CHAPTER_FACTORY;
