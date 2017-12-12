import { Animated, Image, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import TypeWriter from 'react-native-typewriter';
import Animation from 'lottie-react-native';

import {
  StyledContainerRow,
  StyledContainerBasic,
  StyledContainerColumn,
} from 'styledComponents/containers';
import { StyledTextSmall } from 'styledComponents/texts';

const { width, height } = Dimensions.get('window');

const getWidth = animWidth => width / (width / animWidth);
const getHeight = (animWidth, animHeight) =>
  getWidth(animWidth) / (animWidth / animHeight);

// Monimalz selection
export const StyledWrapperMZSelection = StyledContainerBasic.extend`
  position: absolute;
  width: 100%;
  height: 100%;
`;
const StyledWrapperContent = styled.View`
  width: 100%;
  height: 50%;
`;
export const StyledWrapperTopMZSelection = StyledWrapperContent.extend`
  flex: 2;
  justify-content: flex-end;
`;
export const StyledWrapperBottomMZSelection = StyledWrapperContent.extend`
  flex: 3;
`;
export const STitleName = styled.View`
  min-height: 275px;
  top: 60px;
`;

// Title
const StyledWrapperTitle = StyledContainerColumn.extend`
  margin-vertical: 25px;
  background-color: transparent;
  min-height: 125px;
`;
export const AnimatedWrapperTitle = styled(
  Animated.createAnimatedComponent(StyledWrapperTitle),
)``;
export const StyledContainerTitle = styled.View`
  justify-content: center;
  align-items: center;
`;
export const StyledTypeWritter = styled(TypeWriter)`
  text-align: center;
  font-family: ${props => props.theme.fonts.circularBold};
  font-size: ${props => props.theme.textSizes.normal};
  line-height: 38px;
`;
export const SMonimalzName = styled(Animated.Image)`
  width: 150px;
  height: ${props => props.heightStyle}px;
`;

// DecorationsMonkey
export const AImageContainer = styled(Animated.View)`
  position: absolute;
  width: ${width}px;
  height: ${height}px;
`;
export const SLiana = styled(Animation)`
  position: absolute;
  top: 0px;
  right: ${width - getWidth(346)}px;
  width: ${getWidth(346)}px;
  height: ${getHeight(346, 120)}px;
`;
export const SLeftTree = styled(Animation)`
  position: absolute;
  top: 0px;
  left: -${getWidth(378) / 4}px;
  width: ${getWidth(378)}px;
  height: ${getHeight(378, 420)}px;
`;
export const SRightTree = styled(Animation)`
  position: absolute;
  top: ${height / 11}px;
  right: -${getWidth(340) / 8}px;
  width: ${getWidth(340)}px;
  height: ${getHeight(340, 300)}px;
`;

export const ARock = styled(Animated.createAnimatedComponent(Image))`
  position: absolute;
  bottom: -47px;
  left: 0px;
  width: 199px;
  height: 47px;
`;
export const ABigCloud = styled(Animated.createAnimatedComponent(Image))`
  position: absolute;
  top: ${height / 8}px;
  right: -333px;
  width: 333px;
  height: 142px;
`;
export const ASmallCloud = styled(Animated.createAnimatedComponent(Image))`
  position: absolute;
  top: ${height / 2.5}px;
  right: -166px;
  width: 166px;
  height: 71px;
  z-index: -1;
`;

// DecorationsPanda
export const STree = styled(Animation)`
  position: absolute;
  top: ${height / 10}px;
  right: 0px;
  width: ${getWidth(250)}px;
  height: ${getHeight(250, 200)}px;
`;
export const ASun = styled(Animated.createAnimatedComponent(Image))`
  position: absolute;
  top: -173px;
  right: 50px;
  width: 173px;
  height: 173px;
`;

// DecorationsWhale
export const SSunWhale = styled(Animated.createAnimatedComponent(Image))`
  position: absolute;
  top: ${height - 198}px;
  left: ${width}px;
  width: 198px;
  height: 198px;
`;
export const AIceberg = styled(Animated.createAnimatedComponent(Image))`
  position: absolute;
  top: ${height - 264}px;
  left: -279px;
  width: 279px;
  height: 204px;
`;
export const AAurore = styled(Animated.createAnimatedComponent(Image))`
  position: absolute;
  top: 0px;
  left: -236px;
  width: 236px;
  height: 264px;
`;

// DecorationsMonkeyFront
export const AZIndexFront = styled.View`
  z-index: 2;
  position: absolute;
  width: ${width}px;
  height: ${height}px;
`;
export const AWrapperFront = styled(Animated.View)`
  z-index: 2;
  position: absolute;
  width: ${width}px;
  height: ${height}px;
`;
export const ALeftTreeFront = styled(Animated.createAnimatedComponent(Image))`
  position: absolute;
  z-index: 2;
  bottom: 100px;
  left: -138px;
  width: 104px;
  height: 138px;
`;
export const ABottomTree = styled(Animated.createAnimatedComponent(Image))`
  position: absolute;
  z-index: 3;
  bottom: -125px;
  right: 0px;
  width: 134px;
  height: 125px;
`;

// DecorationsPandaFront
export const ABamboo = styled(Animation)`
  position: absolute;
  z-index: 2;
  bottom: 20px;
  left: -15px;
  width: ${getWidth(230)}px;
  height: ${getHeight(230, height)}px;
`;
export const ARockPanda = styled(Animation)`
  position: absolute;
  z-index: 2;
  bottom: 10px;
  right: 0px;
  width: ${getWidth(132)}px;
  height: ${getHeight(132, 90)}px;
`;

// DecorationsWhaleFront
export const AWhale = styled(Animation)`
  position: absolute;
  z-index: 3;
  width: ${width}px;
  height: ${width * 1.7}px;
  bottom: 0px;
  left: 0px;
`;

// MonimalzSwiper
export const SWraper = styled(Animated.View)`
  flex: 1;
  justify-content: flex-start;
  align-items: center;
`;
export const SDot = styled(Animated.View)`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: ${props => props.theme.colors.lightGreyBullet};
  margin-horizontal: 5px;
`;
export const SDotBg = styled(Animated.View)`
  z-index: 2;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: ${props => props.theme.colors.darkGrey};
`;
export const SDotWraper = StyledContainerRow.extend`
  width: 100%;
  margin-bottom: 30px;
  justify-content: center;
  left: -5px;
`;
export const StextSwiper = StyledTextSmall.extend`
  color: ${props => props.theme.colors.textGrey};
`;

export const StextMonimalzNameSwiper = StyledTextSmall.extend`
  color: ${props => props.theme.colors.primary};
`;
