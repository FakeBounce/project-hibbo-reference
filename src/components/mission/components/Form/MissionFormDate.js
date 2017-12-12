import React from 'react';
import { Animated } from 'react-native';
import { string, bool, func, shape, instanceOf } from 'prop-types';
import { StyledFlexRow } from '../../styles';

import MissionInput from './MissionInput';

let secondInput = null;
let thirdInput = null;
const FormDate = ({
  day,
  month,
  year,
  onChange,
  onSubmitEditing,
  ...otherProps
}) => {
  return (
    <StyledFlexRow>
      <MissionInput
        {...day}
        {...otherProps}
        width={41}
        keyboard="numeric"
        maxLength={2}
        onChange={(name, text) => {
          if (Number(text) <= 31 || text === '') {
            onChange(name, text);
            if (text.length === 2 && Number(text) > 0 && secondInput)
              secondInput.focus();
          }
        }}
      />

      <MissionInput
        {...month}
        {...otherProps}
        width={55}
        keyboard="numeric"
        maxLength={2}
        innerRef={element => {
          secondInput = element;
        }}
        onChange={(name, text) => {
          if (Number(text) <= 12 || text === '') {
            onChange(name, text);
            if (text.length === 2 && Number(text) > 0 && thirdInput)
              thirdInput.focus();
          }
        }}
      />

      <MissionInput
        {...year}
        {...otherProps}
        width={75}
        keyboard="numeric"
        maxLength={4}
        innerRef={element => {
          thirdInput = element;
        }}
        onChange={(name, text) => {
          const t = new Date();
          if (text.length === 4 && Number(text) >= t.getFullYear())
            onSubmitEditing();
          onChange(name, text);
        }}
      />
    </StyledFlexRow>
  );
};

FormDate.defaultProps = {
  onSubmitEditing: null,
};

FormDate.propTypes = {
  day: shape({
    label: string.isRequired,
    name: string.isRequired,
    value: string.isRequired,
    error: bool.isRequired,
    animation: shape({
      translateY: instanceOf(Animated.Value),
      opacity: instanceOf(Animated.Value),
      opacityBorder: instanceOf(Animated.Value),
      scaleY: instanceOf(Animated.Value),
    }).isRequired,
  }).isRequired,
  month: shape({
    label: string.isRequired,
    name: string.isRequired,
    value: string.isRequired,
    error: bool.isRequired,
    animation: shape({
      translateY: instanceOf(Animated.Value),
      opacity: instanceOf(Animated.Value),
      opacityBorder: instanceOf(Animated.Value),
      scaleY: instanceOf(Animated.Value),
    }).isRequired,
  }).isRequired,
  year: shape({
    label: string.isRequired,
    name: string.isRequired,
    value: string.isRequired,
    error: bool.isRequired,
    animation: shape({
      translateY: instanceOf(Animated.Value),
      opacity: instanceOf(Animated.Value),
      opacityBorder: instanceOf(Animated.Value),
      scaleY: instanceOf(Animated.Value),
    }).isRequired,
  }).isRequired,
  onChange: func.isRequired,
  onSubmitEditing: func,
};

export default FormDate;
