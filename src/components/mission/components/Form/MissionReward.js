import React from 'react';
import { Animated } from 'react-native';
import { string, bool, func, instanceOf, shape } from 'prop-types';
import { StyledContainerRow } from 'styles/styledComponents/containers';
import { SAnimatedWhiteEuro } from '../../styles';
import MissionInput from './MissionInput';

const MissionReward = ({
  form,
  label,
  name,
  error,
  currency,
  onChange,
  innerRef,
  animation,
}) => {
  const width = 35 + form.length * 10;
  return (
    <StyledContainerRow>
      <MissionInput
        value={form}
        label={label}
        name={name}
        onChange={(changeName, text) => {
          let txt = text;
          if (text.length === 4) {
            if (form.length === 5) {
              txt = text.substring(0, 3);
            } else {
              txt =`${text},`;
            }
          }
          onChange(changeName, txt);
        }}
        error={error}
        width={width}
        maxLength={7}
        innerRef={innerRef}
        keyboard="numeric"
        animation={animation}
      />
      <SAnimatedWhiteEuro
        error={error}
        style={{
          opacity: animation.opacity,
          transform: [
            { translateY: animation.translateY },
            { scaleY: animation.scaleY },
          ],
        }}
      >
        {currency}
      </SAnimatedWhiteEuro>
    </StyledContainerRow>
  );
};

MissionReward.defaultProps = {
  innerRef: null,
  currency: '€',
};

MissionReward.propTypes = {
  form: string.isRequired,
  error: bool.isRequired,
  label: string.isRequired,
  name: string.isRequired,
  onChange: func.isRequired,
  innerRef: func,
  animation: shape({
    translateY: instanceOf(Animated.Value).isRequired,
    opacity: instanceOf(Animated.Value).isRequired,
    scaleY: instanceOf(Animated.Value).isRequired,
  }).isRequired,
  currency: string,
};

export default MissionReward;
