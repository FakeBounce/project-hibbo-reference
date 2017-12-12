import React from 'react';
import { Animated } from 'react-native';
import { bool, string, func, shape, number, instanceOf } from 'prop-types';

import { getTranslations } from 'utils/i18n';

import appStyles from 'styles/appStyles';

import { StyledContainerBasic } from 'styledComponents/containers';
import * as Styles from './styles';

import Input from './Input';
import PictureSelector from './PictureSelector';
import BirthDayInput from './BirthDayInput';

const QuestionExtended = ({
  step,
  title,
  controls,
  setData,
  form,
  validate,
  error,
  titleAnimations,
  inputAnimations,
  birthdayAnimations,
  pictureAnimations,
  controlsAnimations,
  showContent,
  ...rest
}) => {
  return (
    <StyledContainerBasic>
      <Styles.ATitle
        label={[title.label1, title.label2, title.label3]}
        color={appStyles.colors.white}
        animations={titleAnimations}
        showContent={showContent}
      />

      <Styles.AnimatedWrapperQuestion>
        {// eslint-disable-next-line
        step === 4 ? (
          <Input
            name="name"
            defaultValue={form.name}
            placeholder={getTranslations('pairing.name')}
            setData={setData}
            validate={validate}
            error={error}
            animations={inputAnimations}
          />
        ) : step === 7 ? (
          <BirthDayInput
            form={form}
            setData={setData}
            validate={validate}
            error={error}
            animations={birthdayAnimations}
          />
        ) : (
          <Animated.View style={{ opacity: pictureAnimations.opacity }}>
            <PictureSelector
              setData={setData}
              {...rest}
              picture={form.picture}
              validate={validate}
              step={step}
            />
          </Animated.View>
        )}
      </Styles.AnimatedWrapperQuestion>

      <Styles.SControls
        rightLabel={controls.rightLabel}
        rightAction={() => {
          switch (step) {
            case 5:
              return validate('picture');
            case 6:
              return validate('pictureConfirm');
            case 7:
              return validate('birthday');
            default:
              return validate('name');
          }
        }}
        animations={controlsAnimations}
      />
    </StyledContainerBasic>
  );
};

QuestionExtended.defaultProps = {
  title: {
    label1: '',
    label2: '',
    label3: '',
  },
  controls: {
    rightLabel: '',
  },
  setData: () => {},
  showContent: null,
};

QuestionExtended.propTypes = {
  step: number.isRequired,
  title: shape({
    label1: string,
    label2: string,
    label3: string,
  }),
  controls: shape({
    rightLabel: string,
  }),
  setData: func,
  form: shape({
    name: string.isRequired,
    picture: string.isRequired,
  }).isRequired,
  validate: func.isRequired,
  error: bool.isRequired,
  titleAnimations: shape({
    opacity: instanceOf(Animated.Value).isRequired,
    translateY: instanceOf(Animated.Value).isRequired,
    scaleY: instanceOf(Animated.Value).isRequired,
  }).isRequired,
  inputAnimations: shape({
    borderOpacity: instanceOf(Animated.Value).isRequired,
    borderTranslateY: instanceOf(Animated.Value).isRequired,
    inputOpacity: instanceOf(Animated.Value).isRequired,
    inputTranslateY: instanceOf(Animated.Value).isRequired,
  }).isRequired,
  birthdayAnimations: shape({
    day: shape({
      borderOpacity: instanceOf(Animated.Value).isRequired,
      borderTranslateY: instanceOf(Animated.Value).isRequired,
      inputOpacity: instanceOf(Animated.Value).isRequired,
      inputTranslateY: instanceOf(Animated.Value).isRequired,
    }).isRequired,
    month: shape({
      borderOpacity: instanceOf(Animated.Value).isRequired,
      borderTranslateY: instanceOf(Animated.Value).isRequired,
      inputOpacity: instanceOf(Animated.Value).isRequired,
      inputTranslateY: instanceOf(Animated.Value).isRequired,
    }).isRequired,
    year: shape({
      borderOpacity: instanceOf(Animated.Value).isRequired,
      borderTranslateY: instanceOf(Animated.Value).isRequired,
      inputOpacity: instanceOf(Animated.Value).isRequired,
      inputTranslateY: instanceOf(Animated.Value).isRequired,
    }).isRequired,
  }).isRequired,
  pictureAnimations: shape({
    opacity: instanceOf(Animated.Value).isRequired,
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

export default QuestionExtended;
