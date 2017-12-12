import React from 'react';
import { Animated } from 'react-native';
import {
  shape,
  string,
  instanceOf,
  oneOfType,
  object,
  number,
  array,
} from 'prop-types';
import theme from 'styles/appStyles';
import circle from 'assets/home/circle.png';
import cross from 'assets/home/cross.png';
import curve from 'assets/home/curve.png';
import GiftedAvatar from 'shared/chat/GiftedAvatar';
import { SPulse, SPictureContainer } from '../../styles';
import Gimmick from './Gimmick';

const AvatarPulsed = ({
  avatarStyle,
  user,
  pulsePicture,
  yellowScaleValues,
  gimmickOpacity,
  circleAnimValues,
  curvesAnimValues,
  crossAnimValues,
  pulse1ScaleValues,
  pulse2ScaleValues,
}) => {
  return (
    <SPictureContainer
      style={{
        transform: [{ scale: pulsePicture }],
      }}
    >
      <SPulse
        color={theme.colors.buttonYellow}
        style={[
          {
            opacity: yellowScaleValues.interpolate({
              inputRange: [0, 1.4],
              outputRange: [0, 0.5],
            }),
            transform: [{ scale: yellowScaleValues }],
          },
        ]}
      />
      <GiftedAvatar user={user} avatarStyle={avatarStyle} />
      <Gimmick
        size={28}
        image={circle}
        opacity={gimmickOpacity}
        animatedValues={circleAnimValues}
      />
      <Gimmick
        size={40}
        image={curve}
        opacity={gimmickOpacity}
        animatedValues={curvesAnimValues}
      />
      <Gimmick
        size={26}
        image={cross}
        opacity={gimmickOpacity}
        animatedValues={crossAnimValues}
      />

      <SPulse
        color={theme.colors.white}
        style={{
          opacity: pulse1ScaleValues.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0],
          }),
          transform: [{ scale: pulse1ScaleValues }],
        }}
      />
      <SPulse
        color={theme.colors.white}
        style={{
          opacity: pulse2ScaleValues.interpolate({
            inputRange: [0, 0.9],
            outputRange: [0, 0.6],
          }),
          transform: [{ scale: pulse2ScaleValues }],
        }}
      />
    </SPictureContainer>
  );
};

AvatarPulsed.propTypes = {
  avatarStyle: oneOfType([object, number, array]).isRequired,
  user: shape({
    name: string.isRequired,
    avatar: string,
  }).isRequired,
  pulsePicture: instanceOf(Animated.Value).isRequired,
  yellowScaleValues: instanceOf(Animated.Value).isRequired,
  gimmickOpacity: instanceOf(Animated.Value).isRequired,
  circleAnimValues: shape({
    translateY: instanceOf(Animated.Value).isRequired,
    translateX: instanceOf(Animated.Value).isRequired,
    scale: instanceOf(Animated.Value).isRequired,
    rotate: instanceOf(Animated.Value).isRequired,
  }).isRequired,
  curvesAnimValues: shape({
    translateY: instanceOf(Animated.Value).isRequired,
    translateX: instanceOf(Animated.Value).isRequired,
    scale: instanceOf(Animated.Value).isRequired,
    rotate: instanceOf(Animated.Value).isRequired,
  }).isRequired,
  crossAnimValues: shape({
    translateY: instanceOf(Animated.Value).isRequired,
    translateX: instanceOf(Animated.Value).isRequired,
    scale: instanceOf(Animated.Value).isRequired,
    rotate: instanceOf(Animated.Value).isRequired,
  }).isRequired,
  pulse1ScaleValues: instanceOf(Animated.Value).isRequired,
  pulse2ScaleValues: instanceOf(Animated.Value).isRequired,
};

export default AvatarPulsed;
