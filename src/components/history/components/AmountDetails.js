import React from 'react';
import { number } from 'prop-types';
import styled from 'styled-components/native';

import { StyledContainerColumn } from 'styles/styledComponents/containers';

import { getTrueNumber, getTranslations } from 'utils/i18n';

import AmountDetailsLine from './AmountDetailsLine';

const StyledContainer = StyledContainerColumn.extend`
  align-self: center;
  margin-bottom: 25;
  width: 75%;
`;
const SLine = styled.View`
  height: 1px;
  width: 100%;
  background-color: ${props => props.theme.colors.grey};
`;

const AmountDetails = ({ piggyAmount, bankAmount }) => {
  // @todo: get livret amount
  return (
    <StyledContainer>
      <AmountDetailsLine
        label={getTranslations('history.piggy')}
        amount={getTrueNumber(piggyAmount)}
      />

      <SLine />

      <AmountDetailsLine
        label={getTranslations('history.bank')}
        amount={getTrueNumber(bankAmount)}
      />

      <SLine />

      <AmountDetailsLine
        label={getTranslations('history.livret')}
        amount={getTrueNumber(0)}
        isTransferable
      />
    </StyledContainer>
  );
};

AmountDetails.propTypes = {
  bankAmount: number.isRequired,
  piggyAmount: number.isRequired,
};

export default AmountDetails;
