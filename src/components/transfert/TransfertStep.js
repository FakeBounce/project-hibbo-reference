import React, { Component } from 'react';
import { string, number, shape, func, array } from 'prop-types';
import { connect } from 'react-redux';
import { bind } from 'decko';
import shallowEqual from 'shallowequal';

import {
  setCardId,
  setSelectedBankAccount,
  saveBankAccount,
} from 'actions/paymentMeansActions';
import { transfertStart } from 'actions/transfertActions';
import { setError } from 'actions/notificationsActions';

import StepDebit from './components/debit/StepDebit';
import StepPay from './components/pay/StepPay';

class TransfertStep extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (
      shallowEqual(this.state, nextState) &&
      shallowEqual(this.props, nextProps)
    ) {
      return false;
    }

    return true;
  }

  @bind
  goToNextStep() {
    const { navigation } = this.props;
    const { step, ...params } = navigation.state.params;

    navigation.navigate('TransfertStep', { ...params, step: step + 1 });
  }

  render() {
    const {
      navigation,
      profileParent,
      paymentMeans,
      profileChild,
      piggyBank,
    } = this.props;
    const { selectedTab, amount, step } = navigation.state.params;

    if (selectedTab === 1) {
      return (
        <StepDebit
          amount={amount}
          navigation={navigation}
          profileParent={profileParent}
          step={step}
          goToNextStep={this.goToNextStep}
          paymentMeans={paymentMeans}
          setSelectedBankAccount={this.props.setSelectedBankAccount}
          transfertStart={this.props.transfertStart}
          setError={this.props.setError}
          piggyBank={piggyBank}
          saveBankAccount={this.props.saveBankAccount}
          profileChild={profileChild}
        />
      );
    }
    return (
      <StepPay
        amount={amount}
        navigation={navigation}
        profileParent={profileParent}
        profileChild={profileChild}
        step={step}
        goToNextStep={this.goToNextStep}
        paymentMeans={paymentMeans}
        setCardId={this.props.setCardId}
        transfertStart={this.props.transfertStart}
        setError={this.props.setError}
        piggyBank={piggyBank}
      />
    );
  }
}

TransfertStep.propTypes = {
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
  paymentMeans: shape({
    cardId: string.isRequired,
    parent: shape({
      card: array.isRequired,
    }),
  }).isRequired,
  profileParent: shape({}).isRequired,
  profileChild: shape({}).isRequired,
  piggyBank: shape({
    walletId: string,
  }).isRequired,
  setCardId: func.isRequired,
  setSelectedBankAccount: func.isRequired,
  transfertStart: func.isRequired,
  saveBankAccount: func.isRequired,
  setError: func.isRequired,
};

const mapStateToProps = state => {
  return {
    profileParent: state.profile.parent,
    profileChild: state.profile.child,
    paymentMeans: state.paymentMeans,
    piggyBank: state.piggyBank.currentPiggy,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setError: errorMsg => {
      dispatch(setError(errorMsg));
    },
    setCardId: cardId => {
      dispatch(setCardId(cardId));
    },
    setSelectedBankAccount: bankAccount => {
      dispatch(setSelectedBankAccount(bankAccount));
    },
    transfertStart: (transfertData, actionType) => {
      dispatch(transfertStart(transfertData, actionType));
    },
    saveBankAccount: bankData => {
      dispatch(saveBankAccount(bankData));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TransfertStep);
