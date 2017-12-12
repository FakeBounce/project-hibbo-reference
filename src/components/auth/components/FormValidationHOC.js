import React, { PureComponent } from 'react';
import { Animated, Dimensions } from 'react-native';
import { func, string, oneOfType, bool } from 'prop-types';
import { bind } from 'decko';
import { connect } from 'react-redux';
import { getTranslations } from 'utils/i18n';
import { validateEmail, validatePhone } from 'utils/regex';
import { apiKey } from 'utils/api';

import appStyles from 'styles/appStyles';

import {
  loginStart,
  resetAllErrors,
  resetPwdStart,
  resetCodeStart,
  changePwdStart,
} from 'actions/authActions';
import { checkUserExist, clearUserExist } from 'actions/appActions';
import { editUserProfile } from 'actions/profileActions';
import { savePartialRegister } from 'actions/userActions';

const { width } = Dimensions.get('window');
const barWidth = width - 60;
const barStepWidth = barWidth / 5;

const validateNewPassword = (form, isFromReset, error) => {
  if (form.password.length < 6) {
    error('toast.notcorrectpasswordsize');
    return false;
  }
  if (isFromReset && form.password !== form.confirmpassword) {
    error('toast.notsamepassword');
    return false;
  }
  return true;
};

const FormValidationHandler = (
  Target,
  animatedToPreviousStep,
  changeAuthType,
  formInit,
) => {
  class FormValidationHOC extends PureComponent {
    state = {
      step: 0,
      formInit,
      error: false,
      errorMsg: '',
      inputTextSize: appStyles.textSizes.big,
      inputTextSizePassword: appStyles.textSizes.big,
      inputPosition: {
        x: 0,
        y: 0,
      },
      progress: {
        width: new Animated.Value(barWidth / 4),
      },
      goToTerms: false,
    };

    componentWillReceiveProps(nextProps) {
      if (
        nextProps.errorApi !== this.props.errorApi &&
        nextProps.errorApi === getTranslations('error.account.reset.max.try')
      ) {
        this.setState(
          state => ({
            ...state,
            step: 0,
          }),
          () => {
            changeAuthType('login');
          },
        );
      }

      if (nextProps.resetPwd !== this.props.resetPwd) {
        if (
          nextProps.resetPwd === 'mailCorrect' ||
          nextProps.resetPwd === 'codeCorrect'
        ) {
          this.goToNextStep();
        }

        if (nextProps.resetPwd === 'editUserDone') {
          const { email, password } = this.state.formInit.form;
          this.props.startLogin({
            email,
            password,
          });
        }
      }

      if (
        this.props.userExist !== nextProps.userExist &&
        nextProps.userExist !== ''
      ) {
        this.props.clearUserExist();
        if (nextProps.userExist) {
          return this.toggleError(
            true,
            getTranslations('error.account.alreadyexists'),
          );
        }
        this.goToNextStep('register');
        this.props.resetAllErrors();
      }

      return null;
    }

    @bind
    onChange(name, text) {
      const inputWidth = width - 2 * 30;
      const letterWidth = 20;
      const textLength = text.length;
      const contentWidth = letterWidth * textLength;
      let size = appStyles.textSizes.big;

      if (contentWidth < inputWidth) {
        size = appStyles.textSizes.big;
      } else if (contentWidth < inputWidth + 80) {
        size = 33;
      } else {
        size = 30;
      }

      if (name === 'password') {
        this.setState(state => {
          return {
            ...state,
            error: false,
            errorMsg: '',
            inputTextSizePassword: size,
            formInit: {
              ...state.formInit,
              form: {
                ...state.formInit.form,
                [name]: text,
              },
            },
          };
        });
      } else {
        this.setState(state => {
          return {
            ...state,
            error: false,
            errorMsg: '',
            inputTextSize: size,
            formInit: {
              ...state.formInit,
              form: {
                ...state.formInit.form,
                [name]: text,
              },
            },
          };
        });
      }
    }

    animateProgress(step) {
      Animated.timing(this.state.progress.width, {
        toValue: barStepWidth * (step + 1),
        duration: 300,
      }).start();
    }

    goToNextStep(authType) {
      this.setState(
        state => {
          return {
            ...state,
            step: state.step + 1,
          };
        },
        () => {
          if (authType === 'register') {
            this.animateProgress(this.state.step);
          }
        },
      );
    }

    toggleError(error, errorMsg = '') {
      this.setState(state => {
        return {
          ...state,
          error,
          errorMsg,
        };
      });
    }

    @bind
    handleInputPosition(inputPosition) {
      this.setState(state => {
        return {
          ...state,
          inputPosition,
        };
      });
    }

    @bind
    back(authType) {
      const { step } = this.state;

      this.props.resetAllErrors();
      if (authType === 'resetPwd' && step === 2) {
        this.setState(state => {
          return {
            ...state,
            step: 0,
          };
        });
      } else if (authType === 'resetPwd' && step === 0) {
        changeAuthType('login');
      } else if (step === 0) {
        animatedToPreviousStep();
      } else if (step === 4) {
        this.setState(
          state => {
            return {
              ...state,
              formInit: {
                ...state.formInit,
                form: {
                  ...state.formInit.form,
                  password: '',
                },
              },
              step: state.step - 1,
            };
          },
          () => {
            if (authType === 'register') {
              this.animateProgress(this.state.step);
            }
          },
        );
      } else {
        this.setState(
          state => {
            return {
              ...state,
              step: state.step - 1,
            };
          },
          () => {
            if (authType === 'register') {
              this.animateProgress(this.state.step);
            }
          },
        );
      }
    }

    @bind
    validate(authType) {
      const { form } = this.state.formInit;
      const { step } = this.state;
      const { phone, ...loginForm } = form;
      switch (step) {
        case 0:
          if (validateEmail(form.email)) {
            if (authType === 'register') {
              this.props.checkUserExist(
                `accounts/${apiKey}/checkExists/${form.email}`,
              );
            } else if (authType === 'login') {
              this.goToNextStep();
            } else {
              this.props.resetPwdStart(form);
            }
          } else {
            this.toggleError(true, getTranslations('toast.email'));
          }
          break;
        case 1:
          if (form.lastname !== '') {
            if (authType === 'register') {
              this.goToNextStep('register');
            } else if (authType === 'login') {
              this.props.startLogin(loginForm);
            } else {
              this.props.resetCodeStart(form);
            }
          } else {
            this.toggleError(true, getTranslations('toast.empty'));
          }
          break;
        case 2:
          if (authType === 'resetPwd') {
            if (
              validateNewPassword(form, true, value =>
                this.toggleError(true, getTranslations(value)),
              )
            )
              this.props.changePwdStart(form);
          } else if (form.firstname !== '') {
            this.goToNextStep('register');
          } else {
            this.toggleError(true, getTranslations('toast.empty'));
          }
          break;
        case 3:
          if (validatePhone(form.phone)) {
            this.goToNextStep('register');
          } else {
            this.toggleError(true, getTranslations('toast.phone'));
          }
          break;
        default:
          if (
            validateNewPassword(form, false, value =>
              this.toggleError(true, getTranslations(value)),
            )
          ) {
            this.props.savePartialRegister(form);
            this.setState(state => {
              return {
                ...state,
                goToTerms: true,
              };
            });
          }
      }
      return null;
    }

    @bind
    editPhone() {
      const { form } = this.state.formInit;

      if (validatePhone(form.phone)) {
        this.props.editUserProfile({ phone: form.phone });
        this.setState(state => {
          return {
            ...state,
            goToTerms: true,
          };
        });
      } else {
        this.toggleError(true, getTranslations('toast.empty'));
      }
    }

    render() {
      const {
        step,
        error,
        errorMsg,
        progress,
        inputPosition,
        inputTextSize,
        inputTextSizePassword,
        goToTerms,
      } = this.state;

      return (
        <Target
          {...this.props}
          step={step}
          error={error}
          errorMsg={errorMsg}
          onChange={this.onChange}
          validate={this.validate}
          editPhone={this.editPhone}
          handleInputPosition={this.handleInputPosition}
          back={this.back}
          changeAuthType={changeAuthType}
          inputPosition={inputPosition}
          form={this.state.formInit}
          progress={progress}
          inputTextSizePassword={inputTextSizePassword}
          inputTextSize={inputTextSize}
          goToTerms={goToTerms}
        />
      );
    }
  }

  const mapDispatchToProps = dispatch => {
    return {
      startLogin: formData => {
        dispatch(loginStart(formData));
      },
      resetAllErrors: email => {
        dispatch(resetAllErrors(email));
      },
      editUserProfile: data => {
        dispatch(editUserProfile(data));
      },
      checkUserExist: url => {
        dispatch(checkUserExist(url));
      },
      clearUserExist: () => {
        dispatch(clearUserExist());
      },
      resetPwdStart: email => {
        dispatch(resetPwdStart(email));
      },
      resetCodeStart: data => {
        dispatch(resetCodeStart(data));
      },
      changePwdStart: data => {
        dispatch(changePwdStart(data));
      },
      savePartialRegister: formData => {
        dispatch(savePartialRegister(formData));
      },
    };
  };

  const mapStateToProps = state => {
    return {
      userExist: state.app.userExist,
      resetPwd: state.user.resetPwd,
    };
  };

  FormValidationHOC.propTypes = {
    errorApi: string.isRequired,
    resetAllErrors: func.isRequired,
    startLogin: func.isRequired,
    resetPwdStart: func.isRequired,
    resetCodeStart: func.isRequired,
    editUserProfile: func.isRequired,
    changePwdStart: func.isRequired,
    checkUserExist: func.isRequired,
    clearUserExist: func.isRequired,
    userExist: oneOfType([string, bool]).isRequired,
    resetPwd: string.isRequired,
    savePartialRegister: func.isRequired,
  };

  return connect(mapStateToProps, mapDispatchToProps)(FormValidationHOC);
};

export default FormValidationHandler;
