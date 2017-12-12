import React from 'react';
import { number, func } from 'prop-types';

import Question from './Question';
import QuestionExtended from './QuestionExtended';
import WifiList from './WifiList';
import WifiPwd from './WifiPwd';

const RenderStep = ({ step, moveStep, setData, ...props }) => {
  switch (step) {
    case 1:
      return <WifiList setData={setData} {...props} />;
    case 2:
      return <WifiPwd setData={setData} {...props} />;
    case 4:
    case 5:
    case 6:
    case 7:
      return <QuestionExtended step={step} setData={setData} {...props} />;
    default:
      return (
        <Question
          step={step}
          moveStep={moveStep}
          setData={setData}
          {...props}
        />
      );
  }
};

RenderStep.propTypes = {
  step: number.isRequired,
  moveStep: func.isRequired,
  setData: func.isRequired,
};

export default RenderStep;
