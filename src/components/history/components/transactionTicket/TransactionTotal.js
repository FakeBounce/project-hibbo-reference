import React from 'react';
import { number, string } from 'prop-types';

import { getTrueNumber } from 'utils/i18n';

import { StyledTextNormal } from 'styles/styledComponents/texts';

const TransactionTotal = ({ amount, type }) => {
  return (
    <StyledTextNormal>{`${getTrueNumber(amount, type)}`}</StyledTextNormal>
  );
};

TransactionTotal.propTypes = {
  amount: number.isRequired,
  type: string.isRequired,
};

export default TransactionTotal;
