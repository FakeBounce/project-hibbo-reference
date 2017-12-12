import { StyledXTextBig } from 'styles/styledComponents/texts';

export const StyledMessengerMainText = StyledXTextBig.extend`
  font-family: ${props => props.theme.fonts.circularMedium};
  margin: 30px 30px 0 30px;
`;

export const StyledMessengerMainPlaceHolder = StyledMessengerMainText.extend`
  opacity: 0.39;
`;
