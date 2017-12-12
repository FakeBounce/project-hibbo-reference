import React from 'react';
import { Animated } from 'react-native';
import { shape, func, string, bool, instanceOf } from 'prop-types';
import Select from 'assets/mission/select.png';
import SelectError from 'assets/mission/selectError.png';
import MissionIconItem from './MissionIconItem';
import {
  StyledTouchableOpacityIcon,
  StyledImageSelectIcon,
  SAnimatedContainerDeepBlue,
} from '../../styles';

const MissionSelectIcon = ({ onPress, icon, theme, error, animation }) => {
  let width = 80;
  if (icon.icon !== '') width = 155;
  return (
    <SAnimatedContainerDeepBlue
      sWidth={width}
      style={{
        backgroundColor: theme, // Does not render through SC
        opacity: animation.opacity,
        transform: [
          { translateY: animation.translateY },
          { scaleY: animation.scaleY },
        ],
      }}
    >
      <StyledTouchableOpacityIcon onPress={onPress} sWidth={width}>
        <MissionIconItem icon={icon} theme={theme} error={error} />
        <StyledImageSelectIcon source={error ? SelectError : Select} />
      </StyledTouchableOpacityIcon>
    </SAnimatedContainerDeepBlue>
  );
};

MissionSelectIcon.propTypes = {
  onPress: func.isRequired,
  theme: string.isRequired,
  icon: shape({
    icon: string.isRequired,
    buyable: shape({
      price: string,
      color: string,
      name: string,
    }),
  }).isRequired,
  error: bool.isRequired,
  animation: shape({
    translateY: instanceOf(Animated.Value).isRequired,
    opacity: instanceOf(Animated.Value).isRequired,
    scaleY: instanceOf(Animated.Value).isRequired,
  }).isRequired,
};

export default MissionSelectIcon;
