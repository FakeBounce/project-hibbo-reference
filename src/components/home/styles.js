import styled from 'styled-components/native';
import {
  StyledContainerColumn,
  StyledContainerBasic,
} from 'styles/styledComponents/containers';
import {
  StyledTextXSmall,
  StyledTextXNormal,
} from 'styles/styledComponents/texts';
import { Animated, Platform, Dimensions, TouchableOpacity } from 'react-native';
import appStyles from 'styles/appStyles';
import Loader from 'shared/components/Loader';
import Animation from 'lottie-react-native';
import CircleGimmick from './components/CircleGimmick';
import CurveGimmick from './components/CurveGimmick';
import CrossGimmick from './components/CrossGimmick';

const { width } = Dimensions.get('window');

const homeAnimeWidth = width - appStyles.size.cardMargin * 2;

const getWidth = animWidth => homeAnimeWidth / (homeAnimeWidth / animWidth);

const getHeight = (animWidth, animHeight) =>
  getWidth(animWidth) / (animWidth / animHeight);

export const StyledTransactionText = styled.Text`
  color: ${props => props.theme.colors.pelicanColor};
  font-family: ${props => props.theme.fonts.circularBook};
  font-size: ${props => props.theme.textSizes.xbig}px;
`;
// Last Transaction
export const StyledContainerLastTransaction = Animated.createAnimatedComponent(StyledContainerColumn.extend`
  margin-top: 15px;
`);
export const StyledText = StyledTextXSmall.extend`
  color: ${props => props.theme.colors.lightGrey};
`;

// Home Animation
export const SContainerHomeAnimation = Platform.select({
  ios: () => {
    return styled.View`
      position: absolute;
      bottom: 0px;
      left: ${props => width / 2 - props.jsonHeight / 2}px;
      height: ${props => props.jsonHeight}px;
      width: ${props => props.jsonWidth}px;
    `;
  },
  android: () => {
    return styled.View`
      flex: 1;
      align-items: center;
      justify-content: flex-end;
    `;
  },
})();
export const SHomeAnimation = Platform.select({
  ios: () => {
    return styled(Animation)`
      flex: 1;
    `;
  },
  android: () => {
    return styled(Animation)`
      justify-content: center;
      width: ${props => getWidth(props.jsonWidth)}px;
      height: ${props => getHeight(props.jsonWidth, props.jsonHeight)}px;
    `;
  },
})();

export const SaddPulseAnimation = styled(Animation)`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
`;

export const StyledBottomContainer = StyledContainerBasic.extend`
  justify-content: space-between;
`;

export const StyledMainContainer = StyledContainerBasic.extend`
  margin: ${props => props.theme.size.cardMargin}px;
`;

export const StyledMainBottomContainer = StyledContainerBasic.extend`
  background-color: ${props => props.theme.colors.white};
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;

// This is the round behind the home avatar
export const StyledHeaderContainer = styled.View`
  height: 100px;
  background-color: ${props => props.theme.colors.white};
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  shadow-opacity: 0;
  shadow-color: transparent;
`;

export const SFlexEndContainer = styled.View`
  flex-direction: row;
  align-items: flex-end;
`;

export const STransactionCredit = StyledTextXNormal.extend`
  color: ${props => props.theme.colors.blueGreen};
`;

export const STransactionDebit = StyledTextXNormal.extend`
  color: ${props => props.theme.colors.red};
`;

export const STransactionAmount = StyledTextXNormal.extend`
  color: ${props => props.color};
`;

export const STransactionDate = StyledTextXSmall.extend`
  color: ${props => props.theme.colors.lightGrey};
  padding-bottom: 3px;
`;
export const SCenteredView = styled.View`
  width: ${props => props.width}px;
  height: ${props => props.width}px;
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 100;
  justify-content: center;
  align-items: center;
`;

export const SAbsoluteLoader = styled(Loader)`
  position: relative;
  z-index: 100;
`;

export const SSwitchAvatar = styled.Image`
  border-radius: ${props => props.width / 2}px;
  width: ${props => props.width}px;
  height: ${props => props.width}px;
`;

export const SSwitchWrapAvatar = styled.View`
  margin-top: 25px;
  margin-bottom: 25px;
  border-radius: ${props => props.width / 2}px;
  width: ${props => props.width}px;
  height: ${props => props.width}px;
  shadow-radius: 2px;
  shadow-opacity: 0.1;
  justify-content: center;
  align-items: center;
  shadow-offset: 0px 15px;
`;

export const SAnimatedYellowContainer = styled(Animated.View)`
  background-color: ${props => props.theme.colors.buttonYellow};
  position: absolute;
  top: ${props => props.realWidth * -1 + 60}px;
  left: ${props => props.realWidth * -1}px;
  width: ${props => props.realWidth * 3 - 10}px;
  height: ${props => props.realWidth * 3}px;
  border-radius: ${props => props.realWidth * 1.5}px;
  padding-horizontal: ${props => props.realWidth}px;
  justify-content: center;
  align-items: center;
  padding-top: ${props => props.realWidth - 60}px;
  padding-bottom: 140px;
`;

export const SPictureContainer = styled.View`
  height: ${props => props.height}px;
  overflow: hidden;
  background-color: transparent;
`;

export const SHole = styled.View`
  margin-left: ${props =>
    -((props.holeWrapperWidth - props.cardWidth) / 2 + 10)}px;
  margin-top: ${props =>
    -((props.holeWrapperWidth - props.holeWrapperHeight) / 2)}px;
  width: ${props => props.holeWrapperWidth}px;
  height: ${props => props.holeWrapperWidth}px;
  border-radius: 400px;
  border-color: ${props => props.theme.colors.white};
  border-width: 150px;
`;

export const SAvatarTouchableOpacity = styled(TouchableOpacity)`
  position: absolute;
  top: ${props => (props.holeWrapperHeight - props.holeSize) / 2}px;
  left: ${props => (props.cardWidth - props.holeSize) / 2 + 15}px;
`;

export const SAnimatedAvatarImage = styled(Animated.Image)`
  width: ${props => props.holeSize}px;
  height: ${props => props.holeSize}px;
  border-radius: ${props => props.holeSize / 2}px;
`;

export const SYellowAddImage = styled.Image`
  width: 22px;
  height: 22px;
`;

export const SAddTouchableOpacity = styled(TouchableOpacity)`
  flex: 1;
  padding: 25px;
  justify-content: center;
  align-items: center;
  margin-vertical: 25px;
  border-radius: 300px;
  background-color: ${props => props.theme.colors.darkGrey};
  width: ${props => props.holeSize}px;
  height: ${props => props.holeSize}px;
`;

export const SCircleGimmick = styled(CircleGimmick)`
  position: absolute;
  top: ${props => (props.holeWrapperHeight - props.holeSize) / 2}px;
  left: ${props => (props.cardWidth - props.holeSize) / 2 - 30}px;
  width: 56px;
  height: 56px;
`;

export const SCurveGimmick = styled(CurveGimmick)`
  position: absolute;
  bottom: ${props => (props.holeWrapperHeight - props.holeSize) / 2}px;
  right: ${props => (props.cardWidth - props.holeSize) / 2 - 15}px;
  width: 40px;
  height: 42px;
`;

export const SCrossGimmick = styled(CrossGimmick)`
  position: absolute;
  bottom: ${props => (props.holeWrapperHeight - props.holeSize) / 2 + 70}px;
  right: ${props => (props.cardWidth - props.holeSize) / 2 - 18}px;
  width: 26px;
  height: 26px;
`;
