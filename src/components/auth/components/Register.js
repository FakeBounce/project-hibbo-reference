import React, { PureComponent } from 'react';
import { Animated } from 'react-native';
import {
  shape,
  instanceOf,
  func,
  string,
  arrayOf,
  number,
  bool,
} from 'prop-types';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import appStyles from 'styles/appStyles';
import { bind } from 'decko';
import { AContainerBasic } from 'styledComponents/containers';
import { pwdSecurityLevel } from 'utils/regex';
import Input from './Input';
import ProgressBar from './ProgressBar';
import Submit from './Submit';
import Back from './Back';
import FormErrors from './FormErrors';
import SecurityToast from './SecurityToast';
import PasswordRule from './PasswordRule';
import { SWrapperLogin, SBorderRegister } from '../styles';

class Register extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      hasSecurityToast: false,
      hidePassword: true,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { hasSecurityToast } = this.state;

    if (nextProps.form.form.password !== this.props.form.form.password) {
      if (nextProps.form.form.password.length < 8 && hasSecurityToast) {
        this.setState(state => ({
          ...state,
          hasSecurityToast: false,
        }));
      }

      Animated.delay(500).start(() => {
        if (nextProps.form.form.password.length > 7 && !hasSecurityToast) {
          this.setState(state => ({
            ...state,
            hasSecurityToast: true,
          }));
        }
      });
    }

    if (this.props.goToTerms !== nextProps.goToTerms && nextProps.goToTerms) {
      this.props.navigateToTerms();
    }
  }

  @bind
  getSecurityColor(password) {
    switch (password) {
      case 'strong':
        return appStyles.colors.greenStrong;
      case 'medium':
        return appStyles.colors.orangeNotStrong;
      case 'weak':
        return appStyles.colors.red;
      default:
        return appStyles.colors.black;
    }
  }

  @bind
  showPassword() {
    this.setState(state => ({
      ...state,
      hidePassword: !state.hidePassword,
    }));
  }

  render() {
    const {
      styling,
      errorApi,
      form: { label, form },
      step,
      error,
      progress,
      handleInputPosition,
      back,
      validate,
      editPhone,
      onChange,
      inputPosition,
      errorMsg,
      authProvider,
      logginIn,
      inputTextSize,
    } = this.props;

    const { hasSecurityToast, hidePassword } = this.state;

    return (
      <AContainerBasic style={styling}>
        <Back title="register" goBack={back} />

        <FormErrors
          error={error}
          errorMsg={errorMsg}
          inputPosition={inputPosition}
          errorApi={errorApi}
        />
        {hasSecurityToast && (
          <SecurityToast
            password={form.password}
            inputPosition={inputPosition}
          />
        )}

        <SWrapperLogin
          onLayout={({ nativeEvent: { layout: { x, y } } }) => {
            handleInputPosition({ x, y });
          }}
        >
          <Input
            title="register"
            form={form}
            error={error}
            label={authProvider === '' ? label[step][0] : label[3][0]}
            name={authProvider === '' ? label[step][1] : label[3][1]}
            onChange={onChange}
            validate={authProvider === '' ? validate : editPhone}
            inputTextSize={inputTextSize}
            hide={hidePassword}
          />
          {authProvider === '' ? (
            <ProgressBar
              color={this.getSecurityColor(pwdSecurityLevel(form.password))}
              styling={progress}
            />
          ) : (
            <SBorderRegister />
          )}
        </SWrapperLogin>

        <Submit
          title="register"
          validate={authProvider === '' ? validate : editPhone}
          logginIn={logginIn}
        />

        {step === 4 && (
          <PasswordRule
            showPassword={this.showPassword}
            isPaswordHidden={hidePassword}
          />
        )}

        <KeyboardSpacer />
      </AContainerBasic>
    );
  }
}

Register.propTypes = {
  logginIn: bool.isRequired,
  styling: shape({
    opacity: instanceOf(Animated.Value).isRequired,
  }).isRequired,
  errorApi: string.isRequired,
  form: shape({
    form: shape({
      email: string.isRequired,
      firstname: string.isRequired,
      lastname: string.isRequired,
      password: string.isRequired,
      language: string.isRequired,
    }).isRequired,
    label: arrayOf(arrayOf(string.isRequired)).isRequired,
  }).isRequired,
  step: number.isRequired,
  error: bool.isRequired,
  progress: shape({
    width: instanceOf(Animated.Value).isRequired,
  }).isRequired,
  handleInputPosition: func.isRequired,
  back: func.isRequired,
  validate: func.isRequired,
  onChange: func.isRequired,
  inputPosition: shape({
    x: number.isRequired,
    y: number.isRequired,
  }).isRequired,
  errorMsg: string.isRequired,
  authProvider: string.isRequired,
  editPhone: func.isRequired,
  inputTextSize: number.isRequired,
  goToTerms: bool.isRequired,
  navigateToTerms: func.isRequired,
};

export default Register;
