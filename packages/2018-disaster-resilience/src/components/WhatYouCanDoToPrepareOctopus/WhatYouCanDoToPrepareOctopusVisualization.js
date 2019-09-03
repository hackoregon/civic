import React, { useState } from "react";
import Quiz from "./Quiz/Quiz";
import Summary from "./Summary/Summary";

const TemplateMinimalCardVisualization = () => {
  const [quizFinished, setDone] = useState(false);

  const makeDone = e => {
    e.preventDefault();
    e.stopPropagation();

    setDone(true);
  };

  return quizFinished ? (
    <Summary quizFinished={quizFinished} />
  ) : (
    <Quiz done={makeDone} />
  );
};

export default TemplateMinimalCardVisualization;
