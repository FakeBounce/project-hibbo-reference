import React, { PureComponent } from 'react';
import { Animated, Platform } from 'react-native';
import { bool } from 'prop-types';

import bambooImage from 'assets/pairing/panda/json/bamboo.json';
import rockImage from 'assets/pairing/panda/json/rock.json';

import * as Styles from '../styles';

class DecorationsPandaFront extends PureComponent {
  state = {
    rock: new Animated.Value(0),
    bamboo: new Animated.Value(0),
    bottomY: new Animated.Value(0),
    leftX: new Animated.Value(0),
  };

  componentDidMount() {
    const { bamboo, rock } = this.state;

    if (this.props.animated) {
      Animated.parallel([
        Animated.timing(rock, {
          toValue: 1,
          delay: 200,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(bamboo, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      bamboo.setValue(1);
      rock.setValue(1);
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
        duration: 300,
      }),
      Animated.timing(leftX, {
        toValue: -400,
        duration: 300,
      }),
    ]).start();
  }

  render() {
    const { bamboo, rock, leftX, bottomY } = this.state;

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
          <Styles.ABamboo source={bambooImage} progress={bamboo} />
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
          <Styles.ARockPanda
            source={rockImage}
            progress={rock}
            device={Platform.OS}
          />
        </Styles.AWrapperFront>
      </Styles.AZIndexFront>
    );
  }
}

DecorationsPandaFront.propTypes = {
  animated: bool.isRequired,
  reset: bool.isRequired,
};

export default DecorationsPandaFront;
