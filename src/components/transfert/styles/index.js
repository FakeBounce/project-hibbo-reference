import { StyledContainerCenter } from 'styles/styledComponents/containers';
import {
  StyledTextXSmall,
  StyledTextSmall,
  StyledTextBig,
} from 'styles/styledComponents/texts';
import { Animated, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import Animation from 'lottie-react-native';

const widthHeader = Dimensions.get('window').width - 75;
// Choose Action
export const SChooseActionButton = styled(Animated.View)`
  flex-direction: row;
  margin-left: 45px;
`;

export const SChooseActionFooter = styled(Animated.View)`
  bottom: 24px;
  justify-content: flex-end;
  align-items: flex-end;
  flex: 1;
  margin-right: 50px;
`;

// Transfer Header
export const STransferHeaderUnderline = styled(Animated.View)`
  margin-left: 5px;
`;
export const STransferHeaderImg = styled.Image`
  margin-left: 25px;
  width: ${widthHeader}px;
  top: 39px;
`;
export const STransferHeaderUnderLineImg = styled.Image`
  width: ${widthHeader / 3}px;
  margin-left: 25px;
`;

export const SChooseActionWrapper = styled.View`
  flex: 1;
  margin-top: 20px;
  margin-left: ${props => props.theme.size.cardMargin}px;
`;

export const SChooseActionMessage = styled.View`
  flex: 1;
  margin-top: 20px;
  margin-left: ${props => props.theme.size.cardMargin}px;
`;

export const SChooseActionAvatar = styled.Image`
  width: 30px;
  height: 30px;
`;

export const SConfirmDebitView = styled(Animated.View)`
  flex: 1;
  align-items: center;
  margin-top: 30px;
`;

export const SConfirmTextBig = StyledTextBig.extend`
  font-family: ${props => props.theme.fonts.circularMedium};
  justify-content: center;
`;

export const SConfirmTextSmall = StyledTextSmall.extend`
  font-family: ${props => props.theme.fonts.circularMedium};
  margin-horizontal: 20px;
  align-items: center;
  justify-content: center;
`;

export const SAvatarView = styled.View`
  width: 120px;
  height: 120px;
  justify-content: center;
  align-items: center;
`;

export const SPictureContainer = styled(
  Animated.createAnimatedComponent(SAvatarView),
)`
  padding-top: 20px;
  justify-content: flex-start;
`;

export const SGimmick = styled(Animated.Image)`
  background-color: transparent;
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
`;

export const SPulse = styled(Animated.View)`
  position: absolute;
  top: 20px;
  left: 20px;
  width: 80px;
  height: 80px;
  background-color: ${props => props.color};
  border-radius: 60px;
`;

export const SSliderAnimated = styled(Animated.View)`
  top: 0px;
  position: absolute;
  background-color: ${props => props.theme.colors.blueGreen};
  width: ${props => props.confirmButtonSlider}px;
  height: ${props => props.confirmButtonSlider}px;
  border-radius: ${props => props.confirmButtonSlider / 2}px;
`;

export const SText = StyledTextXSmall.extend`
  color: ${props => props.theme.colors.lightGrey};
`;

export const SSliderAnimation = styled(Animation)`
  top: 0px;
  position: absolute;
  left: 0px;
  width: ${props => props.confirmButtonSlider}px;
  height: ${props => props.confirmButtonSlider}px;
`;

export const SSliderMainContainer = StyledContainerCenter.extend`
  margin-vertical: 15px;
  width: 100px;
  height: ${props => props.heightSlider}px;
`;

export const SSlider = StyledContainerCenter.extend`
  background-color: ${props => props.theme.colors.greyOpac};
  border-radius: 40px;
  width: 40px;
  height: ${props => props.heightSlider}px;
`;

export const SSliderBackground = styled.Image`
  flex: 1;
  margin-vertical: 30px;
`;

export const ASlideProgress = styled(Animated.View)`
  position: absolute;
  top: 30px;
  background-color: ${props => props.theme.colors.black};
  width: 2px;
`;
