import React, { PureComponent } from 'react';
import { StyleSheet, Animated, Linking } from 'react-native';
import { instanceOf, shape, func, string } from 'prop-types';
import { bind } from 'decko';
import KeyboardSpacer from 'react-native-keyboard-spacer';

import { StyledContainerBasic } from 'styledComponents/containers';
import { StyledTextSmall } from 'styledComponents/texts';

import { getTranslations } from 'utils/i18n';
import isValidDate from 'utils/dateValidation';

import { YellowRoundedButton } from 'shared/Button';
import Toast from 'shared/Toast';
import Header from 'shared/Header';
import Form from './Form';
import TermsLink from './TermsLink';

import * as Styles from '../../styles';

const styles = StyleSheet.create({
  button: {
    width: 150,
  },
});

class TermsOfServices extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      labels: [
        [getTranslations('auth.label.country'), 'country'],
        [getTranslations('auth.label.address'), 'address'],
        [getTranslations('auth.label.postalcode'), 'postalCode'],
        [getTranslations('auth.label.city'), 'city'],
        [getTranslations('auth.label.region'), 'region'],
        [getTranslations('auth.label.state'), 'region'],
        [getTranslations('auth.label.birthday'), 'birthday'],
        [getTranslations('auth.label.ssn'), 'ssn'],
      ],
      homeAddress: {
        country: '',
        address: '',
        postalCode: '',
        city: '',
        region: '',
      },
      ssn: '',
      birthday: '',
      error: false,
      errorLabel: '',
      servicePolicy: false,
      privacyPolicy: false,
      isLoading: false,
    };

    this.scrollView = null;
    this.innerRefs = {
      country: null,
      address: null,
      postalCode: null,
      city: null,
      region: null,
      birthday: null,
      ssn: null,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.profileError !== nextProps.profileError &&
      nextProps.profileError !== ''
    ) {
      this.setError(nextProps.profileError);
    }
  }

  @bind
  onChange(name, text) {
    let newValues = null;

    if (name === 'birthday') {
      newValues = { [name]: this.handleBirthdayInput(this.state[name], text) };
    } else if (name === 'ssn') {
      newValues = { [name]: text };
    } else {
      newValues = {
        homeAddress: {
          ...this.state.homeAddress,
          [name]: text,
        },
      };
    }

    this.setState(state => {
      return {
        ...state,
        ...newValues,
        error: false,
        errorLabel: '',
        isLoading: false,
      };
    });
  }

  @bind
  onSubmit(name) {
    if (this.state.homeAddress[name] !== '') {
      switch (name) {
        case 'country':
          this.scrollView._component.scrollTo({ y: 100 });
          break;
        case 'address':
          this.scrollView._component.scrollTo({ y: 165 });
          break;
        case 'city':
          this.scrollView._component.scrollTo({ y: 295 });
          break;
        case 'region':
          this.scrollView._component.scrollTo({ y: 360 });
          break;
        default:
          break;
      }
    } else {
      this.setError();
    }
  }

  setError(errorLabel = '') {
    this.setState(state => {
      return {
        ...state,
        error: true,
        errorLabel,
        isLoading: false,
      };
    });
  }

  setLoadingState(cb) {
    this.setState(
      state => {
        return {
          ...state,
          isLoading: true,
        };
      },
      () => {
        cb();
      },
    );
  }

  handleBirthdayInput(currentValue, nextValue) {
    if (nextValue.length === 2 && currentValue.length < nextValue.length) {
      return `${nextValue}/`;
    } else if (
      nextValue.length === 5 &&
      currentValue.length < nextValue.length
    ) {
      return `${nextValue.slice(0, 2)}/${nextValue.slice(3, 5)}/`;
    } else if (
      currentValue.length === 2 &&
      currentValue.length < nextValue.length
    ) {
      return `${currentValue}/${nextValue.slice(2, 3)}`;
    } else if (
      currentValue.length === 5 &&
      currentValue.length < nextValue.length
    ) {
      return `${currentValue.slice(0, 2)}/${currentValue.slice(
        3,
        5,
      )}/${nextValue.slice(5, 6)}`;
    }

    return nextValue;
  }

  @bind
  validateForm() {
    const {
      homeAddress: { country, address, postalCode, city, region },
      birthday,
      ssn,
      servicePolicy,
      privacyPolicy,
    } = this.state;

    if (
      country === '' ||
      address === '' ||
      postalCode === '' ||
      city === '' ||
      region === '' ||
      (country.toUpperCase() === 'US' && ssn === '')
    ) {
      this.setError();
    } else if (birthday.length <= 9) {
      this.setError(getTranslations('auth.terms.invalidDate'));
    } else if (
      birthday.length === 10 &&
      (!isValidDate(
        birthday.slice(0, 2),
        birthday.slice(3, 5),
        birthday.slice(6, 10),
        true,
      ) ||
        parseInt(birthday.slice(6, 10), 10) < 1900)
    ) {
      this.setError(getTranslations('auth.terms.invalidDate'));
    } else if (!servicePolicy || !privacyPolicy) {
      this.setError(getTranslations('auth.terms.validateTerms'));
    } else {
      const registerData = Object.assign({}, this.props.partialRegister);
      const bdate = new Date(
        birthday.slice(6, 10),
        birthday.slice(3, 5) - 1,
        birthday.slice(0, 2),
      );
      const homeAddress = {
        line1: address,
        city: city.toUpperCase(),
        region: region.toUpperCase(),
        postalCode,
        // @todo: Put correct country
        country: 'FR',
      };

      if (
        this.props.parentProfile &&
        this.props.parentProfile.nickname &&
        this.props.parentProfile.nickname !== ''
      ) {
        this.setLoadingState(() => {
          this.props.editUserProfile({
            homeAddress,
            bdate,
            tosAcceptance: true,
          });
        });
      } else {
        registerData.homeAddress = homeAddress;
        registerData.bdate = bdate;
        registerData.tosAcceptance = true;

        if (country === 'US') {
          registerData.ssnLast4 = ssn;
        }

        this.setLoadingState(() => {
          this.props.startRegister(registerData);
        });
      }
    }
  }

  @bind
  togglePolicies(name) {
    this.setState(state => {
      return {
        ...state,
        [name]: !state[name],
        error: false,
        errorLabel: '',
        isLoading: false,
      };
    });
  }

  render() {
    const {
      homeAddress,
      labels,
      error,
      birthday,
      ssn,
      errorLabel,
      isLoading,
    } = this.state;
    const { navigation: { navigate }, opacity, navigateToTerms } = this.props;

    return (
      <StyledContainerBasic>
        <Header
          text={getTranslations('terms.title')}
          backAction={() => {
            navigateToTerms('back');
          }}
          isFullscreen
        />

        <Styles.STitleContainer
          style={{ opacity }}
          innerRef={element => {
            this.scrollView = element;
          }}
        >
          <Styles.SIntroTerms>
            <StyledTextSmall>{getTranslations('terms.intro')}</StyledTextSmall>
          </Styles.SIntroTerms>
          <Form
            homeAddress={homeAddress}
            birthday={birthday}
            ssn={ssn}
            labels={labels}
            error={error}
            onChange={this.onChange}
            onSubmit={this.onSubmit}
            innerRefs={this.innerRefs}
          />

          {errorLabel !== '' && (
            <Styles.STermsError>
              <Toast label={errorLabel} position="top" />
            </Styles.STermsError>
          )}
          <Styles.STermsWrapper>
            <TermsLink
              name="servicePolicy"
              label={getTranslations('auth.terms.service')}
              action={() => {
                Linking.openURL(getTranslations('auth.terms.link'));
              }}
              checkboxPressed={this.togglePolicies}
            />
            <TermsLink
              name="privacyPolicy"
              label={getTranslations('auth.terms.privacy')}
              action={() => {
                navigate('PrivacyPolicies');
              }}
              checkboxPressed={this.togglePolicies}
            />
          </Styles.STermsWrapper>
          <Styles.STermsButton>
            <YellowRoundedButton
              text={getTranslations('pairing.step4.button')}
              action={this.validateForm}
              styleButton={styles.button}
              disabled={isLoading}
            />
          </Styles.STermsButton>
          <KeyboardSpacer />
        </Styles.STitleContainer>
      </StyledContainerBasic>
    );
  }
}

TermsOfServices.propTypes = {
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
  opacity: instanceOf(Animated.Value).isRequired,
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
  parentProfile: shape({
    nickname: string,
  }).isRequired,
  editUserProfile: func.isRequired,
  profileError: string.isRequired,
  navigateToTerms: func.isRequired,
};

export default TermsOfServices;
