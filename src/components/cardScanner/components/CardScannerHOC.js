import React, { PureComponent } from 'react';
import { Platform } from 'react-native';
import { CardIOModule, CardIOUtilities } from 'react-native-awesome-card-io';
import { bind } from 'decko';

import { getLanguage, getTranslations } from 'utils/i18n';

const CardScannerHandler = Target => {
  class CardScannerHOC extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        cardData: {
          cardNumber: '',
          cardType: '',
          cardHolderName: '',
          cvv: '',
          expiracyMonth: 0,
          expiracyYear: 0,
        },
      };
    }

    componentWillMount() {
      if (Platform.OS === 'ios') {
        CardIOUtilities.preload();
      }
    }

    @bind
    scanCard() {
      const config = {
        languageOrLocale: getLanguage(),
        scanInstructions: getTranslations('cardScanner.instruction'),
        // guideColor: '#FFDF2D',
        hideCardIOLogo: true,
        requireCardholderName: true,
        suppressScannedCardImage: true,
        suppressManualEntry: true,
        suppressConfirmation: true,
        scannedImageDuration: 0,
      };

      CardIOModule.scanCard(config)
        .then(card => {
          // the user card
          this.setState(state => {
            return {
              ...state,
              cardData: {
                ...state.cardData,
                cardNumber: card.cardNumber,
                cardType: card.cardType,
                cardHolderName: card.cardHolderName || '',
                cvv: card.cvv || '',
                expiracyMonth: card.expiryMonth,
                expiracyYear: card.expiryYear.toString().substr(2, 2),
              },
            };
          });
        })
        .catch(err => {
          // the user cancelled
          console.log('Error', err);
        });
    }

    render() {
      return (
        <Target
          {...this.props}
          scanCard={this.scanCard}
          cardData={this.state.cardData}
        />
      );
    }
  }

  return CardScannerHOC;
};

export default CardScannerHandler;
