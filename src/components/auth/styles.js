import { Animated, Dimensions, View, ImageBackground } from 'react-native';
import styled from 'styled-components/native';
import Animation from 'lottie-react-native';

import {
  StyledContainerWrapper,
  StyledContainerCenter,
  StyledContainerColumn,
} from 'styledComponents/containers';

import { StyledGreyTextXSmall } from 'styledComponents/texts';

const { width } = Dimensions.get('window');

// Code Selector
export const StyledWrapper = StyledContainerWrapper.extend`
  background-color: ${props => props.theme.colors.white};
`;

export const SPadNumberView = styled.View`
  height: 55%;
`;

export const SLinkTouchable = styled.TouchableOpacity`
  padding-horizontal: 5px;
  margin-bottom: 10px;
`;

export const SLinkText = StyledGreyTextXSmall.extend`
  text-decoration-line: ${props => props.textDecorationLine};
`;

export const SBorder = StyledContainerCenter.extend`
  align-self: center;
  width: ${width - 60}px;
  margin-bottom: ${props => props.marginBottom}px;
  height: 1px;
  background-color: ${props => props.theme.colors.black};
  border-radius: 5px;
`;

export const StyledHeader = styled.View`
  min-height: 70px;
`;
export const StyledCode = styled.View`
  align-self: flex-end;
`;

// Reset Password
export const SInputPasswordView = styled.View`
  justify-content: center;
  height: 100%;
`;

// Auth
export const StyledWrapperAuth = StyledContainerWrapper.extend`
  background-color: ${props => props.theme.colors.white};
`;
const StyledOverflow = styled.View`
  overflow: hidden;
`;

export const AnimatedOverflow = styled(
  Animated.createAnimatedComponent(StyledOverflow),
)``;

// Security Check
export const SToastSecurityCheck = styled.View`
  position: absolute;
  align-items: center;
  z-index: 10;
  top: ${props => props.posY}px;
  left: ${props => props.posX}px;
`;

// AuthProviderErrors
export const SError = styled.View`
  position: absolute;
  align-items: center;
  z-index: 10;
  top: ${props => props.posY}px;
  left: ${props => props.posX}px;
`;

// Back
export const SHeader = styled.View`
  margin-top: 30px;
  margin-left: ${props => (props.isTos ? 0 : 22)}px;
  top: ${props => (props.isTos ? 5 : 0)}px;
`;

// Explain Text
export const SResetTextExplain = StyledContainerCenter.extend`
  margin-top: 30px;
`;

export const SBackImage = styled.Image`
  width: 30px;
  height: 20px;
`;

// Input
export const SContainerInput = styled.View`
  width: 100%;
  margin-bottom: 5px;
`;
export const SInput = styled.TextInput`
  width: 100%;
  text-align: center;
  font-size: ${props =>
    props.inputTextSize === null
      ? props.theme.textSizes.big
      : props.inputTextSize};
  font-family: ${props => props.theme.fonts.circularBook};
`;

// Link
export const SContainerLink = styled.View`
  align-items: center;
  align-self: center;
`;
export const SButtonLink = styled.TouchableOpacity`
  padding-horizontal: 5px;
  margin-bottom: 10px;
`;
export const SLink = styled.Text`
  padding-horizontal: 5px;
  margin-bottom: 10px;
  color: ${props => props.theme.colors.grey};
  font-family: ${props => props.theme.fonts.circularBook};
`;

// Login
export const SContainerLogin = styled(Animated.View)`
  flex: 1;
  background-color: ${props => props.theme.colors.white};
`;
export const SBorderLogin = styled.View`
  width: ${Dimensions.get('window').width - 60}px;
  align-self: center;
  margin-bottom: 50px;
  height: 1px;
  background-color: ${props => props.theme.colors.black};
  border-radius: 5px;
`;
export const SLinksLogin = styled.View`
  margin-top: 20px;
`;
export const SWrapperLogin = styled.View`
  width: ${Dimensions.get('window').width - 60}px;
  align-self: center;
`;

// Login
export const AProgessBar = styled(Animated.View)`
  height: 5px;
  border-radius: 5px;
  background-color: ${props => props.color};
`;
export const SProgressStep = styled.View`
  position: relative;
  top: 3px;
  width: 100%;
  align-self: center;
  height: 1px;
  background-color: ${props => props.theme.colors.black};
  border-radius: 5px;
`;
export const SContainerProgress = styled.View`
  width: ${Dimensions.get('window').width - 60}px;
  align-self: center;
  margin-bottom: 50px;
  height: 5px;
`;

// Login
export const SButtonProvider = styled.TouchableOpacity`
  flex: 1;
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  align-self: center;
  border-bottom-width: ${props => (props.bordered ? 1 : 0)}px;
  border-bottom-color: ${props => props.theme.colors.buttonGrey};
`;
export const SProviderAnim = styled(Animation)`
  width: 75px;
  height: 75px;
`;

// Register
export const SBorderRegister = SBorderLogin.extend`
  justify-content: center;
`;

// SelectAuthProvider
export const AContainerAuthProv = styled(
  Animated.createAnimatedComponent(View),
)`
  position: absolute;
  bottom: 0px;
  width: 100%;
  flex-direction: row;
  background-color: ${props => props.theme.colors.white};
`;

// Submit
export const SButtonSubmit = styled.View`
  align-items: center;
  align-self: center;
`;
export const SNextSubmit = styled(Animation)`
  width: 82px;
  height: 82px;
`;

// Submit
export const ABgVisual = styled(Animated.View)`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: ${props => props.theme.colors.black};
`;
export const AImageVisual = styled(
  Animated.createAnimatedComponent(ImageBackground),
)`
  width: 100%;
  height: 100%;
  opacity: 1;
`;

// TermsOfServices
export const STitleContainer = styled(Animated.ScrollView)`
  margin-top: 15px;
  padding-horizontal: 40px;
  background-color: ${props => props.theme.colors.white};
`;
export const STitleTerms = StyledContainerColumn.extend`
  padding-vertical: 35px;
`;
export const SIntroTerms = styled.View`
  padding-bottom: 45px;
`;
export const STermsButton = styled.View`
  align-items: center;
  padding-vertical: 30px;
`;
export const STermsError = styled.View`
  margin-top: 25px;
`;

export const STermsWrapper = styled.View`
  margin-top: 50px;
`;

export const SHeaderWrapper = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: center;
`;
export const SHeaderButton = styled.View`
  flex: 1;
  align-items: flex-start;
`;
export const SHeaderTitle = styled.View`
  flex: 3;
`;

// ProviderLinks;
export const SRow = styled.View`
  flex-direction: row;
  align-items: center;
`;
