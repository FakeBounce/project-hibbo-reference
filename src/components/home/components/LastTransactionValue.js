import React from 'react';
import { string, number } from 'prop-types';
import dateFormat from 'dateformat';
import { getTranslations, getTrueNumber } from 'utils/i18n';
import appStyles from 'styles/appStyles';
import {
  SFlexEndContainer,
  STransactionAmount,
  STransactionCredit,
  STransactionDate,
  STransactionDebit,
} from '../styles';

const LastTransactionValue = ({ type, amount, date }) => {
  return (
    <SFlexEndContainer>
      {type === 'credit' ? (
        <STransactionCredit>+</STransactionCredit>
      ) : (
        <STransactionDebit>-</STransactionDebit>
      )}
      <STransactionAmount
        color={
          type === 'credit' ? appStyles.colors.blueGreen : appStyles.colors.red
        }
      >
        {`${getTrueNumber(amount)} `}
      </STransactionAmount>
      <STransactionDate>
        {`${getTranslations('transaction.date')} ${dateFormat(
          date * 1000,
          'dd.mm.yy',
        )}`}
      </STransactionDate>
    </SFlexEndContainer>
  );
};

LastTransactionValue.defaultProps = {
  type: '',
};

LastTransactionValue.propTypes = {
  type: string,
  amount: number.isRequired,
  date: number.isRequired,
};

export default LastTransactionValue;
