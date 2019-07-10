import CHAPTERS from "../../constants/chapters";

class CHAPTER_FACTORY {}

CHAPTER_FACTORY.createChapter = ({ index }) => {
  const data = {
    ...CHAPTERS[index]
  };

  return data;
};

export default CHAPTER_FACTORY;
