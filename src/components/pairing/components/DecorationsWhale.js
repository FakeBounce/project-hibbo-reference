import React, { PureComponent } from 'react';
import { View, Animated, Easing } from 'react-native';
import { bool } from 'prop-types';

import sunImage from 'assets/pairing/whale/sun.png';
import icebergImage from 'assets/pairing/whale/iceberg.png';
import auroreImage from 'assets/pairing/whale/aurore.png';

import * as Styles from '../styles';

class DecorationsWhale extends PureComponent {
  state = {
    sunX: new Animated.Value(0),
    sunY: new Animated.Value(0),
    iceberg: new Animated.Value(0),
    aurore: new Animated.Value(0),
    leftX: new Animated.Value(0),
    rightX: new Animated.Value(0),
  };

  componentDidMount() {
    const { sunX, sunY, iceberg, aurore } = this.state;

    if (this.props.animated) {
      Animated.parallel([
        Animated.timing(iceberg, {
          toValue: 230,
          delay: 250,
          duration: 1800,
          easing: Easing.in(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(aurore, {
          toValue: 200,
          delay: 100,
          duration: 3000,
          useNativeDriver: true,
        }),
        Animated.timing(sunX, {
          toValue: -150,
          duration: 2300,
          easing: Easing.in(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(sunY, {
          toValue: -200,
          duration: 2300,
          easing: Easing.in(Easing.quad),
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      iceberg.setValue(230);
      aurore.setValue(200);
      sunX.setValue(-150);
      sunY.setValue(-200);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.reset !== nextProps.reset && nextProps.reset) {
      this.resetAnims();
    }
  }

  resetAnims() {
    const { leftX, rightX } = this.state;

    Animated.parallel([
      Animated.timing(leftX, {
        toValue: -400,
        duration: 300,
      }),
      Animated.timing(rightX, {
        toValue: 400,
        duration: 300,
      }),
    ]).start();
  }

  render() {
    const { sunX, sunY, aurore, iceberg, rightX, leftX } = this.state;

    return (
      <View>
        <Styles.AImageContainer
          style={{
            transform: [
              {
                translateX: rightX,
              },
            ],
          }}
        >
          <Styles.SSunWhale
            style={{
              transform: [
                {
                  translateY: sunY,
                },
                {
                  translateX: sunX,
                },
              ],
            }}
            source={sunImage}
          />
        </Styles.AImageContainer>

        <Styles.AImageContainer
          style={{
            transform: [
              {
                translateX: leftX,
              },
            ],
          }}
        >
          <Styles.AAurore
            style={{
              transform: [
                {
                  translateX: aurore,
                },
              ],
            }}
            source={auroreImage}
          />
          <Styles.AIceberg
            style={{
              transform: [
                {
                  translateX: iceberg,
                },
              ],
            }}
            source={icebergImage}
          />
        </Styles.AImageContainer>
      </View>
    );
  }
}

DecorationsWhale.propTypes = {
  animated: bool.isRequired,
  reset: bool.isRequired,
};

export default DecorationsWhale;
