import React, { PureComponent } from 'react';
import { Animated } from 'react-native';
import { string, func, shape, instanceOf } from 'prop-types';
import EStyleSheet from 'react-native-extended-stylesheet';
import { bind } from 'decko';

import { getTranslations } from 'utils/i18n';

import { StyledContainerBasic } from 'styledComponents/containers';

import fb from 'assets/auth/icons/fb.png';
import google from 'assets/auth/icons/google.png';
import mail from 'assets/auth/icons/mail.png';

import AuthProviderErrors from './AuthProviderErrors';
import ProviderLinks from './ProviderLinks';

import * as Styles from '../styles';

const styles = EStyleSheet.create({
  fbText: {
    color: '$colors.fb',
    fontSize: '$textSizes.small',
    fontFamily: '$fonts.circularBook',
  },
  fb: {
    width: 9,
    height: 17,
    marginRight: 15,
  },
  googleText: {
    color: '$colors.google',
    fontSize: '$textSizes.small',
    fontFamily: '$fonts.circularBook',
  },
  google: {
    width: 19,
    height: 19,
    marginRight: 15,
  },
  mailText: {
    color: '$colors.green',
    fontSize: '$textSizes.small',
    fontFamily: '$fonts.circularBook',
  },
  mail: {
    width: 21,
    height: 15,
    marginRight: 15,
  },
});

class SelectAuthProvider extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      fbPosition: {
        x: 0,
        y: 0,
      },
      googlePosition: {
        x: 0,
        y: 0,
      },
    };
  }

  @bind
  handlePosition(name, position) {
    this.setState(state => {
      return {
        ...state,
        [name]: position,
      };
    });
  }

  render() {
    const {
      authType,
      goToNextStep,
      registerWithGoogle,
      loginWithGoogle,
      registerWithFb,
      loginWithFb,
      styling,
      fbError,
      googleError,
      selectAuthProvider,
      ...rest
    } = this.props;
    const { fbPosition, googlePosition } = this.state;

    return (
      <Styles.AContainerAuthProv style={styling}>
        <AuthProviderErrors
          googleError={googleError}
          googlePosition={googlePosition}
          fbError={fbError}
          fbPosition={fbPosition}
        />

        <StyledContainerBasic>
          <ProviderLinks
            name="facebook"
            label={getTranslations('auth.provider.fb')}
            labelStyle={styles.fbText}
            imageSource={fb}
            imageStyle={styles.fb}
            elementPosition="fbPosition"
            handlePosition={this.handlePosition}
            onPress={() => {
              selectAuthProvider('facebook');
              if (authType === 'register') {
                registerWithFb();
              } else {
                loginWithFb();
              }
            }}
            bordered
            {...rest}
          />

          <ProviderLinks
            name="google"
            label={getTranslations('auth.provider.google')}
            labelStyle={styles.googleText}
            imageSource={google}
            imageStyle={styles.google}
            elementPosition="googlePosition"
            handlePosition={this.handlePosition}
            onPress={() => {
              selectAuthProvider('google');
              if (authType === 'register') {
                registerWithGoogle();
              } else {
                loginWithGoogle();
              }
            }}
            bordered
            {...rest}
          />

          <ProviderLinks
            name="email"
            label={getTranslations('auth.provider.mail')}
            labelStyle={styles.mailText}
            imageSource={mail}
            imageStyle={styles.mail}
            onPress={() => {
              goToNextStep(2);
            }}
            bordered={false}
            {...rest}
          />
        </StyledContainerBasic>
      </Styles.AContainerAuthProv>
    );
  }
}

SelectAuthProvider.propTypes = {
  authType: string.isRequired,
  goToNextStep: func.isRequired,
  registerWithGoogle: func.isRequired,
  loginWithGoogle: func.isRequired,
  registerWithFb: func.isRequired,
  loginWithFb: func.isRequired,
  fbError: string.isRequired,
  googleError: string.isRequired,
  styling: shape({
    height: instanceOf(Animated.Value).isRequired,
    opacity: instanceOf(Animated.Value).isRequired,
  }).isRequired,
  selectAuthProvider: func.isRequired,
};

export default SelectAuthProvider;
