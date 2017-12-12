import React from 'react';
import { string, number } from 'prop-types';
import dateFormat from 'dateformat';

import { getTranslations } from 'utils/i18n';

import { StyledContainerColumn } from 'styles/styledComponents/containers';
import {
  StyledTextSmall,
  StyledTextXSmall,
} from 'styles/styledComponents/texts';

const StyledContainer = StyledContainerColumn.extend`
  padding-top: 30px;
  padding-bottom: 10px;
`;
const StyledDate = StyledTextXSmall.extend`
  color: ${props => props.theme.colors.textGrey};
  margin-top: 5px;
`;

const TransactionMessage = ({ message, date }) => {
  return (
    <StyledContainer>
      <StyledTextSmall>{message}</StyledTextSmall>
      <StyledDate>{`${getTranslations('history.date.from')} ${dateFormat(
        date,
        'dd.mm.yy',
      )}`}
      </StyledDate>
    </StyledContainer>
  );
};

TransactionMessage.defaultProps = {
  message: '',
};

TransactionMessage.propTypes = {
  message: string,
  date: number.isRequired,
};

export default TransactionMessage;
