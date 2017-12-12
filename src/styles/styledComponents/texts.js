import styled from 'styled-components/native';

export const StyledTextNormal = styled.Text`
  font-family: ${props => props.theme.fonts.circularBook};
  font-size: ${props => props.theme.textSizes.normal};
  color: ${props => props.theme.colors.primary};
`;

export const StyledTextXSmall = StyledTextNormal.extend`
  font-size: ${props => props.theme.textSizes.xsmall};
`;

export const StyledTextSmall = StyledTextNormal.extend`
  font-size: ${props => props.theme.textSizes.small};
`;

export const StyledTextXXSmall = StyledTextNormal.extend`
  font-size: ${props => props.theme.textSizes.xxsmall};
`;

export const StyledGreyTextXSmall = StyledTextXSmall.extend`
  font-family: ${props => props.theme.fonts.circularBook};
  color: ${props => props.theme.colors.grey};
`;

export const StyledTextBig = StyledTextNormal.extend`
  font-size: ${props => props.theme.textSizes.big};
`;

export const StyledXTextBig = StyledTextNormal.extend`
  font-size: ${props => props.theme.textSizes.xbig};
`;

export const StyledTextRegularBold = StyledTextNormal.extend`
  font-size: ${props => props.theme.textSizes.regular};
  font-family: ${props => props.theme.fonts.circularBold};
`;

export const StyledTextWhite = styled.Text`
  color: ${props => props.theme.colors.white};
`;

export const StyledTextSmallWhite = StyledTextSmall.extend`
  color: ${props => props.theme.colors.white};
`;

export const StyledWhiteTextXSmallBold = StyledTextXSmall.extend`
  font-family: ${props => props.theme.fonts.circularBold};
  color: ${props => props.theme.colors.white};
`;

export const StyledTextXXBig = StyledTextNormal.extend`
  font-size: ${props => props.theme.textSizes.xxbig};
`;

export const StyledTextXNormal = StyledTextNormal.extend`
  font-size: ${props => props.theme.textSizes.xnormal};
`;
