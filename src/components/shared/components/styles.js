import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

const codeSelectorWidth = Dimensions.get('window').width / 1.3;
const codeSelectorDot = codeSelectorWidth / 4;
export const SImageBg = styled.ImageBackground`
  flex-direction: row;
  align-items: center;
  align-self: center;
  margin-top: 30px;
  width: ${codeSelectorWidth}px;
  height: ${codeSelectorWidth / 4.2}px;
`;
export const SImageDot = styled.View`
  width: ${codeSelectorDot}px;
  align-items: center;
  justify-content: center;
`;
