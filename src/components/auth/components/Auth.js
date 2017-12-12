import React, { PureComponent } from 'react';
import { Animated, Dimensions, Easing } from 'react-native';
import { func, shape, string, bool } from 'prop-types';
import { bind } from 'decko';
import { NavigationActions } from 'react-navigation';
import { getLanguage, getTranslations } from 'utils/i18n';
import shallowequal from 'shallowequal';
import {
  StyledContainerBlack,
  StyledAndroidWrapper,
} from 'styledComponents/containers';

import appStyles from 'styles/appStyles';
import Visual from './Visual';
import SelectAuthProvider from './SelectAuthProvider';
import Register from './Register';
import Login from './Login';
import ResetPassword from './ResetPassword';
import FormValidationHOC from './FormValidationHOC';
import TermsOfServices from './Terms/TermsOfServices';

import * as Styles from '../styles';

let RegisterExtanded = null;
let LoginExtanded = null;
let ResetPwdExtanded = null;

class Auth extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      authType: '',
      authProvider: '',
      isButtonDisabled: false,
      step: 0,
      controlsShown: true,
      animRunning: false,
      imageContainer: {
        translateY: new Animated.Value(0),
      },
      image: {
        transform: [
          {
            translateY: new Animated.Value(0),
          },
        ],
      },
      controls: {
        height: new Animated.Value(0),
        opacity: new Animated.Value(0),
      },
      form: {
        opacity: new Animated.Value(0),
      },
      visual: {
        opacity: new Animated.Value(1),
      },
      modalStyle: {
        opacity: new Animated.Value(0),
      },
    };

    this.editUserProfile = this.props.editUserProfile.bind(this);
    this.startRegister = this.props.startRegister.bind(this);
    this.registerWithGoogle = this.props.registerWithGoogle.bind(this);
    this.loginWithGoogle = this.props.loginWithGoogle.bind(this);
    this.registerWithFb = this.props.registerWithFb.bind(this);
    this.loginWithFb = this.props.loginWithFb.bind(this);
    this.resetAllErrors = this.props.resetAllErrors.bind(this);
  }

  componentDidMount() {
    const register = {
      label: [
        [getTranslations('auth.label.email'), 'email'],
        [getTranslations('auth.label.lastname'), 'lastname'],
        [getTranslations('auth.label.firstname'), 'firstname'],
        [getTranslations('auth.label.phone'), 'phone'],
        [getTranslations('auth.label.password'), 'password'],
      ],
      form: {
        email: '',
        firstname: '',
        lastname: '',
        phone: '',
        password: '',
        language: getLanguage(),
        homeAddress: {
          line1: '',
          city: '',
          region: '',
          postalCode: '',
          country: '',
        },
      },
    };
    const login = {
      label: [
        [getTranslations('auth.label.email'), 'email'],
        [getTranslations('auth.label.password'), 'password'],
        [getTranslations('auth.label.phone'), 'phone'],
      ],
      form: {
        email: '',
        password: '',
        phone: '',
      },
    };
    const resetPwd = {
      label: [
        [getTranslations('auth.label.email'), 'email'],
        [
          getTranslations('auth.label.newpassword'),
          'password',
          getTranslations('auth.label.confirmpassword'),
          'confirmpassword',
        ],
      ],
      form: {
        email: '',
        confirmpassword: '',
        password: '',
        token: '',
      },
    };

    RegisterExtanded = FormValidationHOC(
      Register,
      this.animatedToPreviousStep,
      this.changeAuthType,
      register,
    );
    LoginExtanded = FormValidationHOC(
      Login,
      this.animatedToPreviousStep,
      this.changeAuthType,
      login,
    );
    ResetPwdExtanded = FormValidationHOC(
      ResetPassword,
      this.animatedToPreviousStep,
      this.changeAuthType,
      resetPwd,
    );
  }

  componentWillReceiveProps(nextProps) {
    const { authProvider, authType } = this.state;

    if (
      (this.props.error !== nextProps.error && nextProps.error !== '') ||
      (this.props.fbError !== nextProps.fbError && nextProps.fbError !== '') ||
      (this.props.googleError !== nextProps.googleError &&
        nextProps.googleError !== '')
    ) {
      this.setState(
        state => {
          return {
            ...state,
            isButtonDisabled: false,
          };
        },
        () => {
          Animated.delay(4000).start(() => {
            this.props.resetAllErrors();
          });
        },
      );
    }

    if (nextProps.error || nextProps.fbError || nextProps.googleError) {
      return this.setState(state => ({
        ...state,
        authProvider: '',
      }));
    }
    if (this.props.token !== nextProps.token && nextProps.token !== '') {
      if (authType === 'register') {
        // Check if register with email or social to ask missing infos
        if (authProvider === 'google' || authProvider === 'facebook') {
          // Ask for phone
          this.animatedToNextStep(2);
        } else if (!nextProps.parentProfile.homeAddress) {
          // Go to privacies
          this.navigateToTerms();
        } else {
          this.resetNav('CodeSelector');
          // this.props.navigation.navigate('CodeSelector');
        }
      } else if (authProvider === 'google' || authProvider === 'facebook') {
        // Check if login with social to ask missing infos
        if (
          !nextProps.parentProfile.phone ||
          nextProps.parentProfile.phone === '0'
        ) {
          // Ask for phone
          this.animatedToNextStep(2);
        } else if (!nextProps.parentProfile.homeAddress) {
          // Go to privacies
          this.navigateToTerms();
        } else if (
          !nextProps.parentProfile.securityCode ||
          nextProps.parentProfile.securityCode.length < 4
        ) {
          this.resetNav('CodeSelector');
        } else if (
          Object.keys(nextProps.childProfile).length === 0 ||
          nextProps.childProfile.id === undefined
        ) {
          this.resetNav('Pairing');
        } else {
          this.resetNav('Swiper');
        }
      } else if (
        !nextProps.parentProfile.securityCode ||
        nextProps.parentProfile.securityCode.length < 4
      ) {
        this.resetNav('CodeSelector');
      } else if (
        Object.keys(nextProps.childProfile).length === 0 ||
        nextProps.childProfile.id === undefined
      ) {
        this.resetNav('Pairing');
      } else {
        this.resetNav('Swiper');
      }
    } else if (
      nextProps.token !== '' &&
      authProvider !== '' &&
      !shallowequal(nextProps.parentProfile, this.props.parentProfile) &&
      nextProps.parentProfile &&
      nextProps.parentProfile.phone === '0'
    ) {
      this.animatedToNextStep(2);
    } else if (
      nextProps.token !== '' &&
      authProvider !== '' &&
      !shallowequal(nextProps.parentProfile, this.props.parentProfile) &&
      nextProps.parentProfile &&
      !nextProps.parentProfile.homeAddress
    ) {
      // Go to privacies
      this.navigateToTerms();
    } else if (
      nextProps.token !== '' &&
      authProvider !== '' &&
      !shallowequal(nextProps.parentProfile, this.props.parentProfile) &&
      nextProps.parentProfile &&
      (!nextProps.parentProfile.securityCode ||
        nextProps.parentProfile.securityCode.length < 4)
    ) {
      this.resetNav('CodeSelector');
    }
    return null;
  }

  componentWillUnmount() {
    RegisterExtanded = null;
    LoginExtanded = null;
    ResetPwdExtanded = null;
  }

  resetNav(routeName) {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName })],
    });

    this.props.navigation.dispatch(resetAction);
  }

  @bind
  animatedToNextStep(step) {
    const {
      controls,
      visual,
      imageContainer,
      image,
      modalStyle,
      form,
    } = this.state;

    Animated.sequence([
      Animated.parallel([
        Animated.timing(controls.opacity, {
          toValue: 0,
        }),
        Animated.timing(visual.opacity, {
          toValue: 0,
        }),
      ]),
      Animated.parallel([
        Animated.timing(imageContainer.translateY, {
          toValue: step === 1 ? -225 : -Dimensions.get('window').height,
          easing: Easing.elastic(0.8),
        }),
        Animated.timing(image.transform[0].translateY, {
          toValue: 175,
          easing: Easing.elastic(0.8),
        }),
        Animated.timing(controls.height, {
          toValue: step === 1 ? 225 : Dimensions.get('window').height,
          easing: Easing.elastic(0.8),
        }),
        Animated.timing(modalStyle.opacity, {
          toValue: 0.5,
          easing: Easing.elastic(0.8),
        }),
      ]),
    ]).start(() => {
      this.setState(
        state => {
          return {
            ...state,
            step: state.step + 1,
          };
        },
        () => {
          Animated.parallel([
            Animated.timing(controls.opacity, {
              toValue: 1,
            }),
            Animated.timing(form.opacity, {
              toValue: 1,
            }),
          ]).start();
        },
      );
    });
  }

  @bind
  animatedToPreviousStep() {
    const {
      controls,
      visual,
      imageContainer,
      image,
      modalStyle,
      form,
    } = this.state;

    this.setState(
      state => {
        return {
          ...state,
          animRunning: true,
        };
      },
      () => {
        Animated.parallel([
          Animated.timing(form.opacity, {
            toValue: 0,
          }),
          Animated.timing(controls.opacity, {
            toValue: 0,
          }),
        ]).start(() => {
          this.setState(
            state => {
              return {
                ...state,
                step: state.step - 1,
              };
            },
            () => {
              const { step } = this.state;

              Animated.sequence([
                Animated.parallel([
                  Animated.timing(modalStyle.opacity, {
                    toValue: step === 1 ? 0.5 : 0,
                    easing: Easing.elastic(0.6),
                  }),
                  Animated.timing(imageContainer.translateY, {
                    toValue: step === 0 ? 0 : -225,
                    easing: Easing.elastic(0.6),
                  }),
                  Animated.timing(image.transform[0].translateY, {
                    toValue: step === 0 ? 0 : 175,
                    easing: Easing.elastic(0.6),
                  }),
                  Animated.timing(visual.opacity, {
                    toValue: 1,
                    easing: Easing.elastic(0.6),
                  }),
                  Animated.timing(controls.height, {
                    toValue: step === 0 ? 0 : 225,
                    easing: Easing.elastic(0.6),
                  }),
                ]),
                Animated.timing(controls.opacity, {
                  toValue: 1,
                }),
              ]).start(() => {
                this.setState(state => {
                  return {
                    ...state,
                    animRunning: false,
                  };
                });
              });
            },
          );
        });
      },
    );
  }

  @bind
  selectAuthType(authType) {
    if (
      this.props.error !== '' ||
      this.props.fbError !== '' ||
      this.props.googleError !== ''
    ) {
      this.props.resetAllErrors();
    }

    this.setState(
      state => {
        return {
          ...state,
          authType,
        };
      },
      () => {
        this.animatedToNextStep(1);
      },
    );
  }

  @bind
  changeAuthType(authType = 'register') {
    this.props.resetAllErrors();

    Animated.timing(this.state.form.opacity, {
      toValue: 0,
      duration: 300,
    }).start(() => {
      this.setState(
        state => {
          return {
            ...state,
            authType,
          };
        },
        () => {
          Animated.timing(this.state.form.opacity, {
            toValue: 1,
            duration: 300,
          }).start();
        },
      );
    });
  }

  @bind
  selectAuthProvider(authProvider) {
    this.setState(state => {
      return {
        ...state,
        authProvider,
        isButtonDisabled: true,
      };
    });
  }

  @bind
  navigateToTerms(direction = 'forward') {
    const { form: { opacity }, authProvider } = this.state;
    let nextStep = 0;

    if (direction === 'forward') {
      nextStep = 4;
    } else if (authProvider === 'facebook' || authProvider === 'google') {
      nextStep = 1;
    } else {
      nextStep = 2;
    }

    Animated.timing(opacity, {
      toValue: 0,
    }).start(() => {
      this.setState(
        state => {
          return {
            ...state,
            step: nextStep,
            authProvider: state.authProvider !== '' ? '' : state.authProvider,
            isButtonDisabled: false,
          };
        },
        () => {
          Animated.timing(opacity, {
            toValue: 1,
          }).start();
        },
      );
    });
  }

  renderForms() {
    const { authType, form, authProvider } = this.state;
    const { error, logginIn } = this.props;

    if (authType === 'login') {
      return (
        <LoginExtanded
          errorApi={error}
          styling={form}
          changeAuthType={this.changeAuthType}
          authProvider={authProvider}
          logginIn={logginIn}
        />
      );
    } else if (authType === 'register') {
      return (
        <RegisterExtanded
          errorApi={error}
          styling={form}
          authProvider={authProvider}
          logginIn={logginIn}
          navigateToTerms={this.navigateToTerms}
        />
      );
    }

    return (
      <ResetPwdExtanded
        errorApi={error}
        styling={form}
        changeAuthType={this.changeAuthType}
      />
    );
  }

  render() {
    const {
      fbError,
      googleError,
      navigation,
      partialRegister,
      parentProfile,
      profileError,
    } = this.props;
    const {
      authType,
      isButtonDisabled,
      authProvider,
      step,
      imageContainer,
      controls,
      visual,
      controlsShown,
      modalStyle,
      image,
      animRunning,
      form: { opacity },
    } = this.state;

    return (
      <StyledContainerBlack>
        <Styles.StyledWrapperAuth style={appStyles.cardStyle}>
          {step === 0 || step === 1 ? ( // eslint-disable-line
            <StyledAndroidWrapper>
              <Styles.AnimatedOverflow
                style={{
                  transform: [{ translateY: imageContainer.translateY }],
                }}
              >
                <Visual
                  step={step}
                  animRunning={animRunning}
                  controls={controlsShown}
                  modalStyle={modalStyle}
                  imageStyle={image}
                  styling={visual}
                  selectAuthType={this.selectAuthType}
                  animatedToPreviousStep={this.animatedToPreviousStep}
                />
              </Styles.AnimatedOverflow>
              {step === 1 && (
                <SelectAuthProvider
                  authType={authType}
                  isButtonDisabled={isButtonDisabled}
                  authProvider={authProvider}
                  styling={controls}
                  fbError={fbError}
                  googleError={googleError}
                  goToNextStep={this.animatedToNextStep}
                  registerWithGoogle={this.registerWithGoogle}
                  loginWithGoogle={this.loginWithGoogle}
                  registerWithFb={this.registerWithFb}
                  loginWithFb={this.loginWithFb}
                  selectAuthProvider={this.selectAuthProvider}
                />
              )}
            </StyledAndroidWrapper>
          ) : step !== 4 ? (
            this.renderForms()
          ) : (
            <TermsOfServices
              navigation={navigation}
              opacity={opacity}
              partialRegister={partialRegister}
              startRegister={this.startRegister}
              parentProfile={parentProfile}
              editUserProfile={this.editUserProfile}
              profileError={profileError}
              navigateToTerms={this.navigateToTerms}
            />
          )}
        </Styles.StyledWrapperAuth>
      </StyledContainerBlack>
    );
  }
}

Auth.propTypes = {
  logginIn: bool.isRequired,
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
  fbError: string.isRequired,
  googleError: string.isRequired,
  error: string.isRequired,
  token: string.isRequired,
  resetAllErrors: func.isRequired,
  registerWithGoogle: func.isRequired,
  loginWithGoogle: func.isRequired,
  registerWithFb: func.isRequired,
  loginWithFb: func.isRequired,
  parentProfile: shape({
    phone: string,
    securityCode: string,
  }).isRequired,
  childProfile: shape({
    nickname: string,
  }).isRequired,
  partialRegister: shape({
    email: string,
    firstname: string,
    lastname: string,
    phone: string,
    password: string,
    language: string,
    birthday: string,
    homeAddress: shape({
      country: string,
      address: string,
      postalCode: string,
      city: string,
      region: string,
    }),
  }).isRequired,
  startRegister: func.isRequired,
  editUserProfile: func.isRequired,
  profileError: string.isRequired,
};

export default Auth;
