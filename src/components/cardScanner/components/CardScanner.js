import React, { PureComponent } from 'react';
import { CardIOUtilities } from 'react-native-awesome-card-io';
import { NavigationActions } from 'react-navigation';
import { func, shape, string, oneOfType, number, bool } from 'prop-types';
import { bind } from 'decko';
import creditCardType from 'credit-card-type';

import { bgMonimalz } from 'styles/backgrounds';

import { getTranslations } from 'utils/i18n';

import {
  StyledContainerBasic,
  StyledBackground,
} from 'styledComponents/containers';

import { YellowRoundedButton } from 'shared/Button';
import theme from 'styles/appStyles';
import Header from 'shared/Header';
import Toast from 'shared/Toast';
import CardVisual from './CardVisual';
import Form from './Form';

import * as Styles from '../styles';

class CardScanner extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      label: [
        getTranslations('cardScanner.label.cardHolder'),
        getTranslations('cardScanner.label.cardNumber'),
        getTranslations('cardScanner.label.expiracyMonth'),
        getTranslations('cardScanner.label.expiracyYear'),
        getTranslations('cardScanner.label.crypto'),
        getTranslations('cardScanner.label.currency'),
      ],
      form: {
        name: `${props.parentProfile.firstname} ${props.parentProfile
          .lastname}`,
        currency: '',
        cardNumber: '',
        month: '',
        year: '',
        crypto: '',
        cardType: '',
      },
      error: {
        name: false,
        currency: false,
        cardNumber: false,
        month: false,
        year: false,
        crypto: false,
        cardType: false,
      },
      isInitial:
        props.navigation.state.params &&
        props.navigation.state.params.isInitial,
    };

    this.props.clearCardErrors = this.props.clearCardErrors.bind(this);
  }

  componentWillMount() {
    this.props.clearCardErrors();
  }

  componentDidMount() {
    if (
      this.props.navigation.state.params &&
      this.props.navigation.state.params.scanCard &&
      CardIOUtilities.CAN_READ_CARD_WITH_CAMERA
    ) {
      this.props.scanCard();
    }
  }

  componentWillReceiveProps(nextProps) {
    const { params } = this.props.navigation.state;
    if (this.props.cardData.cardNumber !== nextProps.cardData.cardNumber) {
      this.setState(state => {
        return {
          ...state,
          form: {
            name: nextProps.cardData.cardHolderName,
            cardNumber: nextProps.cardData.cardNumber,
            month: nextProps.cardData.expiracyMonth,
            year: nextProps.cardData.expiracyYear,
            crypto: nextProps.cardData.cvv,
            cardType: nextProps.cardData.cardType,
          },
        };
      });
    } else if (
      this.props.parentProfile.paymentMeans &&
      this.props.parentProfile.paymentMeans.card &&
      this.props.parentProfile.paymentMeans.card.length !==
        nextProps.parentProfile.paymentMeans.card.length
    ) {
      if (params && params.action) {
        params.action();
      } else {
        const resetAction = NavigationActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'Swiper' })],
        });

        this.props.navigation.dispatch(resetAction);
      }
    }

    if (this.props.error !== nextProps.error) {
      this.setState(state => {
        return {
          ...state,
          loading: false,
        };
      });
    }
  }

  @bind
  onChange(name, text) {
    this.setState(
      state => {
        return {
          ...state,
          error: {
            ...state.error,
            [name]: false,
          },
          form: {
            ...state.form,
            [name]: text,
          },
          loading: false,
        };
      },
      () => {
        if (this.props.error !== '') {
          this.props.clearCardErrors();
        }
        if (this.state.form.cardNumber.length === 4) {
          const cardType = creditCardType(this.state.form.cardNumber)[0];

          this.setState(state => {
            return {
              ...state,
              form: {
                ...state.form,
                cardType: cardType === undefined ? '' : cardType.type,
              },
            };
          });
        }
      },
    );
  }

  getBackgroundType() {
    const { type } = this.props.piggyBanks;

    switch (type) {
      case 'whale':
      case 'panda':
        return bgMonimalz[1];
      default:
        return bgMonimalz[0];
    }
  }

  toggleError(name) {
    this.setState(state => {
      return {
        ...state,
        loading: false,
        error: {
          ...state.error,
          [name]: true,
        },
      };
    });
  }

  @bind
  validate() {
    const { name, cardNumber, month, year, crypto, currency } = this.state.form;

    if (name === '') {
      this.toggleError('name');
    } else if (currency === '') {
      this.toggleError('currency');
    } else if (cardNumber.length !== 16) {
      this.toggleError('cardNumber');
    } else if (month === '' || month === 0) {
      this.toggleError('month');
    } else if (year === '' || year === 0 || year.length !== 2) {
      this.toggleError('year');
    } else if (crypto === '' || crypto === 0 || crypto.length !== 3) {
      this.toggleError('crypto');
    } else {
      this.setState(
        state => {
          return {
            ...state,
            loading: true,
          };
        },
        () => {
          if (this.props.customSave) {
            this.props.saveAction(this.state.form);
          } else {
            this.props.saveCard(this.state.form);
          }
        },
      );
    }
  }

  render() {
    const {
      isInitial,
      form: { name, cardNumber, cardType, month, year, crypto },
      label,
      loading,
    } = this.state;
    const { error, customBack, navigation } = this.props;
    const backAction = () => {
      if (customBack) {
        this.props.backAction();
      } else {
        this.props.navigation.goBack(null);
      }
    };

    return (
      <StyledContainerBasic style={isInitial && Styles.styles.container}>
        <StyledContainerBasic
          style={isInitial && [Styles.styles.wrapper, theme.cardStyle]}
        >
          {isInitial && <StyledBackground source={this.getBackgroundType()} />}
          {!isInitial && (
            <Styles.StyledHeader>
              <Header
                navigation={navigation}
                showBack
                arrowColor="black"
                textColor={theme.colors.primary}
                text={getTranslations('cardScanner.title')}
                backAction={backAction}
              />
            </Styles.StyledHeader>
          )}
          <Styles.StyledContainer style={theme.cardStyle} behavior="position">
            {isInitial && (
              <Styles.StyledHeader isInitial>
                <Header
                  navigation={navigation}
                  showBack
                  arrowColor="yellow"
                  textColor={theme.colors.yellow}
                  text={getTranslations('cardScanner.title')}
                  backAction={backAction}
                />
              </Styles.StyledHeader>
            )}
            <Styles.StyledScrollView
              isInitial={isInitial}
              showsVerticalScrollIndicator={false}
            >
              <Styles.StyledCentered>
                <CardVisual
                  cardNumber={cardNumber}
                  expiracyMonth={month}
                  expiracyYear={year}
                  cardType={cardType}
                  crypto={crypto}
                  name={name}
                />
              </Styles.StyledCentered>

              <Form
                form={this.state.form}
                error={this.state.error}
                label={label}
                onChange={this.onChange}
              />

              {error !== '' &&
                isInitial && (
                  <Styles.StyledCentered>
                    <Toast
                      label={error}
                      position="top"
                      hideToast={this.props.clearCardErrors}
                      hideDelay={5000}
                    />
                  </Styles.StyledCentered>
                )}

              <Styles.SButtonWrapper>
                <YellowRoundedButton
                  text={getTranslations('cardScanner.label.button')}
                  action={this.validate}
                  disabled={loading}
                />
              </Styles.SButtonWrapper>
            </Styles.StyledScrollView>
          </Styles.StyledContainer>
        </StyledContainerBasic>
      </StyledContainerBasic>
    );
  }
}

CardScanner.defaultProps = {
  customBack: false,
  backAction: () => {},
  customSave: false,
  saveAction: () => {},
};

CardScanner.propTypes = {
  scanCard: func.isRequired,
  cardData: shape({
    cardHolderName: string.isRequired,
    cardNumber: string.isRequired,
    cardType: string.isRequired,
    cvv: string.isRequired,
    expiracyMonth: oneOfType([string.isRequired, number.isRequired]).isRequired,
    expiracyYear: oneOfType([string.isRequired, number.isRequired]).isRequired,
  }).isRequired,
  navigation: shape({
    state: shape({
      params: shape({
        scanCard: bool.isRequired,
        action: func,
      }),
    }).isRequired,
    goBack: func.isRequired,
  }).isRequired,
  saveCard: func.isRequired,
  parentProfile: shape({
    id: number.isRequired,
  }).isRequired,
  clearCardErrors: func.isRequired,
  error: string.isRequired,
  customBack: bool,
  backAction: func,
  customSave: bool,
  saveAction: func,
  piggyBanks: shape({
    id: number.isRequired,
    type: string.isRequired,
  }).isRequired,
};

export default CardScanner;
