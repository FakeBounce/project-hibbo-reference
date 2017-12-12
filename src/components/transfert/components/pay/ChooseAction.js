/* eslint no-underscore-dangle: 0 */
import React, { PureComponent } from 'react';
import { string, shape, arrayOf, func } from 'prop-types';
import { Dimensions, Animated } from 'react-native';
import uuid from 'uuid/v4';
import { bind } from 'decko';
import { getTranslations } from 'utils/i18n';

import Message from 'shared/chat/Message';
import { GreyRoundedButton } from 'shared/Button';

import banker from 'assets/transfert/Banker.png';
import appStyles from 'styles/appStyles';

import {
  SChooseActionButton,
  SChooseActionFooter,
  SChooseActionWrapper,
  SChooseActionAvatar,
  SChooseActionMessage,
} from '../../styles';

class ChooseAction extends PureComponent {
  constructor(props) {
    super(props);

    const bot = {
      createdAt: new Date(),
      user: {
        _id: 2,
      },
    };
    const id = uuid();
    const id2 = uuid();
    this.isMountedNow = true;
    this.messages = [
      {
        ...bot,
        _id: id,
        display: true,
        transfertBubble: {
          id,
          animated: false,
          amount: this.props.amount,
          speech: this.props.text,
          width: Dimensions.get('window').width - 110,
          height: 50,
          color: appStyles.green,
        },
        isAnimated: true,
        isLoading: false,
      },
      {
        ...bot,
        _id: id2,
        display: true,
        botBubble: {
          id: id2,
          animated: false,
          speech: getTranslations('transfert.pay.step2.bubble.chooseAction'),
          width: 70,
          height: 50,
        },
        isAnimated: true,
        isLoading: false,
      },
    ];
    this.state = {
      buttonOpacity: new Animated.Value(0),
      messagesProps: [
        {
          ...this.props,
          user: this.messages[0].user,
          key: this.messages[0]._id,
          currentMessage: this.messages[0],
          previousMessage: this.messages[0].previousMessage,
          nextMessage: this.messages[0].nextMessage,
          position: 'left',
          renderAvatar: () => <SChooseActionAvatar source={banker} />,
          updateMessage: () => {
            Animated.delay(1600).start(() => {
              if (this.isMountedNow) {
                this.addSecondMessage();
              }
            });
          },
        },
      ],
    };
  }

  componentWillUnmount() {
    this.isMountedNow = false;
  }

  addSecondMessage() {
    this.setState(state => ({
      ...state,
      messagesProps: [
        ...state.messagesProps,
        {
          ...this.props,
          user: this.messages[1].user,
          key: this.messages[1]._id,
          currentMessage: this.messages[1],
          previousMessage: this.messages[1].previousMessage,
          nextMessage: this.messages[1].nextMessage,
          position: 'left',
          renderAvatar: () => <SChooseActionAvatar source={banker} />,
          updateMessage: () => {
            if (this.isMountedNow) {
              Animated.timing(this.state.buttonOpacity, {
                duration: 300,
                delay: 1400,
                toValue: 1,
                useNativeDriver: true,
              }).start();
            }
          },
        },
      ],
    }));
  }

  @bind
  next(destination = '') {
    const {
      paymentMeans,
      amount,
      navigation,
      transfertStart,
      profileParent,
      profileChild,
      piggyBank,
    } = this.props;
    if (!destination) {
      transfertStart({
        profileParentId: profileParent.id,
        profileChildId: profileChild.id,
        amount,
        cardId: paymentMeans.cardId,
        walletId: piggyBank.walletId,
      });
      navigation.goBack(null);
      navigation.goBack(null);
      // eslint-disable-next-line
      requestAnimationFrame(() => {
        navigation.goBack(null);
      });
    } else {
      navigation.navigate(destination, {
        paymentMeans,
        amount,
        isFocus: destination === 'Messenger',
      });
    }
  }

  render() {
    const { messagesProps, buttonOpacity } = this.state;
    return (
      <SChooseActionWrapper>
        <SChooseActionMessage>
          {messagesProps.map(message => (
            <Message {...this.props} {...message} />
          ))}
          <SChooseActionButton
            style={{
              opacity: buttonOpacity,
            }}
          >
            <GreyRoundedButton
              action={() => this.next('')}
              text={getTranslations('shared.no')}
            />
            <GreyRoundedButton
              action={() => this.next('Messenger')}
              text={getTranslations('shared.yes')}
            />
          </SChooseActionButton>
        </SChooseActionMessage>

        <SChooseActionFooter style={{ opacity: buttonOpacity }} />
      </SChooseActionWrapper>
    );
  }
}

ChooseAction.propTypes = {
  amount: string.isRequired,
  paymentMeans: shape({
    cardId: string.isRequired,
  }).isRequired,
  text: arrayOf(string.isRequired).isRequired,
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
  transfertStart: func.isRequired,
  profileParent: shape({}).isRequired,
  profileChild: shape({}).isRequired,
  piggyBank: shape({
    walletId: string.isRequired,
  }).isRequired,
};

export default ChooseAction;
