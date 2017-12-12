import React, { PureComponent } from 'react';
import { View, TextInput, Animated, Dimensions } from 'react-native';
import { string, shape, func, bool, number } from 'prop-types';
import { connect } from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { bind } from 'decko';

import { transfertStart } from 'actions/transfertActions';
import { setError } from 'actions/notificationsActions';

import { getTranslations } from 'utils/i18n';
import appStyles from 'styles/appStyles';

import ModalIconPanel from 'shared/ModalIconPanel';
import Messenger from './components/Messenger';
import MessengerPictoSelect from './components/MessengerPictoSelect';

const styles = EStyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  input: {
    borderRadius: 15,
    margin: 10,
    flex: 1,
    padding: 4,
    borderWidth: 1,
    borderColor: '$colors.messageGrey',
    backgroundColor: '$colors.white',
    height: 35,
  },
  text: {
    flexDirection: 'row',
    backgroundColor: '$colors.white',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 0,
    width: '100%',
  },
  messageBox: {
    flex: 0,
  },
});

class MessengerComponent extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      input: false,
      text: '',
      showMessageBox: false,
      icon: null,
      animHide: new Animated.Value(0),
      animHideBottom: new Animated.Value(0),
      animShowBotton: new Animated.Value(Dimensions.get('window').height),
      showModalWindow: false,
      messages: {
        text: '',
        image: null,
      },
    };
    this.animatingShow = false;
  }

  componentDidMount() {
    if (this.props.navigation.state.params.isFocus) {
      this.animatingShow = true;
      Animated.stagger(300, [
        Animated.spring(this.state.animShowBotton, {
          friction: 23,
          tension: 200,
          toValue: 111,
        }),
        Animated.timing(this.state.animHide, {
          toValue: 1,
          duration: 300,
        }),
        Animated.timing(this.state.animHideBottom, {
          toValue: 1,
          duration: 300,
        }),
      ]).start(() => {
        console.log('finished all animation');
        this.animatingShow = false;
      });
    }
  }

  componentWillUpdate(newProps) {
    if (newProps.navigation.state.params.isFocus && !this.animatingShow) {
      Animated.stagger(300, [
        Animated.spring(this.state.animShowBotton, {
          friction: 23,
          tension: 200,
          toValue: 111,
        }),
        Animated.timing(this.state.animHide, {
          toValue: 1,
          duration: 300,
        }),
        Animated.timing(this.state.animHideBottom, {
          toValue: 1,
          duration: 300,
        }),
      ]).start();
    }
  }

  @bind
  onSend(text) {
    this.setState(state => ({
      ...state,
      showMessageBox: false,
      messages: {
        ...state.messages,
        text,
      },
    }));
    if (this.state.input === true) {
      this.setState({ text: '', input: false });
    }
  }

  @bind
  choosePicto() {
    Animated.stagger(300, [
      Animated.timing(this.state.animHide, {
        toValue: 0,
        duration: 300,
      }),
      Animated.timing(this.state.animHideBottom, {
        toValue: 0,
        duration: 300,
      }),
      Animated.timing(this.state.animShowBotton, {
        duration: 300,
        toValue: Dimensions.get('window').height - 20,
      }),
    ]).start(() => {
      this.setState({
        ...this.state,
        showModalWindow: true,
      });
    });
  }

  @bind
  clearText() {
    this.setState(state => ({
      ...state,
      input: false,
      showMessageBox: false,
    }));
  }

  @bind
  exitModalIconPanel(icon) {
    this.setState(state => ({
      ...state,
      icon,
      showModalWindow: false,
      messages: {
        ...state.messages,
        image: icon,
      },
    }));
  }

  @bind
  showTextBox(update) {
    this.setState(state => ({
      ...state,
      showMessageBox: true,
      text: update ? state.messages.text : '',
      input: true,
    }));
  }

  @bind
  sendMessage() {
    const { messages } = this.state;
    this.messageSent(messages);
  }

  messageSent(messages) {
    // Send message and event to piggy
    const { navigation, parent, child, childWallet } = this.props;
    const { paymentMeans, amount } = navigation.state.params;
    if (!messages.text) {
      this.props.setError('messenger.error.no.message');
      return;
    }
    const transfert = {
      profileParentId: parent.id,
      profileChildId: child.id,
      amount,
      cardId: paymentMeans.cardId,
      walletId: childWallet,
      message: messages.text,
    };
    if (messages.image) {
      transfert.icon = messages.image;
    }
    this.props.transfertStart(transfert);
    // const event = messages.image ? messages.image : 'none';

    // piggy.sendTransaction(
    //   amount,
    //   accountAmount,
    //   appStyles.event[event],
    //   messages.text,
    // );
    this.resetMessenger();

    navigation.goBack(null);
    navigation.goBack(null);
    navigation.goBack(null);
    // eslint-disable-next-line
    requestAnimationFrame(() => {
      navigation.goBack(null);
    });
    // @todo: redo these functions
    // this.props.onEndTransaction();
    // this.props.resetNav();
  }

  @bind
  resetMessenger() {
    this.setState(state => ({
      ...state,
      messages: {
        text: '',
        image: null,
      },
    }));
  }

  render() {
    const { navigation, child } = this.props;

    return (
      <View style={styles.wrapper}>
        <View style={styles.content}>
          {this.state.showModalWindow ? (
            <ModalIconPanel
              action={this.exitModalIconPanel}
              openShop={() => {
                navigation.navigate('Shop');
              }}
              backgroundFill={appStyles.colors.textGrey}
            />
          ) : (
            <Messenger
              {...this.props}
              choosePicto={this.choosePicto}
              messages={this.state.messages}
              input={this.state.input}
              animHide={this.state.animHide}
              showTextBox={this.showTextBox}
              showMessageBox={this.state.showMessageBox}
              animShowBotton={this.state.animShowBotton}
              animHideBottom={this.state.animHideBottom}
              sendMessage={this.sendMessage}
              firstName={child.nickname || ''}
            />
          )}
        </View>
        {this.state.showMessageBox && (
          <View style={styles.messageBox}>
            <View style={styles.text}>
              <MessengerPictoSelect action={this.choosePicto} />
              <TextInput
                autoCapitalize="sentences"
                autoCorrect={false}
                autoFocus
                returnKeyType="done"
                placeholder={getTranslations('messenger.input.placeholder')}
                blurOnSubmit
                onSubmitEditing={event => {
                  this.onSend(event.nativeEvent.text);
                }}
                style={styles.input}
                onBlur={this.clearText}
                onChangeText={text => {
                  if (text.length <= appStyles.maxTextSize) {
                    this.setState(state => ({
                      text,
                      messages: {
                        ...state.messages,
                        text,
                      },
                    }));
                  }
                }}
                value={this.state.text}
              />
            </View>
            <KeyboardSpacer topSpacing={-10} />
          </View>
        )}
      </View>
    );
  }
}

MessengerComponent.propTypes = {
  navigation: shape({
    dispatch: func.isRequired,
    goBack: func.isRequired,
    navigate: func.isRequired,
    setParams: func.isRequired,
    state: shape({
      key: string.isRequired,
      routeName: string.isRequired,
      params: shape({
        amount: string.isRequired,
        paymentMeans: shape({
          cardId: string.isRequired,
        }).isRequired,
        isFocus: bool,
      }).isRequired,
    }).isRequired,
  }).isRequired,
  child: shape({}).isRequired,
  parent: shape({
    id: number.isRequired,
  }).isRequired,
  childWallet: string.isRequired,
  transfertStart: func.isRequired,
  setError: func.isRequired,
};

const mapStateToProps = state => {
  return {
    child: state.profile.child,
    parent: state.profile.parent,
    childWallet: state.piggyBank.currentPiggy.walletId,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    transfertStart: transfertData => {
      dispatch(transfertStart(transfertData));
    },
    setError: errorMsg => {
      dispatch(setError(errorMsg));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MessengerComponent);
