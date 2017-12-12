import React from 'react';
import { Animated } from 'react-native';
import { number, func, instanceOf, shape } from 'prop-types';
import KeyboardSpacer from 'react-native-keyboard-spacer';

import { StyledContainerBasic } from 'styledComponents/containers';

import RenderStep from './RenderStep';

const SContainer = StyledContainerBasic.extend`
  z-index: 4;
  padding-top: 55px;
`;

const FormView = ({ step, moveStep, animatedStyles, ...props }) => {
  if (step === 0) {
    return null;
  }

  return (
    <SContainer>
      <RenderStep
        step={step}
        animatedStyles={animatedStyles}
        moveStep={() => {
          moveStep('forward');
        }}
        {...props}
      />

      <KeyboardSpacer />
    </SContainer>
  );
};

FormView.propTypes = {
  step: number.isRequired,
  moveStep: func.isRequired,
  animatedStyles: shape({
    monimalzBounce: instanceOf(Animated.Value).isRequired,
    monimalzScale: instanceOf(Animated.Value).isRequired,
  }).isRequired,
};

export default FormView;
