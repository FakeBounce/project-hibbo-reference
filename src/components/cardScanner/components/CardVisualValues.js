import React from 'react';
import { string } from 'prop-types';

import { getTranslations } from 'utils/i18n';

import { StyledContainerBasic } from 'styledComponents/containers';

import CardNumberPreview from './CardNumberPreview';

import * as Styles from '../styles';

const CardVisualValues = ({
  name,
  cardNumber,
  expiracyMonth,
  expiracyYear,
  crypto,
}) => {
  return (
    <Styles.SContainer>
      <Styles.SCardWrapper>
        <Styles.SLabel>
          {getTranslations('cardScanner.visual.cardNumber')}
        </Styles.SLabel>

        <CardNumberPreview cardNumber={cardNumber} />
      </Styles.SCardWrapper>

      <Styles.SDateWrapper>
        <StyledContainerBasic>
          <Styles.SLabel>
            {getTranslations('cardScanner.visual.date')}/{getTranslations('cardScanner.visual.month')}
          </Styles.SLabel>
          <Styles.SText>
            {expiracyMonth !== '' ? expiracyMonth : 'XX'}
            /
            {expiracyYear !== '' ? expiracyYear : 'XX'}
          </Styles.SText>
        </StyledContainerBasic>

        <StyledContainerBasic>
          <Styles.SLabel>
            {getTranslations('cardScanner.visual.cvv')}
          </Styles.SLabel>
          <Styles.SText>{crypto !== '' ? crypto : 'XXX'}</Styles.SText>
        </StyledContainerBasic>
      </Styles.SDateWrapper>

      <Styles.SNameWrapper>
        <Styles.SLabel>
          {getTranslations('cardScanner.visual.cardHolder')}
        </Styles.SLabel>
        <Styles.SText>{name !== '' ? name : 'XXXXXX'}</Styles.SText>
      </Styles.SNameWrapper>
    </Styles.SContainer>
  );
};

CardVisualValues.propTypes = {
  name: string.isRequired,
  cardNumber: string.isRequired,
  expiracyMonth: string.isRequired,
  expiracyYear: string.isRequired,
  crypto: string.isRequired,
};

export default CardVisualValues;
