import React, { PureComponent } from 'react';
import { bind } from 'decko';
import { shape, func, string, number, array } from 'prop-types';
import { getTranslations } from 'utils/i18n';
import Header from 'shared/Header';
import { StyledDetailModal, StyledSecurityCodeMargedTop } from '../styles';

class MissionPayment extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      pin: [],
      pinString: '',
      error: false,
    };
  }

  componentDidMount() {
    this.props.isInTransfer();
  }

  @bind
  enterPin(value) {
    const pin = value.split('');

    this.setState(state => {
      return {
        ...state,
        pin,
        pinString: value,
        error: false,
      };
    });

    if (value.length === 4) {
      if (this.props.parent.securityCode === value.toString()) {
        this.props.doneMissionToProfile(this.props.navigation.state.params.id);
        this.props.navigation.goBack(null);
      } else {
        this.setState(state => {
          return {
            ...state,
            error: true,
          };
        });
      }
    }
  }

  render() {
    const { title } = this.props.navigation.state.params;

    return (
      <StyledDetailModal>
        <Header
          navigation={this.props.navigation}
          text={getTranslations('mission.detail.title')}
          showBack
          arrowColor="black"
          textColor="black"
          customAction
          backAction={() => {
            this.props.isInTransfer();
            this.props.navigation.goBack(null);
          }}
        />
        <StyledSecurityCodeMargedTop
          text={title}
          amount={this.state.pinString}
          isSetup
          isDebit={false}
          setupAction={this.enterPin}
          {...this.props}
          {...this.state}
          cardScanner="NavigationCardScanner"
        />
      </StyledDetailModal>
    );
  }
}

MissionPayment.propTypes = {
  navigation: shape({
    goBack: func.isRequired,
    navigate: func.isRequired,
    state: shape({
      params: shape({
        theme: string.isRequired,
        title: string.isRequired,
        icon: string.isRequired,
        deadline: number.isRequired,
        status: string.isRequired,
        amount: string.isRequired,
      }),
    }),
  }).isRequired,
  parent: shape({
    id: number.isRequired,
  }).isRequired,
  paymentMeans: shape({
    parent: shape({
      card: array,
    }),
    cardId: string,
  }).isRequired,
  setCardId: func.isRequired,
  doneMissionToProfile: func.isRequired,
  isInTransfer: func.isRequired,
};

export default MissionPayment;
