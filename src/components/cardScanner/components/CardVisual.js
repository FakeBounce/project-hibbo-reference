import React from 'react';
import { string } from 'prop-types';

import CardVisualValues from './CardVisualValues';

import * as Styles from '../styles';

import { cards, banks } from '../cardVisualDatas';

const cardNb = Math.floor(Math.random() * cards.length);

const CardVisual = ({
  name,
  cardNumber,
  expiracyMonth,
  expiracyYear,
  cardType,
  crypto,
}) => {
  return (
    <Styles.SWrapper>
      <Styles.SCardVisual source={cards[cardNb]}>
        {cardType !== '' &&
          banks[cardType] && (
            <Styles.SBankIcon
              style={{
                width: banks[cardType].width,
                height: banks[cardType].height,
              }}
              source={banks[cardType].icon}
            />
          )}

        <CardVisualValues
          name={name}
          cardNumber={cardNumber}
          expiracyMonth={expiracyMonth}
          expiracyYear={expiracyYear}
          crypto={crypto}
        />
      </Styles.SCardVisual>
    </Styles.SWrapper>
  );
};

CardVisual.propTypes = {
  cardNumber: string.isRequired,
  expiracyMonth: string.isRequired,
  expiracyYear: string.isRequired,
  name: string.isRequired,
  crypto: string.isRequired,
  cardType: string.isRequired,
};

export default CardVisual;
