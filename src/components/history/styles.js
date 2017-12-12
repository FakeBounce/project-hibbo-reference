import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import {
  StyledContainerRow,
  StyledContainerColumn,
  StyledContainerBasic,
  StyledAndroidWrapper,
} from 'styles/styledComponents/containers';
import { StyledTextXSmall, StyledTextBig } from 'styles/styledComponents/texts';

// Header
export const StyledContainer = StyledContainerRow.extend`
  padding-top: 33px;
  padding-bottom: 10px;
`;
export const StyledCentered = StyledContainerBasic.extend`
  align-items: center;
  align-self: center;
`;
export const StyledButton = styled.View`
  padding-left: 15px;
`;

// Total Balance
export const StyledContainerTotal = StyledContainerColumn.extend`
  margin-top: 25px;
  margin-bottom: 15px;
`;
export const StyledDate = StyledTextXSmall.extend`
  color: ${props => props.theme.colors.balanceGreen};
`;
export const StyledAmount = StyledTextBig.extend`
  margin-top: 5px;
`;

// Transaction Row
export const StyledContainerTransaction = StyledContainerRow.extend`
  padding-vertical: 18px;
  background-color: ${props => props.theme.colors.white};
  border-bottom-width: 1px;
  border-bottom-color: ${props => props.theme.colors.buttonGrey};
`;
export const StyledLeftSide = styled.View`
  flex: 1.5;
  align-items: center;
`;
export const StyledRightSide = styled.View`
  flex: 1.5;
  align-self: flex-start;
  margin-top: 4px;
`;
export const StyledMiddle = styled.View`
  flex: 3;
`;
export const StyledTextSubTitle = StyledTextXSmall.extend`
  color: ${props => props.theme.colors.textGrey};
`;
export const StyledTextAmount = StyledTextXSmall.extend`
  font-family: ${props => props.theme.fonts.circularBold};
`;

// Transaction Ticket
export const StyledContainerTransactionTicket = StyledContainerColumn.extend`
  background-color: ${props => props.theme.colors.white};
  padding-vertical: 15px;
  padding-horizontal: 25px;
  max-height: ${Dimensions.get('window').height / 1.5}px;
`;
export const StyledHack = StyledAndroidWrapper.extend`
  align-items: center;
`;
export const StyledImageWaves = styled.Image`
  height: 13px;
`;

// Transaction Details
export const StyledContainerTransactionDetail = StyledContainerColumn.extend`
  padding-top: 10px;
  padding-bottom: 30px;
`;
export const StyledAccountNumberWrapper = styled.View`
  padding-vertical: 20px;
`;
export const StyledImageLine = styled.Image`
  height: 1px;
  width: 80%;
  align-items: center;
  margin-vertical: 15px;
`;

// AmountDetailsLine
export const SAmountLine = styled.View`
  width: 100%;
  flex-direction: row;
  padding-vertical: 5px;
`;
export const SAmountTitle = styled.View`
  min-width: 35%;
`;
export const SAmountCount = styled.View`
  min-width: 30%;
`;
export const SAmountTransfert = styled.View`
  min-width: 35%;
  align-items: flex-end;
`;
