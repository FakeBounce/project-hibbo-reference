import { Dimensions, Animated, View, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

import { StyledTextSmall, StyledTextRegularBold } from 'styledComponents/texts';

import BottomControls from './BottomControls';
import Title from '../Title';
import Input from './Input';

export const SControls = styled(BottomControls)`
  position: absolute;
  bottom: 25px;
`;
const SWrapper = styled.View`
  background-color: transparent;
  margin-top: ${Dimensions.get('window').height / 5}px;
`;
export const AnimatedWrapper = styled(
  Animated.createAnimatedComponent(SWrapper),
)``;

// Wifi password
const SWrapperPwd = styled.View`
  background-color: transparent;
  margin-top: 25px;
`;
export const AnimatedWrapperPwd = styled(
  Animated.createAnimatedComponent(SWrapperPwd),
)``;
export const SCenteredPwd = styled.View`
  align-items: center;
`;
export const STextPwd = StyledTextSmall.extend`
  color: ${props => props.theme.colors.white};
  align-items: center;
`;

// QuestionExtended
export const ATitle = styled(Title)`
  margin-top: ${Dimensions.get('window').height / 5}px;
`;
const SWrapperQuestion = styled.View`
  background-color: transparent;
  margin-top: 0px;
`;
export const AnimatedWrapperQuestion = styled(
  Animated.createAnimatedComponent(SWrapperQuestion),
)``;

// BirthDayInput
export const SContainerBirthday = styled.View`
  flex-direction: row;
  margin-bottom: 25px;
  justify-content: center;
`;
export const SInput = styled(Input)`
  width: ${Dimensions.get('window').width / 5}px;
`;
export const SInputYear = styled(Input)`
  width: ${Dimensions.get('window').width / 5 + 25}px;
`;

// BottomControls
export const SButtonControls = styled(
  Animated.createAnimatedComponent(TouchableOpacity),
)`
  flex: 1;
  align-items: center;
  padding-vertical: 15px;
`;
export const AContainerControls = styled(
  Animated.createAnimatedComponent(View),
)`
  flex-direction: row;
`;

// PictureSelector
export const SButtonPic = styled.TouchableOpacity`
  width: 125px;
  height: 125px;
  align-items: center;
  align-self: center;
  justify-content: center;
`;
export const SImagePic = styled.Image`
  width: 90px;
  height: 90px;
  border-radius: 45px;
`;
export const SLinesPic = styled.Image`
  width: 33px;
  height: 35px;
  position: absolute;
  bottom: 10px;
  right: 5px;
  z-index: 2;
`;
export const SCrossPic = styled.Image`
  width: 21px;
  height: 22px;
  position: absolute;
  bottom: 60px;
  right: 5px;
  z-index: 2;
`;
export const SCirclePic = styled.Image`
  width: 44px;
  height: 44px;
  position: absolute;
  top: 20px;
  left: -5px;
  z-index: 2;
`;

// WifiName
export const STextWifiName = StyledTextRegularBold.extend`
  color: ${props => props.theme.colors.white};
`;
