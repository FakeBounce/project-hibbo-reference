/* eslint react/no-array-index-key: 1 */

import React, { PureComponent } from 'react';
import { shape, array, func, string } from 'prop-types';
import { View, FlatList } from 'react-native';
import { bind } from 'decko';
import EStyleSheet from 'react-native-extended-stylesheet';

import ModalCustom from 'shared/Modal';

import theme from 'styles/appStyles';

import SelectCard from './SelectCard';
import CardRowSelectable from './CardRowSelectable';

const styles = EStyleSheet.create({
  wrapper: {
    flex: 0,
  },
  modalContent: {
    width: '100% - 60',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  closeModal: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
});

class CardSelect extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      selectedCard: this.props.paymentMeans.card[0],
    };
  }

  componentWillMount() {
    if (this.state.selectedCard) {
      this.props.setCardId(this.state.selectedCard.id);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.paymentMeans.card.length !== this.props.paymentMeans.card.length
    ) {
      let selectedCard = null;
      // eslint-disable-next-line
      for (const card of nextProps.paymentMeans.card) {
        if (
          this.props.paymentMeans.card.filter(c => c.id === card.id).length ===
          0
        ) {
          selectedCard = card;
          break;
        }
      }
      this.props.setCardId(selectedCard.id);
      this.setState(state => ({
        ...state,
        selectedCard,
      }));
    }
  }

  @bind
  goToCardScanner() {
    this.props.navigation.navigate(this.props.cardScanner, {
      scanCard: true,
      action: () => this.props.navigation.goBack(null),
    });
  }

  @bind
  switchModalVisible() {
    this.props.setError('');
    if (this.props.paymentMeans.card.length === 0) {
      this.goToCardScanner();
    } else {
      this.setState(state => ({
        ...state,
        modalVisible: !state.modalVisible,
      }));
    }
  }

  @bind
  selectCard(card) {
    if (card.id) {
      this.setState(
        state => ({
          ...state,
          selectedCard: card,
          modalVisible: false,
        }),
        () => {
          this.props.setCardId(card.id);
        },
      );
    } else {
      this.setState(
        state => ({
          ...state,
          modalVisible: false,
        }),
        () => {
          this.goToCardScanner();
        },
      );
    }
  }

  @bind
  renderCard({ item }) {
    return <CardRowSelectable selectCard={this.selectCard} card={item} />;
  }

  render() {
    const lastLine = {};
    return (
      <View style={styles.wrapper}>
        <SelectCard
          switchModalVisible={this.switchModalVisible}
          card={this.state.selectedCard}
        />
        <ModalCustom
          style={[theme.cardStyle, styles.modalContent]}
          visible={this.state.modalVisible}
          switchModalVisible={this.switchModalVisible}
        >
          <FlatList
            data={[...this.props.paymentMeans.card, lastLine]}
            renderItem={this.renderCard}
            keyExtractor={(item, index) => `${item.id}${index}`}
          />
        </ModalCustom>
      </View>
    );
  }
}

CardSelect.propTypes = {
  paymentMeans: shape({
    card: array.isRequired,
  }).isRequired,
  setCardId: func.isRequired,
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
  setError: func.isRequired,
  cardScanner: string.isRequired,
};

export default CardSelect;
