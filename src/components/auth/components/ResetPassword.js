import React, { PureComponent } from 'react';
import { Animated, View, Keyboard } from 'react-native';
import {
  shape,
  instanceOf,
  func,
  string,
  arrayOf,
  number,
  bool,
} from 'prop-types';
import { bind } from 'decko';
import {
  AContainerBasic,
  StyledContainerBasic,
} from 'styledComponents/containers';

import KeyboardSpacer from 'react-native-keyboard-spacer';
import Back from './Back';
import FormErrors from './FormErrors';
import RenderStep from './Reset/RenderStep';
import RenderStepHOC from './Reset/RenderStepHOC';

const RenderStepHOCExtended = RenderStepHOC(RenderStep);

class ResetPassword extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      pin: [],
      token: '',
      isLoading: false,
      hidePassword: true,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.errorApi !== this.props.errorApi ||
      nextProps.errorMsg !== this.props.errorMsg
    ) {
      if (
        (nextProps.errorApi.length > 0 || nextProps.errorMsg.length > 0) &&
        this.state.isLoading
      ) {
        this.setState({ isLoading: false });
        Keyboard.dismiss();
      }
    } else if (nextProps.step !== this.props.step && this.state.isLoading) {
      this.setState({ isLoading: false });
    }
  }

  @bind
  enterPin(value) {
    const pin = value.split('');
    this.props.onChange('token', value);
    this.setState(
      state => {
        return {
          ...state,
          pin,
          token: value,
        };
      },
      () => {
        if (this.state.token.length === 4) {
          // For reset the code if back
          Animated.delay(1000).start(() => {
            this.props.validate();
          });
        }
      },
    );
  }

  @bind
  submitForm(value) {
    this.setState(
      state => ({
        ...state,
        isLoading: !state.isLoading,
      }),
      () => {
        this.props.validate(value);
      },
    );
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
      errorApi,
      error,
      handleInputPosition,
      back,
      inputPosition,
      errorMsg,
      styling,
    } = this.props;

    return (
      <AContainerBasic style={styling}>
        <Back goBack={() => back('resetPwd')} />
        <StyledContainerBasic>
          <FormErrors
            error={error}
            errorMsg={errorMsg}
            inputPosition={inputPosition}
            errorApi={errorApi}
          />

          <View
            onLayout={({ nativeEvent: { layout: { x, y } } }) => {
              handleInputPosition({ x, y });
            }}
          >
            <RenderStepHOCExtended
              {...this.props}
              {...this.state}
              enterPin={this.enterPin}
              showPassword={this.showPassword}
              submitForm={this.submitForm}
              error={error}
            />
          </View>
        </StyledContainerBasic>
        <KeyboardSpacer />
      </AContainerBasic>
    );
  }
}

ResetPassword.propTypes = {
  styling: shape({
    opacity: instanceOf(Animated.Value).isRequired,
  }).isRequired,
  step: number.isRequired,
  errorApi: string.isRequired,
  form: shape({
    form: shape({
      email: string.isRequired,
    }).isRequired,
    label: arrayOf(arrayOf(string.isRequired)).isRequired,
  }).isRequired,
  error: bool.isRequired,
  handleInputPosition: func.isRequired,
  back: func.isRequired,
  validate: func.isRequired,
  onChange: func.isRequired,
  inputPosition: shape({
    x: number.isRequired,
    y: number.isRequired,
  }).isRequired,
  errorMsg: string.isRequired,
  inputTextSize: number.isRequired,
  inputTextSizePassword: number.isRequired,
};

export default ResetPassword;
