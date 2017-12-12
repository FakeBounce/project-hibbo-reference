import React, { PureComponent } from 'react';
import appStyles from 'styles/appStyles';
import { bind } from 'decko';
import { Dimensions, Animated } from 'react-native';
import {
  string,
  number,
  object,
  arrayOf,
  shape,
  func,
  instanceOf,
} from 'prop-types';

const moveValue = 60;
const minimunTransfertAnimation = appStyles.transaction.minimunForAnimation;

const { width, height } = Dimensions.get('window');
const holeWrapperWidth = width + 100;
const holeWrapperHeight = height * 0.4;
const cardWidth = width - 30;
const holeSize = holeWrapperWidth - 150 * 2;

const HomeHOCHandler = Target => {
  class HomeHOC extends PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        transactionAmount: 0,
        transactionType: '',
        transactions: this.props.transactions,
        totalAmount: this.props.totalAmount,
        inTransaction: false,
        needHomeAnimation: false,
        switchMode: false,
        switchParticles: false,
      };

      this.scale = new Animated.Value(1);

      this.lastTransactionAnimatedValues = {
        translateY: new Animated.Value(0),
        opacity: new Animated.Value(1),
        scaleY: new Animated.Value(1),
      };

      this.transactionAnimationValues = {
        translateX: new Animated.Value(-moveValue),
        translateY: new Animated.Value(-moveValue),
        opacity: new Animated.Value(0),
        scaleY: new Animated.Value(1),
      };

      this.dimensions = {
        holeWrapperWidth,
        holeWrapperHeight,
        cardWidth,
        holeSize,
      };
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.childId !== this.props.childId) {
        this.setState(state => ({
          ...state,
          switchMode: !state.switchMode,
          transactions: nextProps.transactions,
          totalAmount: nextProps.totalAmount,
        }));
      }
      if (
        !this.state.inTransaction &&
        nextProps.transactions.length !== this.props.transactions.length
      ) {
        this.animationTransaction(
          nextProps.transactions[0].amount,
          nextProps.transactions[0].type,
        );
      }
    }

    @bind
    onFinishAnimation() {
      Animated.sequence([
        Animated.timing(this.transactionAnimationValues.opacity, {
          toValue: 0,
          duration: 300,
        }),
        Animated.timing(this.lastTransactionAnimatedValues.opacity, {
          toValue: 1,
          duration: 300,
        }),
      ]).start(() => {
        this.setState({
          inTransaction: false,
          needHomeAnimation: false,
          totalAmount: this.props.totalAmount,
          transactions: this.props.transactions,
          transactionAmount: 0,
          transactionType: '',
        });
      });
    }

    @bind
    onPress(profileId = 0) {
      if (profileId !== 0 && profileId !== this.props.childId) {
        this.props.changeProfileChild(profileId);
      } else {
        this.setState(state => ({
          ...state,
          switchMode: !state.switchMode,
        }));
      }
    }

    @bind
    setSwitchParticles() {
      this.setState(
        state => ({
          ...state,
          switchParticles: !state.switchParticles,
        }),
        () => {
          Animated.timing(this.scale, {
            toValue: this.state.switchParticles ? 0 : 1,
            duration: 500,
          }).start();
        },
      );
    }
    @bind
    setSwitchMode() {
      this.setState(state => ({
        ...state,
        switchMode: !state.switchMode,
      }));
    }

    @bind
    animationTransaction(transactionAmount, transactionType) {
      const { needHomeAnimation } = this.state;
      const { translateX, opacity } = this.transactionAnimationValues;

      Animated.timing(this.lastTransactionAnimatedValues.opacity, {
        toValue: 0,
        duration: 500,
      }).start(() => {
        this.setState(
          {
            inTransaction: true,
            transactionAmount,
            transactionType,
            needHomeAnimation:
              transactionAmount > minimunTransfertAnimation ||
              transactionType === 'credit',
          },
          () => {
            Animated.parallel([
              Animated.timing(translateX, {
                toValue: 0,
                delay: 500,
                duration: 500,
              }),
              Animated.timing(opacity, {
                toValue: 1,
                delay: 500,
                duration: 500,
              }),
            ]).start(() => {
              if (!needHomeAnimation) {
                Animated.delay(appStyles.time.moneyTransaction).start(() => {
                  this.onFinishAnimation();
                });
              }
            });
          },
        );
      });
    }

    render() {
      const totalMoveValue = this.lastTransactionAnimatedValues.opacity.interpolate(
        {
          inputRange: [0, 1],
          outputRange: [-moveValue, 0],
        },
      );
      return (
        <Target
          onFinishAnimation={this.onFinishAnimation}
          lastTransactionAnimatedValues={this.lastTransactionAnimatedValues}
          totalMoveValue={totalMoveValue}
          transactionAnimationValues={this.transactionAnimationValues}
          setSwitchParticles={this.setSwitchParticles}
          scale={this.scale}
          setSwitchMode={this.setSwitchMode}
          onPress={this.onPress}
          dimensions={this.dimensions}
          {...this.props}
          {...this.state}
        />
      );
    }
  }

  HomeHOC.propTypes = {
    goTo: func.isRequired,
    avatar: string.isRequired,
    totalAmount: number.isRequired,
    transactions: arrayOf(object).isRequired,
    navigation: shape({
      navigate: func.isRequired,
    }).isRequired,
    position: instanceOf(Animated.Value).isRequired,
    kids: arrayOf(
      shape({
        avatar: string.isRequired,
        childProfileId: number.isRequired,
      }),
    ).isRequired,
    currentKid: shape({
      avatar: string.isRequired,
      childProfileId: number.isRequired,
    }).isRequired,
    childId: number.isRequired,
    toggleHeader: func.isRequired,
    handleHeaderTranslation: func.isRequired,
    changeProfileChild: func.isRequired,
  };

  return HomeHOC;
};

export default HomeHOCHandler;
