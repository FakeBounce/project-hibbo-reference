import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import { string, func, shape, number, arrayOf, bool } from 'prop-types';
import { StyleSheet } from 'react-native';
import { bind } from 'decko';

import TouchableRipple from 'shared/TouchableRipple';
import Toast from 'shared/Toast';

import { setError as setErrorAction } from 'actions/notificationsActions';
import { setPaymentMeanError as setPaymentMeanErrorAction } from 'actions/paymentMeansActions';

const styles = StyleSheet.create({
  error: {
    position: 'absolute',
    alignItems: 'center',
    zIndex: 10000,
    elevation: 10,
    top: 30,
    left: 40,
  },
});

class ErrorComponent extends PureComponent {
  state = {
    error: '',
  };

  componentWillReceiveProps(nextProps) {
    const { error, paymentMeansError, piggyStatus: { trap } } = nextProps;
    const { index, routes } = this.props.nav;
    if (error !== this.props.error) {
      this.setState(state => ({
        ...state,
        error,
      }));
    } else if (paymentMeansError !== this.props.paymentMeansError) {
      this.setState(state => ({
        ...state,
        error: paymentMeansError,
      }));
    } else if (
      trap !== this.props.piggyStatus.trap &&
      trap === 'opened' &&
      routes[index].routeName !== 'OpenMonimalz'
    ) {
      this.props.navigation.navigate('OpenMonimalz');
    }
  }

  @bind
  hideError() {
    const {
      error,
      paymentMeansError,
      setError,
      setPaymentMeanError,
    } = this.props;

    if (error) {
      setError('');
    } else if (paymentMeansError) {
      setPaymentMeanError('');
    }
  }

  render() {
    const { error } = this.state;

    if (error === '') return null;

    return (
      <TouchableRipple style={styles.error} onPress={this.hideError}>
        <Toast
          label={error}
          position={this.props.position}
          hideToast={this.hideError}
        />
      </TouchableRipple>
    );
  }
}

ErrorComponent.propTypes = {
  error: string.isRequired,
  paymentMeansError: string.isRequired,
  setPaymentMeanError: func.isRequired,
  setError: func.isRequired,
  position: string.isRequired,
  piggyStatus: shape({
    trap: string.isRequired,
    connected: bool.isRequired,
  }).isRequired,
  nav: shape({
    index: number.isRequired,
    routes: arrayOf(shape({})).isRequired,
  }).isRequired,
  navigation: shape({
    dispatch: func.isRequired,
    state: shape({
      index: number.isRequired,
      routes: arrayOf(
        shape({
          key: string.isRequired,
          routeName: string.isRequired,
          params: shape({}),
        }),
      ).isRequired,
    }).isRequired,
  }).isRequired,
};

const mapStateToProps = state => {
  return {
    error: state.notifications.error,
    paymentMeansError: state.paymentMeans.error,
    piggyStatus: state.app.piggy,
    nav: state.nav,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setError: errorMsg => {
      dispatch(setErrorAction(errorMsg));
    },
    setPaymentMeanError: errorMsg => {
      dispatch(setPaymentMeanErrorAction(errorMsg));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorComponent);
