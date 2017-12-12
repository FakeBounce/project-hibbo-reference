import React, { PureComponent } from 'react';
import { Animated } from 'react-native';
import { bool } from 'prop-types';

import whaleImage from 'assets/pairing/whale/json/whale.json';

import * as Styles from '../styles';

class DecorationsWhaleFront extends PureComponent {
  state = {
    whale: new Animated.Value(0),
    bottomY: new Animated.Value(0),
  };

  componentDidMount() {
    const { whale } = this.state;

    if (this.props.animated) {
      Animated.timing(whale, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }).start();
    } else {
      whale.setValue(1);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.reset !== nextProps.reset && nextProps.reset) {
      this.resetAnims();
    }
  }

  resetAnims() {
    const { bottomY } = this.state;

    Animated.timing(bottomY, {
      toValue: 400,
      duration: 300,
    }).start();
  }

  render() {
    const { whale, bottomY } = this.state;

    return (
      <Styles.AZIndexFront>
        <Styles.AWrapperFront
          style={{
            transform: [
              {
                translateY: bottomY,
              },
            ],
          }}
        >
          <Styles.AWhale source={whaleImage} progress={whale} />
        </Styles.AWrapperFront>
      </Styles.AZIndexFront>
    );
  }
}

DecorationsWhaleFront.propTypes = {
  animated: bool.isRequired,
  reset: bool.isRequired,
};

export default DecorationsWhaleFront;
