import React from 'react';
import { number } from 'prop-types';
import dateFormat from 'dateformat';

import { getTranslations, getTrueNumber } from 'utils/i18n';

import * as Styles from '../styles';

const TotalBalance = ({ totalAmount }) => {
  return (
    <Styles.StyledContainerTotal>
      <Styles.StyledDate>{`${getTranslations(
        'history.balance.date',
      )} ${dateFormat(new Date(), 'dd.mm.yy')}`}
      </Styles.StyledDate>
      <Styles.StyledAmount>{`${getTrueNumber(
        totalAmount,
      )}`}
      </Styles.StyledAmount>
    </Styles.StyledContainerTotal>
  );
};

TotalBalance.propTypes = {
  totalAmount: number.isRequired,
};

export default TotalBalance;
