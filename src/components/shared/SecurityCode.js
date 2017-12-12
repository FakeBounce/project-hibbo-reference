import React, { PureComponent } from 'react';
import {
  oneOfType,
  object,
  string,
  func,
  number,
  array,
  shape,
  arrayOf,
  bool,
} from 'prop-types';
import { Animated, Platform } from 'react-native';
import { bind } from 'decko';
import FingerprintScanner from 'react-native-fingerprint-scanner';

import { getTranslations } from 'utils/i18n';
import { StyledFullContainerCenter } from 'styledComponents/containers';
import { StyledTextSmall } from 'styledComponents/texts';
import theme from 'styles/appStyles';

import touchId from 'assets/shared/touchID.png';

import SecurityCodeContent from './components/SecurityCodeContent';
import CardSelect from '../transfert/components/pay/CardSelect';
import Error from '../auth/components/Error';
import PasswordField from './PasswordField';
import {
  StyledSecurityCodeText,
  StyledSecurityCodeWrapper,
  StyledSecurityCodeModalCustom,
  StyledSecurityCodeImage,
  StyledSecurityCodePadNumber,
} from './styles';

/* const ERRORS = {
  AuthenticationNotMatch: 'No match.',
  AuthenticationFailed: 'Authentication was not successful because the user failed to provide valid credentials.',
  UserCancel: 'Authentication was canceled by the user - e.g. the user tapped Cancel in the dialog.',
  UserFallback: 'Authentication was canceled because the user tapped the fallback button (Enter Password).',
  SystemCancel: 'Authentication was canceled by system - e.g. if another application came to foreground while the authentication dialog was up.',
  PasscodeNotSet: 'Authentication could not start because the passcode is not set on the device.',
  FingerprintScannerNotAvailable: 'Authentication could not start because Fingerprint Scanner is not available on the device.',
  FingerprintScannerNotEnrolled: 'Authentication could not start because Fingerprint Scanner has no enrolled fingers.',
  FingerprintScannerUnknownError: 'Could not authenticate for an unknown reason.',
  FingerprintScannerNotSupported: 'Device does not support Fingerprint Scanner.',
}; */

