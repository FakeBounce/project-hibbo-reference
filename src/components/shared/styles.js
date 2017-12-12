import styled from 'styled-components/native';
import { Animated, Dimensions } from 'react-native';
import Animation from 'lottie-react-native';
import Video from 'react-native-video';
import ModalCustom from 'shared/Modal';
import PadNumber from 'shared/PadNumber';

import { StyledTextSmall } from 'styledComponents/texts';
import {
  StyledFullContainerCenter,
  StyledContainerCenter,
  StyledContainerBasic,
} from 'styledComponents/containers';

import ModalIconPanelItems from './components/ModalIconPanelItems';

// Toast
export const SToastGlobalContainer = styled.View`
  width: 275px;
  height: 95px;
`;
export const SToastContainer = styled.View`
  position: relative;
  top: ${props => (props.position === 'top' ? 20 : 0)}px;
  background-color: ${props => props.color};
  width: 275px;
  height: 75px;
  border-radius: 100px;
  justify-content: center;
`;
export const SToastContent = styled.View`
  flex-direction: row;
  justify-content: flex-start;
`;

export const SToastImageContainer = styled.View`
  margin-horizontal: 10px;
`;
export const SToastTextContainer = styled.View`
  justify-content: center;
  flex: 1;
  margin-right: 10px;
`;
export const SToastText = styled.Text`
  color: ${props => props.theme.colors.buttonGrey};
  font-family: ${props => props.theme.fonts.circularBook};
`;
// Toast Triangle
export const SToastTriangle = styled.View`
  position: absolute;
  z-index: -1;
  elevation: -1;
  width: 0px;
  height: 0px;
  background-color: transparent;
  border-style: solid;
  border-left-width: 20px;
  border-right-width: 20px;
  border-bottom-width: 50px;
  border-left-color: transparent;
  border-right-color: transparent;
  ${props => (props.position === 'top' ? 'top: 0' : 'bottom: 0')}px;
  left: ${props => (props.position === 'top' ? 15 : 25)}px;
  transform: ${props =>
    props.position === 'top' ? 'rotate(-20deg)' : 'rotate(160deg)'};
  border-bottom-color: ${props => props.color};
`;

// Ripple
export const ARippleAndroid = styled(Animated.View)`
  position: absolute;
  border-radius: 70px;
  height: ${props => props.rippleSize}px;
  width: ${props => props.rippleSize}px;
  background-color: ${props => props.rippleColor};
`;

// Header
export const StyledHeaderWrapper = styled.View`
  top: 13px;
  flex-direction: row;
  width: ${props =>
    props.isFullscreen
      ? Dimensions.get('window').width
      : Dimensions.get('window').width - 2 * props.theme.size.cardMargin}px;
  margin: ${props => (props.isFullscreen ? 0 : props.theme.size.cardMargin)}px;
  ${props => props.isFullscreen && 'margin-bottom: 13px;'};
`;

export const StyledHeaderCenter = StyledFullContainerCenter.extend`
  flex: 3;
`;

export const StyledHeaderText = StyledTextSmall.extend`
  align-self: center;
  text-align: center;
  color: ${props => props.color};
  ${props => props.flip && 'margin-top: 10px;'};
`;

export const StyledHeaderCrossWrapper = styled.View`
  position: absolute;
  right: ${props => 2 * props.theme.size.cardMargin}px;
`;

export const StyledHeaderTextWrapper = StyledContainerCenter.extend`
  width: ${props =>
    Dimensions.get('window').width - 150 - 2 * props.theme.size.cardMargin}px;
`;

export const AnimatedImageModifyIcon = styled(Animated.View)`
  flex: 1;
  align-items: center;
  background-color: ${props => props.theme.colors.darkBlue};
`;

const FlexibleHeaderView = styled.View`
  border-radius: ${props => props.theme.cardStyle.borderRadius}px;
  justify-content: center;
  flex-direction: column;
`;

export const AnimatedFlexibleHeaderView = Animated.createAnimatedComponent(
  FlexibleHeaderView,
);

export const SModalIconPanelItems = styled(ModalIconPanelItems)`
  margin-top: 15px;
  flex: 1;
`;

export const SFlexHeaderMain = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  top: 13px;
`;

export const SFlexHeaderTitle = styled.View`
  margin-left: -14px;
`;

export const SFlexHeaderTitleRight = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
`;

export const SFlexTitle = StyledTextSmall.extend`
  text-align: center;
  justify-content: center;
`;

export const SFlexBackArrow = styled.View`
  flex-direction: row;
  flex: 1;
  padding-left: 14px;
`;

export const SLoaderView = styled.View`
  width: 100px;
  height: 100px;
`;

export const SLoaderAnimation = styled(Animation)`
  width: 100px;
  height: 100px;
`;

