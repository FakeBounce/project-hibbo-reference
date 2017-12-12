import styled from 'styled-components/native';
import ModalIconPanelItem from 'shared/components/ModalIconPanelItem';
import { Animated, Image, TouchableOpacity, TextInput } from 'react-native';
import { StyledTextWhite } from 'styles/styledComponents/texts';
import { StyledContainerDeepBlue } from 'styles/styledComponents/containers';
import SecurityCode from 'shared/SecurityCode';
import MissionDeadline from './components/List/MissionDeadline';
import MissionIcon from './components/List/MissionIcon';
import MissionAmount from './components/List/MissionAmount';

export const StyledMissionLabel = StyledTextWhite.extend`
  width: 100%;
  font-family: ${props => props.theme.fonts.circularBold};
  font-size: ${props => props.theme.textSizes.regular};
  line-height: 23px;
  margin-top: -5px;
`;

export const SAnimatedWhiteEuro = styled(
  Animated.createAnimatedComponent(StyledTextWhite),
)`
  font-family: ${props => props.theme.fonts.circularBook};
  max-height: 40px;
  width: 40px;
  font-size: ${props => props.theme.textSizes.normal}px;
  margin-top: 5px;
  ${props => props.error && `color: ${props.theme.colors.error}`};
`;

export const StyledMinHeightMargedTopWhiteText = StyledTextWhite.extend`
  min-height: 25px;
  margin-top: -5px;
  ${props => (props.centered ? 'width: 100%;text-align: center' : '')};
`;

export const StyledMinHeightMargedTopRow = styled.View`
  flex-direction: row;
  margin-top: 40px;
  min-height: 25px;
`;

export const StyledMinHeightMargedTopRightRow = styled.View`
  flex-direction: row;
`;

export const StyledMargedRightImage = styled.Image`
  margin-right: 10px;
`;

export const StyledMedal = styled.View`
  position: absolute;
  right: 0px;
  top: 22px;
`;

export const StyledWhiteContainer = styled.View`
  width: 100%;
  background-color: ${props => props.theme.colors.white};
`;

export const StyledWhiteWrapper = styled.View`
  flex: 1;
  flex-direction: row;
  background-color: ${props => props.theme.colors.white};
`;

export const StyledMargedTopColumn = styled.View`
  flex-direction: column;
`;

export const StyledLittleMargedTopColumn = styled.View`
  flex-direction: column;
  padding-right: 5px;
  width: 100%;
  height: 105px;
  justify-content: center;
`;

export const StyledWhiteRoundWrapper = styled.View`
  flex-direction: row;
  border-radius: 38px;
  background-color: ${props => props.theme.colors.whiteOpac};
  height: 30px;
  justify-content: center;
  align-items: center;
`;

export const StyledFlexRow = styled.View`
  flex-direction: row;
`;

export const StyledMargedForm = styled.View`
  flex: 1;
  padding-top: 40px;
  margin: 0px 29px;
`;

export const StyledSpacedRow = styled.View`
  padding: ${props => (props.paddingBottom ? '20px 0px' : '20px 0px 40px 0px')};
  height: 80px;
  flex-direction: row;
  align-items: center;
  ${props => props.semiRow && 'maxWidth : 50%;'};
`;

export const SAnimatedWhiteBorderedinput = styled(Animated.View)`
  width: ${props => props.sWidth}px;
  border-bottom-width: 1px;
  border-bottom-color: ${props =>
    props.focused ? props.theme.colors.white : props.theme.colors.whiteOpac};
  margin-horizontal: 10px;
  ${props => props.error && `border-bottom-color: ${props.theme.colors.error}`};
`;

export const SAnimatedCenteredMargedTopSpacedRow = styled(
  Animated.createAnimatedComponent(StyledSpacedRow),
)`
  position: absolute;
  align-items: center;
  justify-content: center;
  bottom: 70px;
  width: 100%;
`;

export const StyledModalIconPanelItemSelectIcon = styled(ModalIconPanelItem)`
  padding: 0px;
  margin-bottom: 0px;
  width: 120px;
`;