class SecurityCode extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      typedPin: [],
      amount: '',
      errorPosition: {},
      showFingerPrint: false,
      modalVisible: false,
    };

    this.setupAction = this.props.setupAction.bind(this);
  }

  componentDidMount() {
    FingerprintScanner.isSensorAvailable()
      .then(() => {
        if (!this.state.showFingerPrint) {
          this.setState(state => ({
            ...state,
            showFingerPrint: true,
          }));
        }
      })
      .catch(err => {
        console.log('FingerPrint is sensorAvailable error:', err);
        this.onDisimissFingerPrint();
      });
  }

  @bind
  onDisimissFingerPrint() {
    if (Platform.OS === 'android') {
      this.switchModalVisible(false);
    }
    if (this.state.showFingerPrint) {
      this.setState(state => ({
        ...state,
        showFingerPrint: false,
      }));
    }
  }

  @bind
  onFingerPrintClick() {
    if (Platform.OS === 'android') {
      this.switchModalVisible(true);
    }
    FingerprintScanner.authenticate(this.getFingerPrintOptions())
      .then(() => {
        if (Platform.OS === 'android') {
          this.switchModalVisible(false);
        }
        this.onSuccessAuth();
      })
      .catch(error => {
        if (error.name !== 'UserCancel') {
          this.onErrorAuth('transfert.confirm.fingerPrint.error');
        }
        this.onDisimissFingerPrint();
      });
  }

  @bind
  onSuccessAuth(pin) {
    const { amount, action, paymentMeans } = this.props;

    if (pin) {
      this.setState(state => ({
        ...state,
        typedPin: pin,
        amount: '',
      }));
    }

    if (!paymentMeans.cardId && !paymentMeans.bankAccount.id)
      return this.onErrorAuth();

    return Animated.delay(1).start(() => {
      action(amount);
      this.setState(state => ({
        ...state,
        typedPin: [],
      }));
    });
  }

  @bind
  onErrorAuth(errMsg = 'transfert.confirm.code.error') {
    const { paymentMeans, setError } = this.props;
    const errorMsg =
      !paymentMeans.cardId && !paymentMeans.bankAccount.id
        ? 'transfert.confirm.card.missing'
        : errMsg;
    setError(getTranslations(errorMsg));
  }

  @bind
  setErrorPosition(errorPosition) {
    this.setState(state => {
      return {
        ...state,
        errorPosition,
      };
    });
  }

  getFingerPrintOptions() {
    let fingerPrintOptions = {};
    if (Platform.OS === 'ios') {
      fingerPrintOptions = {
        description: getTranslations('transfert.touchId.popup'),
        fallbackEnabled: false,
      };
    } else if (Platform.OS === 'android') {
      fingerPrintOptions = {
        onAttempt: error => {
          console.log(error.message);
          this.onErrorAuth('transfert.confirm.fingerPrint.error');
          FingerprintScanner.release();
          this.onDisimissFingerPrint();
        },
      };
    } else {
      console.log('PLATFORM ERROR');
    }
    return fingerPrintOptions;
  }

  @bind
  enterPin(value) {
    const pin = value.split('');
    this.onDisimissFingerPrint();

    if (pin.length > this.props.numberInPin) {
      return null;
    }

    const { profileParent } = this.props;

    if (pin.length === this.props.numberInPin) {
      if (value === profileParent.securityCode) {
        return this.onSuccessAuth(pin);
      }
      this.onErrorAuth();
    }
    return this.setState(state => ({
      ...state,
      typedPin: pin,
      amount: value,
    }));
  }

  @bind
  switchModalVisible(visibility) {
    if (this.state.modalVisible !== visibility)
      this.setState(state => ({
        ...state,
        modalVisible: visibility,
      }));
  }

  render() {
    const {
      style,
      text,
      isDebit,
      setCardId,
      navigation,
      isSetup,
      contentStyle,
      textStyle,
      pin,
      amount,
      error,
      numberInPin,
      profileParent,
      paymentMeans,
    } = this.props;
    const {
      errorPosition,
      typedPin,
      showFingerPrint,
      modalVisible,
    } = this.state;
    const isClickable =
      isDebit ||
      isSetup ||
      (profileParent.paymentMeans &&
        profileParent.paymentMeans.card.length > 0) ||
      (paymentMeans.parent && paymentMeans.parent.card.length > 0);

    return (
      <StyledSecurityCodeWrapper isDebit={isDebit} style={style}>
        {error && (
          <Error
            posY={errorPosition.y - 95}
            posX={errorPosition.x}
            label={getTranslations('code.setup.error')}
          />
        )}
        {!isDebit && (
          <CardSelect
            paymentMeans={profileParent.paymentMeans || paymentMeans.parent}
            setCardId={setCardId}
            navigation={navigation}
            setError={this.props.setError}
            cardScanner={this.props.cardScanner}
          />
        )}
        <SecurityCodeContent
          onPress={() => this.onErrorAuth()}
          isClickable={isClickable}
          contentStyle={contentStyle}
        >
          <StyledFullContainerCenter>
            <StyledSecurityCodeText
              onLayout={({ nativeEvent: { layout: { x, y } } }) => {
                this.setErrorPosition({ x, y });
              }}
              style={textStyle}
            >
              {text}
            </StyledSecurityCodeText>
            <PasswordField
              typedPin={isSetup ? pin : typedPin}
              withFingerPrint={!isSetup && showFingerPrint}
              onFingerPrintClick={this.onFingerPrintClick}
            />
          </StyledFullContainerCenter>
          <StyledSecurityCodePadNumber
            password
            pressInput={isSetup ? this.setupAction : this.enterPin}
            amount={isSetup ? amount : this.state.amount}
            numberMax={numberInPin}
          />
        </SecurityCodeContent>

        <StyledSecurityCodeModalCustom
          style={theme.cardStyle}
          visible={modalVisible}
          switchModalVisible={() => this.switchModalVisible(!modalVisible)}
        >
          <StyledSecurityCodeImage source={touchId} />
          <StyledTextSmall>
            {getTranslations('transfert.touchId.popup')}
          </StyledTextSmall>
        </StyledSecurityCodeModalCustom>
      </StyledSecurityCodeWrapper>
    );
  }
}

SecurityCode.defaultProps = {
  paymentMeans: {},
  setCardId: () => {},
  numberInPin: 4,
  action: null,
  style: {},
  contentStyle: {},
  textStyle: {},
  isSetup: false,
  profileParent: {
    securityCode: '',
  },
  setupAction: () => {},
  pin: [''],
  error: false,
  setError: () => {},
  navigation: null,
  cardScanner: 'CardScanner',
};

SecurityCode.propTypes = {
  style: oneOfType([object, number, array]),
  action: func,
  amount: string.isRequired,
  profileParent: shape({
    securityCode: string,
  }),
  isDebit: bool.isRequired,
  text: string.isRequired,
  paymentMeans: shape({
    parent: shape({
      card: array,
    }),
    cardId: string,
  }),
  setCardId: func,
  navigation: shape({
    dispatch: func.isRequired,
    goBack: func.isRequired,
    navigate: func.isRequired,
    setParams: func.isRequired,
    state: shape({
      key: string.isRequired,
      routeName: string.isRequired,
    }).isRequired,
  }),
  isSetup: bool,
  contentStyle: oneOfType([object, number, array]),
  textStyle: oneOfType([object, number, array]),
  setupAction: func,
  pin: arrayOf(string),
  error: bool,
  numberInPin: number,
  setError: func,
  cardScanner: string,
};

export default SecurityCode;
