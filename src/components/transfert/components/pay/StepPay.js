import React from 'react';
import { string, number, shape, func, array } from 'prop-types';

import { getTranslations } from 'utils/i18n';

import SecurityCode from 'shared/SecurityCode';
import ChooseAction from './ChooseAction';
import Step from '../StepHOC';

const StepPay = ({
  amount,
  step,
  profileParent,
  profileChild,
  navigation,
  goToNextStep,
  paymentMeans,
  setCardId,
  transfertStart,
  setError,
  piggyBank,
}) => {
  switch (step) {
    default:
    case 1:
      return (
        <Step
          Target={SecurityCode}
          setError={setError}
          navigation={navigation}
          text={getTranslations('transfert.pay.step1.amountConfirmation', {
            amount,
          })}
          isDebit={false}
          amount={amount}
          profileParent={profileParent}
          action={goToNextStep}
          paymentMeans={paymentMeans}
          setCardId={setCardId}
          piggyBank={piggyBank}
          headerText={getTranslations('transfert.pay.step1.header')}
        />
      );
    case 2:
      return (
        <Step
          Target={ChooseAction}
          navigation={navigation}
          text={[
            getTranslations(
              'transfert.pay.step2.bubble.amountConfirmation.part1',
            ),
            getTranslations(
              'transfert.pay.step2.bubble.amountConfirmation.part2',
              {
                firstname: profileChild.nickname,
              },
            ),
          ]}
          isDebit={false}
          paymentMeans={paymentMeans}
          amount={amount}
          profileParent={profileParent}
          profileChild={profileChild}
          action={goToNextStep}
          transfertStart={transfertStart}
          piggyBank={piggyBank}
        />
      );
  }
};

StepPay.propTypes = {
  amount: string.isRequired,
  step: number.isRequired,
  navigation: shape({
    dispatch: func.isRequired,
    goBack: func.isRequired,
    navigate: func.isRequired,
    setParams: func.isRequired,
    state: shape({
      key: string.isRequired,
      routeName: string.isRequired,
      params: shape({
        selectedTab: number.isRequired,
        amount: string.isRequired,
      }),
    }).isRequired,
  }).isRequired,
  profileParent: shape({}).isRequired,
  profileChild: shape({}).isRequired,
  goToNextStep: func.isRequired,
  paymentMeans: shape({
    cardId: string.isRequired,
    parent: shape({
      card: array.isRequired,
    }),
  }).isRequired,
  piggyBank: shape({
    walletId: string,
  }).isRequired,
  setCardId: func.isRequired,
  transfertStart: func.isRequired,
  setError: func.isRequired,
};

export default StepPay;
