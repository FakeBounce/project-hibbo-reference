import React from 'react';
import { string, number, shape, func, array } from 'prop-types';

import { getTranslations } from 'utils/i18n';

import SecurityCode from 'shared/SecurityCode';
import ChooseRecipient from './ChooseRecipient';
import ConfirmDebit from './ConfirmDebit';
import Step from '../StepHOC';

const StepDebit = ({
  amount,
  step,
  profileParent,
  navigation,
  goToNextStep,
  transfertStart,
  paymentMeans,
  setSelectedBankAccount,
  setError,
  piggyBank,
  saveBankAccount,
  profileChild,
}) => {
  switch (step) {
    default:
    case 1:
      return (
        <Step
          Target={ChooseRecipient}
          navigation={navigation}
          isDebit
          amount={amount}
          profileParent={profileParent}
          saveBankAccount={saveBankAccount}
          action={goToNextStep}
          headerText={getTranslations('transfert.debit.step1.header', {
            amount,
          })}
          recipients={paymentMeans.parent.bank}
          setSelectedBankAccount={setSelectedBankAccount}
        />
      );
    case 2:
      return (
        <Step
          Target={ConfirmDebit}
          navigation={navigation}
          isDebit
          amount={amount}
          profileParent={profileParent}
          action={goToNextStep}
          headerText={getTranslations('transfert.debit.step2.header')}
          paymentMeans={paymentMeans}
          resetSteps={2}
        />
      );
    case 3:
      return (
        <Step
          Target={SecurityCode}
          setError={setError}
          navigation={navigation}
          text={getTranslations(
            'transfert.debit.step3.amountConfirmation',
            {
              amount,
              fullName: paymentMeans.bankAccount.account_holder_name,
            },
            'fullName',
          )}
          isDebit
          amount={amount}
          profileParent={profileParent}
          action={() => {
            transfertStart(
              {
                profileParentId: profileParent.id,
                profileChildId: profileChild.id,
                amount,
                bankId: paymentMeans.bankAccount.id,
                walletId: piggyBank.walletId,
              },
              'payOut',
            );
            navigation.goBack(null);
            navigation.goBack(null);
            navigation.goBack(null);
            // eslint-disable-next-line
            requestAnimationFrame(() => {
              navigation.goBack(null);
            });
            // Reset selected bank account
            setSelectedBankAccount({});
          }}
          headerText={getTranslations('transfert.debit.step3.header')}
          paymentMeans={paymentMeans}
        />
      );
  }
};

StepDebit.propTypes = {
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
  saveBankAccount: func.isRequired,
  goToNextStep: func.isRequired,
  paymentMeans: shape({
    bankId: string,
    parent: shape({
      bank: array.isRequired,
    }),
  }).isRequired,
  piggyBank: shape({
    walletId: string.isRequired,
  }).isRequired,
  transfertStart: func.isRequired,
  setSelectedBankAccount: func.isRequired,
  setError: func.isRequired,
};

export default StepDebit;
