import React from 'react';
import { Animated, TouchableOpacity } from 'react-native';
import { number, shape, instanceOf, func, arrayOf, bool } from 'prop-types';

import auth from 'assets/auth/bg.png';

import Controls from './Controls';

import * as Styles from '../styles';

const Visual = ({
  step,
  styling,
  selectAuthType,
  modalStyle,
  imageStyle,
  animatedToPreviousStep,
  animRunning,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      disabled={animRunning}
      onPress={() => {
        if (step === 1) {
          animatedToPreviousStep();
        }
      }}
    >
      <Styles.AImageVisual source={auth} style={imageStyle}>
        <Styles.ABgVisual style={modalStyle} />
        {step === 0 && (
          <Controls styling={styling} selectAuthType={selectAuthType} />
        )}
      </Styles.AImageVisual>
    </TouchableOpacity>
  );
};

Visual.propTypes = {
  step: number.isRequired,
  styling: shape({
    opacity: instanceOf(Animated.Value).isRequired,
  }).isRequired,
  modalStyle: shape({
    opacity: instanceOf(Animated.Value).isRequired,
  }).isRequired,
  imageStyle: shape({
    transform: arrayOf(
      shape({
        translateY: instanceOf(Animated.Value).isRequired,
      }).isRequired,
    ).isRequired,
  }).isRequired,
  selectAuthType: func.isRequired,
  animatedToPreviousStep: func.isRequired,
  animRunning: bool.isRequired,
};

export default Visual;
