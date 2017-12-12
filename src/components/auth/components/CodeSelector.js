import React, { PureComponent } from 'react';
import { Animated } from 'react-native';
import { shape, func, string } from 'prop-types';
import EStyleSheet from 'react-native-extended-stylesheet';
import { connect } from 'react-redux';
import { bind } from 'decko';
import { NavigationActions } from 'react-navigation';

import { getTranslations } from 'utils/i18n';

import { editUserProfile } from 'actions/profileActions';

import appStyles from 'styles/appStyles';

import Header from 'shared/Header';
import SecurityCode from 'shared/SecurityCode';

import { StyledContainerBlack } from 'styledComponents/containers';
import * as Styles from '../styles';

const styles = EStyleSheet.create({
  textStyle: {
    marginTop: 0,
  },
});

class CodeSelector extends PureComponent {
  state = {
    step: 0,
    amount: '',
    error: false,
    pin: [],
    firstPin: [],
    secondPin: [],
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.parentProfile.securityCode !== '0') {
      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'Pairing' })],
      });

      this.props.navigation.dispatch(resetAction);
    }
  }

  setPin(step, pin) {
    this.setState(state => {
      return {
        ...state,
        [step]: pin,
      };
    });
  }

  @bind
  navigate(step = 0) {
    this.setState(state => {
      return {
        ...state,
        step,
        pin: [],
        amount: '',
        error: false,
      };
    });
  }

  @bind
  enterPin(value) {
    const pin = value.split('');

    this.setState(state => {
      return {
        ...state,
        pin,
        amount: value,
        error: false,
      };
    });

    if (this.state.step === 0) {
      if (pin.length === 4) {
        this.setState(
          state => {
            return {
              ...state,
              firstPin: pin,
            };
          },
          () => {
            Animated.delay(1000).start(() => {
              this.navigate(1);
            });
          },
        );
      } else {
        this.setPin('firstPin', pin);
      }
    } else if (pin.length === 4) {
      this.setState(
        state => {
          return {
            ...state,
            secondPin: pin,
          };
        },
        () => {
          if (this.state.firstPin.join('') === this.state.secondPin.join('')) {
            this.props.editUserProfile({
              securityCode: this.state.amount,
            });
          } else {
            this.setState(state => {
              return {
                ...state,
                error: true,
              };
            });
          }
        },
      );
    } else {
      this.setPin('secondPin', pin);
    }
  }

  render() {
    const { step, pin, amount, error } = this.state;

    return (
      <StyledContainerBlack>
        <Styles.StyledWrapper style={appStyles.cardStyle}>
          <Styles.StyledHeader>
            <Header
              navigation={this.props.navigation}
              text={
                step === 0
                  ? getTranslations('code.header.step0')
                  : getTranslations('code.header.step1')
              }
              backAction={this.navigate}
              showBack={step !== 0}
            />
          </Styles.StyledHeader>
          <Styles.StyledCode>
            <SecurityCode
              isSetup
              isDebit
              text={
                step === 0
                  ? getTranslations('code.label.step0')
                  : getTranslations('code.label.step1')
              }
              navigation={this.props.navigation}
              textStyle={styles.textStyle}
              setupAction={this.enterPin}
              pin={pin}
              amount={amount}
              error={error}
            />
          </Styles.StyledCode>
        </Styles.StyledWrapper>
      </StyledContainerBlack>
    );
  }
}

const mapStateToProps = state => {
  return {
    parentProfile: state.profile.parent,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    editUserProfile: data => {
      dispatch(editUserProfile(data));
    },
  };
};

CodeSelector.propTypes = {
  navigation: shape({
    dispatch: func.isRequired,
    goBack: func.isRequired,
    navigate: func.isRequired,
    setParams: func.isRequired,
    state: shape({
      key: string.isRequired,
      routeName: string.isRequired,
    }).isRequired,
  }).isRequired,
  editUserProfile: func.isRequired,
  parentProfile: shape({
    securityCode: string,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(CodeSelector);
