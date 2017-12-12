import React, { PureComponent } from 'react';
import { View, Animated, Easing } from 'react-native';
import { bool } from 'prop-types';

import sunImage from 'assets/pairing/panda/sun.png';

import treeImage from 'assets/pairing/panda/json/tree.json';

import * as Styles from '../styles';

class DecorationsPanda extends PureComponent {
  state = {
    sun: new Animated.Value(0),
    tree: new Animated.Value(0),
    topY: new Animated.Value(0),
    rightX: new Animated.Value(0),
  };

  componentDidMount() {
    const { sun, tree } = this.state;

    if (this.props.animated) {
      Animated.parallel([
        Animated.timing(sun, {
          toValue: 100,
          delay: 350,
          duration: 3000,
          easing: Easing.in(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(tree, {
          toValue: 1,
          delay: 100,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      sun.setValue(1);
      tree.setValue(1);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.reset !== nextProps.reset && nextProps.reset) {
      this.resetAnims();
    }
  }

  resetAnims() {
    const { topY, rightX } = this.state;

    Animated.parallel([
      Animated.timing(topY, {
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
    const { sun, tree, topY, rightX } = this.state;

    return (
      <View>
        <Styles.AImageContainer
          style={{
            transform: [
              {
                translateY: topY,
              },
            ],
          }}
        >
          <Styles.ASun
            style={{
              transform: [
                {
                  translateY: sun,
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
                translateX: rightX,
              },
            ],
          }}
        >
          <Styles.STree source={treeImage} progress={tree} />
        </Styles.AImageContainer>
      </View>
    );
  }
}

DecorationsPanda.propTypes = {
  animated: bool.isRequired,
  reset: bool.isRequired,
};

export default DecorationsPanda;
