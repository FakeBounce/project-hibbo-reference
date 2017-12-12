import React, { PureComponent } from 'react';
import { Animated, Easing } from 'react-native';
import { bool } from 'prop-types';

import leftTree2Image from 'assets/pairing/monkey/leftTree2.png';
import bottomTreeImage from 'assets/pairing/monkey/bottomTree.png';

import * as Styles from '../styles';

class DecorationsMonkeyFront extends PureComponent {
  state = {
    leftTree2: new Animated.Value(0),
    bottomTree: new Animated.Value(0),
    leftX: new Animated.Value(0),
    bottomY: new Animated.Value(0),
  };

  componentDidMount() {
    const { leftTree2, bottomTree } = this.state;

    if (this.props.animated) {
      Animated.parallel([
        Animated.timing(bottomTree, {
          toValue: -125,
          delay: 50,
          easing: Easing.in(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(leftTree2, {
          toValue: 138,
          delay: 125,
          easing: Easing.in(Easing.quad),
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      leftTree2.setValue(138);
      bottomTree.setValue(-125);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.reset !== nextProps.reset && nextProps.reset) {
      this.resetAnims();
    }
  }

  resetAnims() {
    const { leftX, bottomY } = this.state;

    Animated.parallel([
      Animated.timing(bottomY, {
        toValue: 400,
      }),
      Animated.timing(leftX, {
        toValue: -200,
      }),
    ]).start();
  }

  render() {
    const { bottomTree, leftTree2, leftX, bottomY } = this.state;

    return (
      <Styles.AZIndexFront>
        <Styles.AWrapperFront
          style={{
            transform: [
              {
                translateX: leftX,
              },
            ],
          }}
        >
          <Styles.ALeftTreeFront
            style={{
              transform: [
                {
                  translateX: leftTree2,
                },
              ],
            }}
            source={leftTree2Image}
          />
        </Styles.AWrapperFront>
        <Styles.AWrapperFront
          style={{
            transform: [
              {
                translateY: bottomY,
              },
            ],
          }}
        >
          <Styles.ABottomTree
            style={{
              transform: [
                {
                  translateY: bottomTree,
                },
              ],
            }}
            source={bottomTreeImage}
          />
        </Styles.AWrapperFront>
      </Styles.AZIndexFront>
    );
  }
}

DecorationsMonkeyFront.propTypes = {
  animated: bool.isRequired,
  reset: bool.isRequired,
};

export default DecorationsMonkeyFront;
