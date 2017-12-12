import React, { PureComponent } from 'react';
import { View, Image, Text, ImageBackground, Animated } from 'react-native';
import { string, func, number, shape, instanceOf } from 'prop-types';
import { YellowRoundedButton, Button } from 'shared/Button';

import { getTranslations } from 'utils/i18n';
import backgroundIMG from 'assets/openMonimalz/background.png';
import monimalzIMG from 'assets/openMonimalz/monimalz-rich.png';
import successIcon from 'assets/openMonimalz/success.png';
import line from 'assets/openMonimalz/line.png';

import EStyleSheet from 'react-native-extended-stylesheet';
import PadNumber from 'shared/PadNumber';
import DisplayTotal from '../../transfert/components/DisplayTotal';

const styles = EStyleSheet.create({
  imgBackground: {},
  $totalMargin: '2 * $size.cardMargin',
  container: {
    margin: '$size.cardMargin',
    backgroundColor: '$colors.white',
    borderRadius: 5,
    height: '100% - $totalMargin',
    overflow: 'scroll',
  },
  titleOpenMonimalz: {
    fontSize: 30,
    fontFamily: '$fonts.circularBold',
    color: '$colors.primary',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    lineHeight: 40,
    marginTop: 70,
  },
  separator: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    color: '$colors.primary',
  },
  imgSeparator: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    height: 2,
    width: '60%',
    marginTop: 10,
  },
  subtitleOpenMonimalz: {
    fontSize: 18,
    fontFamily: '$fonts.circularBook',
    color: '$colors.primary',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 10,
  },
  imageOpenMonimalz: {
    width: 272,
    height: 181,
    alignSelf: 'center',
  },
  amount: {
    fontSize: 26,
    color: '$colors.white',
    fontFamily: '$fonts.peepo',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 95,
    marginRight: 25,
  },
  successIcon: {
    width: 50,
    height: 50,
    top: '15%',
    right: '-85%',
    position: 'relative',
  },
  mainContainer: {
    backgroundColor: '$colors.white',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  defaultButton: {},
  defaultText: {
    borderBottomWidth: 0.6,
    borderBottomColor: '$colors.primary',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  yellowButton: {
    width: '80%',
    height: 56,
    marginBottom: 15,
    backgroundColor: '$colors.buttonYellow',
    borderRadius: '$cardStyle.borderRadius',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  yellowButtonClose: {
    width: '80%',
    height: 56,
    marginTop: 170,
    backgroundColor: '$colors.buttonYellow',
    borderRadius: '$cardStyle.borderRadius',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  yellowButtonText: {
    padding: 0,
  },
  sendToButton: {
    width: '40%',
    height: 56,
    marginBottom: 15,
    marginLeft: 10,
    backgroundColor: '$colors.buttonGrey',
    borderRadius: '$cardStyle.borderRadius',
  },
  sendToButtonText: {
    padding: 0,
  },
  padnumberContainer: {
    marginTop: 15,
  },
  buttonsContainer: {
    marginTop: 15,
    padding: 0,
  },
  displayTotal: {
    minHeight: 150,
  },
});

class OpenMonimalz extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      title: getTranslations('openMonimalz.title.hey'),
      subtitle: getTranslations('openMonimalz.subtile.opened'),
      isPadVisible: false,
      isValide: false,
      isEmpty: false,
      isDebit: true,
    };
  }

  componentDidMount() {
    if (!this.state.isPadVisible) this.triggerAnimation();
  }

  componentWillUpdate() {
    if (!this.state.isPadVisible) this.triggerAnimation();
  }

  showAnimation() {
    Animated.sequence([
      Animated.timing(this.props.animatedValue.opacity.title, {
        toValue: 1,
        duration: 300,
      }),
      Animated.parallel([
        Animated.timing(this.props.animatedValue.opacity.moneyPot, {
          toValue: 1,
          duration: 300,
        }),
      ]),
      Animated.parallel([
        Animated.timing(this.props.animatedValue.opacity.keyBoard, {
          toValue: 1,
          duration: 300,
        }),
      ]),
    ]).start();
  }

  triggerAnimation() {
    Animated.sequence([
      Animated.timing(this.props.animatedValue.opacity.title, {
        toValue: 0,
        duration: 0,
      }),
      Animated.parallel([
        Animated.timing(this.props.animatedValue.opacity.moneyPot, {
          toValue: 0,
          duration: 0,
        }),
      ]),
      Animated.parallel([
        Animated.timing(this.props.animatedValue.opacity.keyBoard, {
          toValue: 0,
          duration: 0,
        }),
      ]),
    ]).start(() => this.showAnimation());
  }
  emptyMoneybox() {
    this.setState(() => {
      return {
        title: getTranslations('openMonimalz.title.daccord'),
        subtitle: getTranslations('openMonimalz.subtile.resetMoney'),
        isEmpty: true,
      };
    });
  }

  withdrawalMoneybox() {
    this.setState(() => {
      return {
        title: getTranslations('openMonimalz.title.daccord'),
        subtitle: getTranslations('openMonimalz.subtile.takeMoney'),
        isPadVisible: true,
        isDebit: true,
      };
    });
  }

  moneyDepositMoneybox() {
    this.setState(() => {
      return {
        title: getTranslations('openMonimalz.title.daccord'),
        subtitle: getTranslations('openMonimalz.subtile.dropMoney'),
        isPadVisible: true,
        isDebit: false,
      };
    });
  }

  isMistake() {
    this.setState(() => {
      return {
        title: getTranslations('openMonimalz.title.hey'),
        subtitle: getTranslations('openMonimalz.subtile.sameMoney'),
        isPadVisible: false,
        isValide: true,
      };
    });
  }

  validate() {
    this.setState(() => {
      return {
        isValide: true,
      };
    });
  }

  goBackHome() {
    this.setState(() => {
      return {
        title: getTranslations('openMonimalz.title.hey'),
        subtitle: getTranslations('openMonimalz.subtile.opened'),
        isPadVisible: false,
        isValide: false,
      };
    });
  }

  render() {
    return (
      <ImageBackground source={backgroundIMG} style={styles.imgBackground}>
        <View style={styles.container}>
          <Animated.View
            style={{
              opacity: this.props.animatedValue.opacity.title,
              transform: [{ scale: this.props.animatedValue.opacity.title }],
            }}
          >
            <Text style={styles.titleOpenMonimalz}>{this.state.title}</Text>
            <ImageBackground source={line} style={styles.imgSeparator} />
            <Text style={styles.subtitleOpenMonimalz}>
              {this.state.subtitle}
            </Text>
          </Animated.View>

          <Animated.View
            style={{
              opacity: this.props.animatedValue.opacity.moneyPot,
              transform: [{ scale: this.props.animatedValue.opacity.moneyPot }],
            }}
          >
            <View style={styles.mainContainer}>
              {this.state.isPadVisible ? (
                <Animated.View>
                  <DisplayTotal
                    isDebit={this.state.isDebit}
                    animatedValue={this.props.animatedValue.opacity.keyBoard}
                    style={styles.displayTotal}
                    totalAmount={this.props.totalAmount}
                  />
                  <Button
                    styleButton={styles.sendToButton}
                    styleText={styles.sendToButtonText}
                    text={getTranslations('openMonimalz.button.sendTo')}
                    profilePicture={{ source: this.props.profilePicture }}
                    action={() => {
                      console.log('SEND TO BUTTON !!!');
                    }}
                  />
                  <View style={styles.padnumberContainer}>
                    <PadNumber
                      pressInput={this.props.pressInput}
                      numberMax={4}
                      amount={this.props.totalAmount}
                    />
                  </View>
                </Animated.View>
              ) : (
                <ImageBackground
                  source={this.state.isPadVisible ? null : monimalzIMG}
                  style={styles.imageOpenMonimalz}
                >
                  <Text style={styles.amount}>
                    {this.state.isPadVisible ||
                    this.state.isValide ||
                    (this.state.isEmpty && this.props.totalAmount !== '') ? (
                      `${this.props.totalAmount}€`
                    ) : null}
                  </Text>
                  {this.state.isValide ? (
                    <Image source={successIcon} style={styles.successIcon} />
                  ) : null}
                </ImageBackground>
              )}
            </View>
          </Animated.View>

          <Animated.View
            style={{
              opacity: this.props.animatedValue.opacity.keyBoard,
              transform: [{ scale: this.props.animatedValue.opacity.keyBoard }],
            }}
          >
            <View style={styles.buttonsContainer}>
              {!this.state.isPadVisible ? (
                <View>
                  {this.state.isValide || this.state.isEmpty ? (
                    <YellowRoundedButton
                      styleButton={styles.yellowButtonClose}
                      styleText={styles.yellowButtonText}
                      text={getTranslations('openMonimalz.button.close')}
                      action={() => {
                        this.props.navigation.goBack(null);
                      }}
                    />
                  ) : (
                    <View>
                      <YellowRoundedButton
                        styleButton={styles.yellowButton}
                        styleText={styles.yellowButtonText}
                        text={getTranslations(
                          'openMonimalz.button.emptyMoneybox',
                        )}
                        action={() => {
                          this.emptyMoneybox();
                        }}
                      />
                      <YellowRoundedButton
                        styleButton={styles.yellowButton}
                        styleText={styles.yellowButtonText}
                        text={getTranslations('openMonimalz.button.withdrawal')}
                        action={() => {
                          this.withdrawalMoneybox();
                        }}
                      />
                      <YellowRoundedButton
                        styleButton={styles.yellowButton}
                        styleText={styles.yellowButtonText}
                        text={getTranslations(
                          'openMonimalz.button.moneyDeposit',
                        )}
                        action={() => {
                          this.moneyDepositMoneybox();
                        }}
                      />
                      <Button
                        styleButton={styles.defaultButton}
                        styleText={styles.defaultText}
                        text={getTranslations('openMonimalz.button.mistake')}
                        action={() => {
                          this.isMistake();
                        }}
                      />
                    </View>
                  )}
                </View>
              ) : null}
            </View>
          </Animated.View>
        </View>
      </ImageBackground>
    );
  }
}

OpenMonimalz.propTypes = {
  totalAmount: string.isRequired,
  pressInput: func.isRequired,
  profilePicture: number,
  animatedValue: shape({
    opacity: shape({
      title: instanceOf(Animated.Value).isRequired,
      moneyPot: instanceOf(Animated.Value).isRequired,
      keyBoard: instanceOf(Animated.Value).isRequired,
      payTotal: instanceOf(Animated.Value).isRequired,
    }).isRequired,
  }).isRequired,
  navigation: shape({
    dispatch: func.isRequired,
    goBack: func.isRequired,
    navigate: func.isRequired,
  }).isRequired,
};

OpenMonimalz.defaultProps = {
  profilePicture: 1,
};

export default OpenMonimalz;