export const StyledModalIconPanelItemIcon = styled(ModalIconPanelItem)`
  margin-top: 66px;
  padding-horizontal: 0px;
  padding-vertical: 0px;
  justify-content: center;
  align-self: center;
`;

export const StyledTouchableOpacityIcon = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  height: 47px;
  padding-left: 10px;
  width: ${props => props.sWidth}px;
`;

export const StyledTouchableRippleDeleteZone = styled.View`
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100px;
  height: 225px;
  z-index: ${props => props.zIndex};
`;
export const StyledTouchableRippleModifyZone = styled.View`
  position: absolute;
  left: 80px;
  top: 0px;
  height: 225px;
  z-index: ${props => props.zIndex};
`;

export const StyledImageSelectIcon = styled(Image)`
  margin-left: 15px;
  max-width: 20px;
`;

export const AnimatedImageModifyIcon = styled(
  Animated.createAnimatedComponent(Image),
)`
  position: absolute;
  top: 97px;
  z-index: 60;
`;

export const AnimatedViewItem = styled(Animated.View)`
  height: 225px;
  width: 100%;
  flex-direction: row;
  padding-horizontal: 30px;
  padding-bottom: 0px;
`;

export const StyledWrapperRound = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.deepBlue};
  border-radius: ${props => props.theme.cardStyle.borderRadius};
`;

export const StyledDetailModal = styled.View`
  width: 100%;
  height: 100%;
  background-color: ${props => props.theme.colors.white};
  border-radius: ${props => props.theme.cardStyle.borderRadius};
`;

export const StyledDetailContainer = styled.View`
  margin-top: 50px;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  padding-horizontal: 50px;
  height: ${props => props.sHeight};
`;

export const StyledDetailTitle = styled.Text`
  color: ${props => props.theme.colors.white};
  font-size: ${props => props.theme.textSizes.big}px;
  text-align: center;
  line-height: 36px;
  padding-top: 5px;
  max-width: 275px;
  font-family: ${props => props.theme.fonts.circularBold};
`;

export const StyledDetailDeadline = styled(MissionDeadline)`
  font-size: ${props => props.theme.textSizes.regular};
  font-family: ${props => props.theme.fonts.circularBook};
`;

export const StyledDetailRelaunch = styled.View`
  position: absolute;
  bottom: 25px;
  z-index: 50;
  align-items: center;
  width: 100%;
`;

export const StyledDetailRelaunchText = StyledTextWhite.extend`
  font-size: ${props => props.theme.textSizes.small}px;
  font-family: ${props => props.theme.fonts.circularBold};
  text-decoration-line: underline;
`;

export const StyledSecurityCodeMargedTop = styled(SecurityCode)`
  margin-top: 50px;
`;

export const StyledDetailIcon = styled(MissionIcon)`
  margin-top: 0px;
  padding: 0px;
  justify-content: center;
  align-self: center;
`;

export const StyledListIcon = styled(MissionIcon)`
  margin-top: 100px;
  flex-direction: column;
`;

export const StyledDetailAmount = styled(MissionAmount)`
  font-size: ${props => props.theme.textSizes.small}px;
  font-family: ${props => props.theme.fonts.circularBold};
`;

export const StyledSubMissionHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding-right: 30px;
  padding-left: 30px;
  position: absolute;
  bottom: 20px;
`;

export const SMissionAddToast = styled.View`
  position: absolute;
  left: 0;
  bottom: 10px;
`;

export const StyledIndexWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const SAnimatedContainerDeepBlue = styled(
  Animated.createAnimatedComponent(StyledContainerDeepBlue),
)`
  width: ${props => props.sWidth}px;
`;

export const STextInput = styled(TextInput)`
  height: 50px;
  padding: 5px;
  font-size: ${props => props.theme.textSizes.normal};
  font-family: ${props => props.theme.fonts.circularBold};
  color: ${props => props.color};
  width: ${props => props.sWidth}px;
`;

export const StyledDetailToastView = styled.View`
  position: absolute;
  top: 0px;
  z-index: 50;
  align-items: center;
  width: 100%;
`;

export const StyledAddTouchableOpacity = styled.TouchableOpacity`
  width: 100%;
  height: 90%;
`;
