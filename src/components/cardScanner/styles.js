import { Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import styled from 'styled-components/native';

// Card Scanner
export const StyledContainer = styled.KeyboardAvoidingView`
  flex: 1;
  padding-horizontal: 15px;
  padding-top: 15px;
  overflow: hidden;
  background-color: ${props => props.theme.colors.white};
`;
export const StyledHeader = styled.View`
  margin-top: ${props => (props.isInitial ? -20 : -10)}px;
  margin-left: ${props => (props.isInitial ? -20 : -10)}px;
`;
export const StyledCentered = styled.View`
  align-items: center;
`;
export const StyledScrollView = styled.ScrollView`
  margin-bottom: ${props => (props.isInitial ? 75 : 0)}px;
`;
export const SButtonWrapper = styled.View`
  align-self: center;
  width: 150px;
  margin-bottom: 15px;
`;

export const styles = EStyleSheet.create({
  container: {
    backgroundColor: '$colors.black',
  },
  wrapper: {
    flex: 1,
    overflow: 'hidden',
  },
});

// CardVisual
const cardWidth = Dimensions.get('window').width - 60;
const cardHeight = cardWidth / 1.7;
export const SWrapper = styled.View`
  border-radius: 8px;
  overflow: hidden;
`;
export const SCardVisual = styled.ImageBackground`
  width: ${cardWidth}px;
  height: ${cardWidth / 1.7}px;
`;
export const SBankIcon = styled.Image`
  position: absolute;
  right: 10px;
  top: 10px;
`;

// CardVisualValues
export const SContainer = styled.View`
  width: 100%;
  height: 100%;
`;
export const SCardWrapper = styled.View`
  position: absolute;
  top: ${cardHeight / 6}px;
  left: ${cardWidth / 15}px;
`;
export const SDateWrapper = styled.View`
  position: absolute;
  top: ${cardHeight / 2.2}px;
  left: ${cardWidth / 15}px;
  flex-direction: row;
`;
export const SNameWrapper = styled.View`
  position: absolute;
  bottom: 0px;
  left: ${cardWidth / 15}px;
`;
export const SLine = styled.View`
  flex-direction: row;
  align-items: center;
`;
export const SLabel = styled.Text`
  color: ${props => props.theme.colors.white};
  font-family: ${props => props.theme.fonts.circularBook};
  font-size: ${props => props.theme.textSizes.xxxsmall}px;
  letter-spacing: 1px;
  margin-bottom: 2px;
  background-color: transparent;
`;
export const SText = styled.Text`
  color: ${props => props.theme.colors.gold};
  font-family: ${props => props.theme.fonts.circularBook};
  font-size: ${props => props.theme.textSizes.xsmall}px;
  letter-spacing: 3px;
  margin-bottom: 10px;
  margin-right: 5px;
  background-color: transparent;
`;

// Form
export const SForm = styled.View`
  flex: 1;
  margin-horizontal: 15px;
  margin-top: 30px;
  margin-bottom: 25px;
`;