export const SContainerModal = styled.View`
  width: 100%;
  height: 100%;
  align-items: center;
  opacity: 1;
  border-radius: ${props => props.theme.cardStyle.borderRadius}px;
  background-color: ${props => props.theme.colors.darkBlue};
`;

export const SAnimatedContainerModal = Animated.createAnimatedComponent(
  SContainerModal,
);

export const SProgressiveButton = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 56px;
  padding: ${props => (props.rounded ? '10px 20px' : '5px')};
  ${props =>
    props.rounded &&
    `border-radius: 12px; margin-bottom: 40px; overflow: hidden; justify-content: center;background-color:${props
      .theme.colors.buttonGrey}`};
`;

const SProgressiveButtonProgress = styled.View`
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  background-color: ${props => props.theme.colors.balanceGreen};
`;

export const AnimatedProgress = Animated.createAnimatedComponent(
  SProgressiveButtonProgress,
);

export const SProgressiveButtonText = styled.Text`
  font-family: ${props => props.theme.fonts.circularBook};
  font-size: ${props => props.theme.textSizes.small}px;
  color: ${props => props.theme.colors.primary};
  background-color: transparent;
`;

export const SMIPIstart = styled.View`
  flex: 0;
  padding-left: 20px;
`;

export const SMIPImiddle = styled.View`
    flex: 1,
    align-items: center;
    margin-right: 40px;
`;

export const SMIPIend = styled.View`
  flex: 0;
  margin-right: 20px;
`;

export const SMIPIvideo = styled(Video)`
  width: 240px;
  height: 96px;
`;

export const SMIPIredText = styled.Text`
  font-family: ${props => props.theme.fonts.circularBook};
  font-size: ${props => props.theme.textSizes.xsmall}px;
  color: ${props => props.theme.colors.red};
  margin-top: 10px;
`;

const SMIPIbuyableRow = styled.View`
  padding-horizontal: 0px;
`;

export const AnimatedMIPIbuyableRow = Animated.createAnimatedComponent(
  SMIPIbuyableRow,
);

// SecurityCode
export const StyledSecurityCodeWrapper = StyledFullContainerCenter.extend`
  margin-top: 30px;
`;

export const StyledSecurityCodeText = StyledTextSmall.extend`
  margin-top: ${props => (props.isDebit ? 0 : 30)}px;
  margin-bottom: 20px;
  margin-horizontal: 20px;
  text-align: center;
`;

export const StyledSecurityCodeModalCustom = styled(ModalCustom)`
  background-color: white;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

export const StyledSecurityCodeImage = styled.Image`
  margin-bottom: 10px;
`;

export const StyledSecurityCodePadNumber = styled(PadNumber)`
  flex: 1;
  margin-bottom: 28px;
`;

// Input
export const SInputContainer = StyledContainerBasic.extend`
  align-items: ${props => (props.centered ? 'center' : 'flex-start')};
`;
export const SInput = styled.TextInput`
  width: ${props => props.inputWidth}px;
  height: 45px;
  font-family: ${props => props.theme.fonts.circularMedium};
  color: ${props => props.theme.colors.primary};
  font-size: ${props => props.theme.textSizes.normal};
`;
export const SBorderInput = styled.View`
  width: ${props => props.inputWidth}px;
  height: 1px;
  margin-top: 3px;
  background-color: ${props => props.theme.colors.inputGrey};
`;

export const SInputDropDown = StyledTextSmall.extend`
  background-color: ${props => props.theme.colors.primary};
`;
// FormInput
export const SFormInput = styled.View`
  margin-bottom: 25px;
  min-height: 65px;
`;

export const SDropDownImage = styled.Image`
  margin: 5px;
`;

// Checkbox
export const SCheckBoxContainer = styled.TouchableOpacity`
  min-width: 45px;
  min-height: 45px;
  align-items: center;
  justify-content: center;
`;
export const SCheckBoxButtonUnChecked = styled(Animated.View)`
  border-width: ${props => (!props.checked ? 1 : 0)}px;
  border-color: ${props => props.theme.colors.green};
`;
export const SCheckBoxContent = styled(Animated.View)`
  position: absolute;
  top: ${props => (props.size - 10) / 2}px;
  left: ${props => (props.size - 10) / 2}px;
  width: 10px;
  height: 10px;
  background-color: ${props => props.theme.colors.white};
`;

// DropDownSelector
export const SDropdownWrapper = styled.View`
  flex: 1;
  margin-bottom: 25px;
  min-height: 60px;
`;
export const SDropDownSelect = styled.Text`
  height: 35px;
  font-family: ${props => props.theme.fonts.circularMedium};
  color: ${props =>
    props.isSelected // eslint-disable-line
      ? props.theme.colors.primary
      : props.hasError
        ? props.theme.colors.google
        : props.theme.colors.inputGrey};
  font-size: ${props => props.theme.textSizes.normal};
`;
export const SDropdownButton = styled.TouchableOpacity`
  padding-vertical: 2px;
  align-self: center;
`;
