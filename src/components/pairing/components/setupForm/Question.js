import React from 'react';
import { Animated } from 'react-native';
import { bool, number, string, func, shape, instanceOf } from 'prop-types';

import { StyledContainerBasic } from 'styledComponents/containers';

import appStyles from 'styles/appStyles';

import Title from '../Title';

import * as Styles from './styles';

const Question = ({
  step,
  displayTitle,
  title,
  controls,
  setData,
  moveStep,
  redirect,
  titleAnimations,
  controlsAnimations,
  showContent,
}) => {
  return (
    <StyledContainerBasic>
      {displayTitle && (
        <Title
          label={[title.label1, title.label2, title.label3, title.label4]}
          color={appStyles.colors.white}
          animations={titleAnimations}
          showContent={showContent}
        />
      )}

      <Styles.SControls
        leftLabel={controls.leftLabel}
        leftAction={() => {
          if (step === 3) {
            return setData('gender', 'female', 'left');
          } else if (step === 8) {
            return redirect(false, false, 'left');
          }

          return moveStep();
        }}
        rightLabel={controls.rightLabel}
        rightAction={() => {
          if (step === 3) {
            return setData('gender', 'male', 'right');
          } else if (step === 8) {
            return redirect(true, true, 'right');
          }

          return moveStep();
        }}
        animations={controlsAnimations}
      />
    </StyledContainerBasic>
  );
};

Question.defaultProps = {
  displayTitle: true,
  title: {
    label1: '',
    label2: '',
    label3: '',
  },
  controls: {
    rightLabel: '',
    leftLabel: '',
  },
  showContent: null,
};

Question.propTypes = {
  step: number.isRequired,
  displayTitle: bool,
  title: shape({
    label1: string,
    label2: string,
    label3: string,
  }),
  controls: shape({
    leftLabel: string,
    rightLabel: string,
  }),
  setData: func.isRequired,
  moveStep: func.isRequired,
  redirect: func.isRequired,
  titleAnimations: shape({
    opacity: instanceOf(Animated.Value).isRequired,
    translateY: instanceOf(Animated.Value).isRequired,
    scaleY: instanceOf(Animated.Value).isRequired,
  }).isRequired,
  controlsAnimations: shape({
    left: shape({
      opacity: instanceOf(Animated.Value).isRequired,
      translateY: instanceOf(Animated.Value).isRequired,
      scale: instanceOf(Animated.Value).isRequired,
    }).isRequired,
    right: shape({
      opacity: instanceOf(Animated.Value).isRequired,
      translateY: instanceOf(Animated.Value).isRequired,
      scale: instanceOf(Animated.Value).isRequired,
    }).isRequired,
  }).isRequired,
  showContent: func,
};

export default Question;
