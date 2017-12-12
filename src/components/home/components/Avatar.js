import React, { PureComponent } from 'react';
import { Animated } from 'react-native';
import { string, instanceOf, func, bool, shape, number } from 'prop-types';
import {
  SPictureContainer,
  SHole,
  SAnimatedAvatarImage,
  SAvatarTouchableOpacity,
  SCircleGimmick,
  SCurveGimmick,
  SCrossGimmick,
} from '../styles';

class Avatar extends PureComponent {
  constructor(props) {
    super(props);

    this.animations = {
      translateYR: new Animated.Value(0),
      translateYL: new Animated.Value(0),
      scale: new Animated.Value(1),
    };
  }

  componentWillReceiveProps(nextProps) {
    const { switchMode } = nextProps;
    if (switchMode !== this.props.switchMode) {
      Animated.parallel([
        Animated.timing(this.animations.translateYR, {
          toValue: switchMode ? -50 : 0,
          duration: 500,
        }),
        Animated.timing(this.animations.translateYL, {
          toValue: switchMode ? 50 : 0,
          duration: 500,
        }),
        Animated.timing(this.animations.scale, {
          toValue: switchMode ? 0 : 1,
          duration: 500,
        }),
      ]).start();
    }
  }

  render() {
    const { position, source, onPress, switchMode, dimensions } = this.props;
    const {
      holeWrapperHeight,
      holeWrapperWidth,
      cardWidth,
      holeSize,
    } = dimensions;
    const translateX = position.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [-120, 0, 120],
    });
    const rotate = position.interpolate({
      inputRange: [0, 1, 2],
      outputRange: ['20deg', '0deg', '-20deg'],
    });

    return (
      <SPictureContainer height={holeWrapperHeight}>
        <SHole
          holeWrapperHeight={holeWrapperHeight}
          holeWrapperWidth={holeWrapperWidth}
          cardWidth={cardWidth}
        />

        <SAvatarTouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            onPress(0);
          }}
          cardWidth={cardWidth}
          holeWrapperHeight={holeWrapperHeight}
          holeSize={holeSize}
        >
          <SAnimatedAvatarImage
            holeSize={holeSize}
            source={{ uri: source }}
            style={{ transform: [{ translateX }, { rotate }] }}
          />
        </SAvatarTouchableOpacity>
        <SCircleGimmick
          holeSize={holeSize}
          holeWrapperHeight={holeWrapperHeight}
          cardWidth={cardWidth}
          position={position}
          switchMode={switchMode}
          animations={this.animations}
        />
        <SCurveGimmick
          holeSize={holeSize}
          holeWrapperHeight={holeWrapperHeight}
          cardWidth={cardWidth}
          position={position}
          switchMode={switchMode}
          animations={this.animations}
        />
        <SCrossGimmick
          holeSize={holeSize}
          holeWrapperHeight={holeWrapperHeight}
          cardWidth={cardWidth}
          position={position}
          switchMode={switchMode}
          animations={this.animations}
        />
      </SPictureContainer>
    );
  }
}

Avatar.defaultProps = {
  onPress: () => {},
};

Avatar.propTypes = {
  source: string.isRequired,
  position: instanceOf(Animated.Value).isRequired,
  onPress: func,
  switchMode: bool.isRequired,
  dimensions: shape({
    holeWrapperWidth: number.isRequired,
    holeWrapperHeight: number.isRequired,
    cardWidth: number.isRequired,
    holeSize: number.isRequired,
  }).isRequired,
};

export default Avatar;
